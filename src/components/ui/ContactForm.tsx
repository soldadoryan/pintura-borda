"use client";

import { buildContactWhatsAppUrl } from "@/constants/contact";

/** Um lugar só para o estilo dos campos — são quatro e precisam bater. */
const FIELD_CLASS =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-950 transition-colors placeholder:text-gray-400 focus:border-cyan-500 focus:outline-2 focus:outline-cyan-500";

const LABEL_CLASS = "mb-2 block text-sm font-medium text-gray-700";

export function ContactForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Sem preventDefault o navegador faria um GET na própria página e limparia
    // tudo antes de o WhatsApp abrir.
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    window.open(
      buildContactWhatsAppUrl({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        subject: String(data.get("subject") ?? ""),
      }),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    // FormData em vez de um useState por campo: são quatro valores que só
    // interessam no envio, e nada na tela depende deles enquanto se digita.
    <form onSubmit={handleSubmit} className="mt-12 w-full text-left">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Nome"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
        />
        <Field
          label="E-mail"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="voce@email.com"
        />
      </div>

      <div className="mt-5">
        <Field
          label="Telefone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(31) 90000-0000"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className={LABEL_CLASS}>
          Assunto
        </label>
        <textarea
          id="subject"
          name="subject"
          required
          rows={5}
          placeholder="Conte o que você precisa: tipo de material, cor, quantidade e prazo."
          className={`${FIELD_CLASS} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-cyan-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 sm:w-auto"
      >
        Enviar mensagem
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}) {
  return (
    <div>
      {/* Label de verdade, e não só placeholder: o placeholder some assim que
          a pessoa digita, e quem usa leitor de tela fica sem referência. */}
      <label htmlFor={name} className={LABEL_CLASS}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className={FIELD_CLASS}
      />
    </div>
  );
}
