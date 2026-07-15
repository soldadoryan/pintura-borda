/** Código do país (Brasil). */
const PHONE_COUNTRY = "55";

/** DDD. */
const PHONE_AREA = "31";

/** Número sem máscara. */
const PHONE_LINE = "987331317";

/**
 * A wa.me exige só dígitos, com o DDI na frente e sem máscara — qualquer
 * parêntese ou traço aqui quebra o link.
 */
function buildWhatsAppUrl(message: string): string {
  const phone = `${PHONE_COUNTRY}${PHONE_AREA}${PHONE_LINE}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const CONTACT = {
  phone: `(${PHONE_AREA}) 98733-1317`,
} as const;

/** Textos já preenchidos na conversa. Ajuste para a copy real da empresa. */
export const WHATSAPP_URL = {
  general: buildWhatsAppUrl("Olá! Gostaria de mais informações."),
  quote: buildWhatsAppUrl(
    "Olá! Gostaria de fazer um orçamento de pintura de borda.",
  ),
} as const;
