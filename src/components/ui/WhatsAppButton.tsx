import { FaWhatsapp } from "react-icons/fa";

import { CONTACT, WHATSAPP_URL } from "@/constants/contact";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL.general}
      target="_blank"
      // noreferrer junto: sem ele, target="_blank" expõe window.opener.
      rel="noopener noreferrer"
      aria-label={`Conversar no WhatsApp: ${CONTACT.phone}`}
      className="fixed right-6 bottom-6 z-50 flex size-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-black/50 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
    >
      {/* O rótulo acessível já está no aria-label do link: expor o ícone
          duplicaria a leitura em leitores de tela. */}
      <FaWhatsapp aria-hidden className="size-8" />
    </a>
  );
}
