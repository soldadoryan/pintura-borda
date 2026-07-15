import { WHATSAPP_URL } from "@/constants/contact";

const STEPS = [
  {
    title: "Envie sua referência",
    description:
      "Um código Pantone, a arte da capa ou só a ideia na cabeça. A partir daí a gente chega no tom.",
  },
  {
    title: "Aprove a amostra",
    description:
      "Você recebe uma prova da cor aplicada no papel real antes da tiragem sair do lugar.",
  },
  {
    title: "Receba pronto",
    description:
      "Com o tom aprovado, pintamos a tiragem inteira mantendo o mesmo padrão do primeiro ao último exemplar.",
  },
] as const;

export function CustomizationSection() {
  return (
    // min-h, não h: o conteúdo é mais alto que a tela num celular pequeno, e
    // travar a altura cortaria o botão justo na seção que existe pra converter.
    <section className="flex min-h-dvh w-full items-center bg-white py-20 sm:py-24">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-balance text-gray-950 sm:text-5xl lg:text-6xl">
          Personalize como quiser!
        </h2>

        <p className="mt-6 max-w-xl text-base text-pretty text-gray-600 sm:text-lg">
          A borda é a primeira coisa que se vê numa estante. Escolher a cor dela
          é simples e leva três passos.
        </p>

        {/* O texto da lista volta pra esquerda: passo a passo centralizado fica
            com a borda serrilhada e custa a leitura. */}
        <ol className="mt-12 flex w-full flex-col gap-6 text-left sm:mt-14 sm:gap-8">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-gray-950">{step.title}</h3>
                <p className="mt-1 text-pretty text-gray-600">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <a
          href={WHATSAPP_URL.quote}
          target="_blank"
          rel="noopener noreferrer"
          // Largura cheia no celular: alvo de toque grande e o CTA não fica
          // perdido no meio do branco.
          className="mt-12 w-full rounded-full bg-cyan-500 px-8 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 sm:w-auto"
        >
          Faça seu orçamento
        </a>
      </div>
    </section>
  );
}
