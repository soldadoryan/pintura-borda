// Este import não faz nada em tempo de execução: ele existe pra quebrar o build
// se alguém importar este arquivo de um componente de cliente. Aqui dentro tem
// senha de SMTP, e um import errado a mandaria pro navegador em silêncio.
import "server-only";

import nodemailer from "nodemailer";

import type { ContactFormValues } from "@/schemas/contact";

/** Pra onde vai o formulário. Fica neste módulo, e não em constants/, porque o
 *  constants/contact.ts é importado por componente de cliente — o e-mail iria
 *  junto pro bundle e ficaria à mão de robô de spam. */
const INBOX = "ryandrumond@outlook.com.br";

/**
 * Lê a variável ou explode. O silêncio é o problema que isso evita: sem a
 * checagem, um SMTP_HOST vazio viraria uma conexão em "undefined" e o erro só
 * apareceria no meio do envio, como se fosse falha de rede.
 */
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Variável de ambiente ausente: ${name}. Veja o .env.example.`,
    );
  }
  return value;
}

/**
 * O transporte nasce por chamada, e não no topo do módulo. Se fosse no topo, a
 * ausência de uma variável derrubaria o build inteiro — e o site é institucional:
 * ele tem que continuar no ar mesmo com o e-mail mal configurado. Assim quem cai
 * é só o formulário.
 */
function createTransport() {
  const port = Number(process.env.SMTP_PORT ?? 587);

  return nodemailer.createTransport({
    host: required("SMTP_HOST"),
    port,
    // 465 é TLS direto; 587 e 25 sobem pra TLS via STARTTLS depois de conectar.
    secure: port === 465,
    auth: {
      user: required("SMTP_USER"),
      pass: required("SMTP_PASSWORD"),
    },
  });
}

/** Escapa o que vai pro corpo HTML: o texto vem de um formulário aberto na
 *  internet, e sem isso qualquer um injeta marcação no e-mail que a gente lê. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(fields: ContactFormValues) {
  const transport = createTransport();

  await transport.sendMail({
    // O from tem que ser a conta autenticada: quase todo SMTP recusa enviar em
    // nome de um endereço que não é o dele. Por isso o e-mail de quem preencheu
    // vai no replyTo — daí responder na caixa de entrada já responde a pessoa.
    from: `"Site Pintura de Borda" <${required("SMTP_USER")}>`,
    to: INBOX,
    replyTo: `"${fields.name}" <${fields.email}>`,
    subject: `Novo contato pelo site — ${fields.name}`,
    text: [
      `Nome: ${fields.name}`,
      `E-mail: ${fields.email}`,
      `Telefone: ${fields.phone}`,
      "",
      "Mensagem:",
      fields.subject,
    ].join("\n"),
    html: [
      "<h2>Novo contato pelo site</h2>",
      `<p><strong>Nome:</strong> ${escapeHtml(fields.name)}</p>`,
      `<p><strong>E-mail:</strong> ${escapeHtml(fields.email)}</p>`,
      `<p><strong>Telefone:</strong> ${escapeHtml(fields.phone)}</p>`,
      "<p><strong>Mensagem:</strong></p>",
      `<p>${escapeHtml(fields.subject).replace(/\n/g, "<br />")}</p>`,
    ].join(""),
  });
}
