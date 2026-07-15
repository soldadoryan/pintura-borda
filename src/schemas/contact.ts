import * as yup from "yup";

/**
 * O esquema do formulário de contato.
 *
 * Módulo neutro de propósito: sem "use client" e sem "use server". As duas
 * pontas importam este mesmo arquivo — o navegador pra mostrar o erro embaixo
 * do campo, e a Server Action pra conferir de novo. Não é redundância: a action
 * é um POST público, e quem mandar direto nela nunca passou pelo formulário.
 * Se as regras morassem só no cliente, não haveria regra nenhuma.
 */

/** DDD (2) + celular (9). O fixo, com 8, cabe no mesmo teto. */
const PHONE_MAX_DIGITS = 11;

/** Onde o traço entra: 9 dígitos viram 5+4, 8 dígitos viram 4+4. */
const PHONE_LONG_SPLIT = 5;
const PHONE_SHORT_SPLIT = 4;

/**
 * O formato que a máscara produz — e, por isso, o único que o esquema aceita.
 * Os dois moram juntos neste arquivo de propósito: se um mudar sem o outro, o
 * campo passa a recusar exatamente aquilo que ele mesmo escreveu.
 */
const PHONE_PATTERN = /^\(\d{2}\) \d{4,5}-\d{4}$/;

/**
 * Tira o +55 de quem cola o número no formato internacional. Sem isso o DDI
 * viraria o DDD e "+55 (31) 98733-1317" seria lido como "(55) 31987-3313" —
 * um número plausível, e errado, que o esquema aceitaria sem reclamar.
 *
 * O corte só vale acima de 11 dígitos, e é o que salva o DDD 55 (Rio Grande do
 * Sul): "(55) 98765-4321" tem 11 dígitos e passa inteiro. Já os 13 de
 * "+55 (55) 98765-4321" perdem só o DDI.
 */
function withoutCountryCode(digits: string): string {
  const hasCountryCode =
    digits.length > PHONE_MAX_DIGITS && digits.startsWith("55");
  return hasCountryCode ? digits.slice(2) : digits;
}

/**
 * Vai formatando enquanto se digita. Trabalha só com os dígitos: apagar, colar
 * um número já formatado ou digitar no meio do texto acabam todos aqui, porque
 * a pontuação antiga é descartada e reescrita do zero a cada tecla.
 */
export function maskPhone(value: string): string {
  const digits = withoutCountryCode(value.replace(/\D/g, "")).slice(
    0,
    PHONE_MAX_DIGITS,
  );

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;

  const area = digits.slice(0, 2);
  const line = digits.slice(2);

  if (line.length <= PHONE_SHORT_SPLIT) return `(${area}) ${line}`;

  const split = line.length > 8 ? PHONE_LONG_SPLIT : PHONE_SHORT_SPLIT;
  return `(${area}) ${line.slice(0, split)}-${line.slice(split)}`;
}

export const contactSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Diga como podemos te chamar.")
    .min(2, "Nome muito curto.")
    .max(80, "Nome muito longo."),
  email: yup
    .string()
    .trim()
    .required("Precisamos de um e-mail para responder.")
    .email("Esse e-mail não parece válido.")
    .max(120, "E-mail muito longo."),
  phone: yup
    .string()
    .trim()
    .required("Informe um telefone com DDD.")
    .matches(PHONE_PATTERN, "Telefone incompleto. Ex: (31) 98733-1317"),
  subject: yup
    .string()
    .trim()
    .required("Conte o que você precisa.")
    .min(10, "Escreva um pouco mais para a gente entender o pedido.")
    // O teto existe pro servidor, não pra pessoa: sem ele, a action aceitaria
    // um texto do tamanho do limite do corpo da requisição (1MB).
    .max(2000, "Texto muito longo. Resuma um pouco."),
});

export type ContactFormValues = yup.InferType<typeof contactSchema>;
