"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { submitContact } from "@/app/actions";
import {
  contactSchema,
  maskPhone,
  type ContactFormValues,
} from "@/schemas/contact";

/** Um lugar só para o estilo dos campos — são quatro e precisam bater. */
const FIELD_CLASS =
  "w-full rounded-lg border bg-white px-4 py-3 text-gray-950 transition-colors placeholder:text-gray-400 focus:outline-2";

/** O campo com erro muda a borda: cor sozinha não basta, mas aqui ela vem
 *  acompanhada da mensagem escrita logo abaixo. */
const FIELD_OK = "border-gray-300 focus:border-cyan-500 focus:outline-cyan-500";
const FIELD_ERROR = "border-red-500 focus:border-red-500 focus:outline-red-500";

const LABEL_CLASS = "mb-2 block text-sm font-medium text-gray-700";

export function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(contactSchema),
    // Valida ao sair do campo, não a cada tecla: com onChange o erro aparece
    // já na primeira letra do nome, e a pessoa é corrigida antes de ter tido
    // chance de terminar. Depois do primeiro erro o RHF revalida ao digitar
    // sozinho, então o acerto some na hora.
    mode: "onBlur",
    defaultValues: { name: "", email: "", phone: "", subject: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    const result = await submitContact(values);

    if (!result.ok) {
      toast.error(result.message ?? "Não conseguimos enviar agora.");
      return;
    }

    toast.success("Mensagem enviada! A gente responde em breve.");
    reset();
  }

  return (
    // noValidate desliga os balões do navegador: quem valida é o yup, e sem
    // isso as duas mensagens brigariam pelo mesmo campo — em idiomas
    // diferentes, inclusive.
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-12 w-full text-left"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* O `name` não vem escrito aqui: quem entrega ele é o register/field,
            junto com o ref e o onChange. Escrever de novo só criaria duas
            fontes pro mesmo atributo — e a de baixo ganharia. */}
        <Field
          label="Nome"
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
          error={errors.name?.message}
          {...register("name")}
        />
        <Field
          label="E-mail"
          type="email"
          autoComplete="email"
          placeholder="voce@email.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="mt-5">
        {/* Controller, e não register: o valor do campo não é o que a pessoa
            digitou, é o que a máscara devolveu. Isso exige que o RHF seja dono
            do value, e não só ouvinte do onChange. */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Field
              label="Telefone"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              placeholder="(31) 98733-1317"
              error={errors.phone?.message}
              {...field}
              onChange={(event) =>
                field.onChange(maskPhone(event.target.value))
              }
            />
          )}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className={LABEL_CLASS}>
          Assunto
        </label>
        <textarea
          id="subject"
          rows={5}
          placeholder="Conte o que você precisa: tipo de material, cor, quantidade e prazo."
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={`${FIELD_CLASS} resize-y ${
            errors.subject ? FIELD_ERROR : FIELD_OK
          }`}
          {...register("subject")}
        />
        <FieldError id="subject-error" message={errors.subject?.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        // O disabled durante o envio é o que impede a mesma mensagem de chegar
        // duas vezes na caixa de entrada num clique duplo.
        className="mt-8 w-full rounded-full bg-cyan-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}

/**
 * O ref precisa chegar no <input> de verdade — é por ele que o react-hook-form
 * lê o campo e põe o foco no primeiro erro.
 */
function Field({
  label,
  error,
  className,
  ...props
}: React.ComponentProps<"input"> & { label: string; error?: string }) {
  const id = props.name;
  const errorId = `${id}-error`;

  return (
    <div>
      {/* Label de verdade, e não só placeholder: o placeholder some assim que
          a pessoa digita, e quem usa leitor de tela fica sem referência. */}
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <input
        id={id}
        // aria-invalid + describedby: é o que faz o leitor de tela anunciar o
        // erro junto do campo, em vez de deixar a mensagem solta na página.
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${FIELD_CLASS} ${error ? FIELD_ERROR : FIELD_OK} ${className ?? ""}`}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  );
}
