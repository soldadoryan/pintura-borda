import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { ASSETS } from "@/constants/assets";
import { WHATSAPP_URL } from "@/constants/contact";
import { revealDelay } from "@/constants/reveal";
import { SECTION_ID } from "@/constants/sections";

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
    <section
      id={SECTION_ID.customization}
      className="flex min-h-dvh w-full items-center bg-white py-20 sm:py-24"
    >
      {/* O Reveal assume o lugar do container que já existia aqui: ele só
          precisa de um elemento pra observar, e reaproveitar este não mexe no
          layout nem acrescenta div nenhuma. */}
      <Reveal className="mx-auto w-full max-w-2xl px-6 3xl:grid 3xl:max-w-6xl 3xl:grid-cols-2 3xl:items-center 3xl:gap-20">
        {/* A foto volta só de 1920 pra cima, onde sobra largura para ela e o
            texto. O next/image é lazy por padrão e um elemento display:none
            nunca entra no viewport, então nas telas menores ela sequer chega
            a ser baixada — o hidden aqui não custa banda. */}
        <div className="reveal hidden 3xl:flex 3xl:justify-start">
          {/* A moldura é quem recorta e inclina: o next/image por dentro fica
              reto e o object-cover absorve o corte do 16:9 original. */}
          <div className="relative aspect-square w-full max-w-md -rotate-3 overflow-hidden rounded-photo border-8 border-gray-950 shadow-2xl shadow-gray-950/25">
            <Image
              src={ASSETS.product1.src}
              alt={ASSETS.product1.alt}
              fill
              // Fixo em 28rem: o max-w-md trava a moldura nesse tamanho, e a
              // foto só existe acima de 1920 — não há faixa fluida pra cobrir.
              sizes="28rem"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="flex flex-col items-center text-center 3xl:items-start 3xl:text-left">
          <h2 className="reveal text-4xl font-bold tracking-tight text-balance text-gray-950 sm:text-5xl lg:text-6xl">
            Personalize como quiser!
          </h2>

          <p
            style={revealDelay(1)}
            className="reveal mt-6 max-w-xl text-base text-gray-600 sm:text-lg"
          >
            A borda é a primeira coisa que se vê numa estante. Escolher a cor
            dela é simples e leva três passos.
          </p>

          {/* O texto da lista fica à esquerda mesmo com a seção centralizada:
              passo a passo centralizado fica com a borda serrilhada. */}
          {/* A entrada é passo a passo, e não a lista inteira de uma vez: são
              três etapas numeradas, e vê-las chegando em ordem é a própria
              mensagem da seção. */}
          <ol className="mt-12 flex w-full flex-col gap-6 text-left sm:mt-14 sm:gap-8 3xl:mt-10 3xl:gap-6">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                style={revealDelay(2 + index)}
                className="reveal flex gap-4"
              >
                <span
                  aria-hidden
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-950">{step.title}</h3>
                  <p className="mt-1 text-gray-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <a
            href={WHATSAPP_URL.quote}
            target="_blank"
            rel="noopener noreferrer"
            style={revealDelay(5)}
            // Largura cheia no celular: alvo de toque grande e o CTA não fica
            // perdido no meio do branco.
            className="reveal mt-12 w-full rounded-full bg-cyan-500 px-8 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 sm:w-auto"
          >
            Faça seu orçamento
          </a>
        </div>
      </Reveal>
    </section>
  );
}
