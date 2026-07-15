"use server";

import { ValidationError } from "yup";

import { sendContactEmail } from "@/lib/mailer";
import { contactSchema } from "@/schemas/contact";

export type ContactActionResult = { ok: boolean; message?: string };

/**
 * Recebe o formulário e manda o e-mail.
 *
 * O parâmetro é `unknown` de propósito. Isto aqui não é uma função que só o
 * nosso formulário chama: o "use server" publica um POST na página, e qualquer
 * um pode mandar o que quiser nele, sem passar pelo react-hook-form. Tipar como
 * ContactFormValues seria uma promessa que o TypeScript não tem como cobrar em
 * runtime — o valor real chega de fora.
 */
export async function submitContact(
  values: unknown,
): Promise<ContactActionResult> {
  let fields;

  try {
    // stripUnknown descarta campo que não está no esquema: sem ele, um POST
    // forjado poderia empurrar chaves extras pra dentro do corpo do e-mail.
    fields = await contactSchema.validate(values, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return { ok: false, message: "Confira os campos e tente de novo." };
    }
    throw error;
  }

  try {
    await sendContactEmail(fields);
    return { ok: true };
  } catch (error) {
    // O erro fica no log do servidor e não sobe pro navegador: ele carrega host
    // e usuário do SMTP, e a resposta da action é serializada pro cliente.
    console.error("[contato] falha ao enviar e-mail:", error);
    return {
      ok: false,
      message: "Não conseguimos enviar agora. Tente pelo WhatsApp.",
    };
  }
}
