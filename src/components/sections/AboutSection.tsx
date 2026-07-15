import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { ASSETS } from "@/constants/assets";
import { revealDelay } from "@/constants/reveal";
import { SECTION_ID } from "@/constants/sections";

/** Os mesmos três da frase do banner — é o que a gente pinta, nada além. */
const SERVICES = ["Livros", "Cartões", "Convites"] as const;

/**
 * A grande é a mesma foto do "Personalize". As duas do lado mudam material e
 * cor — cartão dourado e livro vermelho — pra seção resumir o serviço inteiro
 * numa olhada, sem virar uma segunda galeria.
 */
const MOSAIC = {
  main: ASSETS.product1,
  side: [ASSETS.product4, ASSETS.product3],
} as const;

/**
 * Todas as fotos são deitadas (a grande é 1,91:1). Num container 4:3 a foto
 * grande fica 1:1,55 e as duas menores 1,35:1 — a vertical ainda corta, mas
 * pega a pilha inteira. Num container quadrado a grande viraria 1:2 e sobraria
 * uma fatia de 26% da foto, sem composição nenhuma.
 */
const TILE_FRAME =
  "relative overflow-hidden rounded-photo border-4 border-gray-950 shadow-2xl shadow-gray-950/25";

/**
 * A trava do mosaico. Só vale abaixo do lg, onde ele ocupa a largura toda —
 * daí pra cima quem manda é a coluna do grid. Subiu junto com o resto: 42rem ×
 * 1,25 = 52.5rem, pra tablet crescer os mesmos 25% que o desktop.
 */
const MOSAIC_MAX_WIDTH = "max-w-[52.5rem]";

/**
 * Cada peça é (mosaico - gap) / 2. No xl isso dá 24rem; entre 720px e o lg, a
 * trava acima deixa em ~26rem; abaixo de 720px é a tela que manda.
 *
 * Na faixa do lg a peça é menor que os 24rem prometidos, e isso é de propósito:
 * errar pra cima faz o next/image baixar um arquivo um degrau maior, errar pra
 * baixo entrega foto borrada.
 */
const TILE_SIZES =
  "(min-width: 1024px) 24rem, (min-width: 720px) 26rem, calc((100vw - 4rem) / 2)";

export function AboutSection() {
  return (
    // O pb é bem menor que o pt de propósito, e o motivo não é estético: o
    // "Personalize" logo abaixo é `min-h-dvh` com o conteúdo centralizado, e
    // numa tela mais alta que o conteúdo isso sozinho já põe ~150px de ar acima
    // do título dele. O padding dele não muda nada nessa conta — ele entra e sai
    // dela: pt + (dvh - 2*pt - conteúdo)/2 = (dvh - conteúdo)/2. Ou seja, este
    // pb aqui é o único lado que ainda controla o vão entre as duas seções.
    <section
      id={SECTION_ID.about}
      className="w-full bg-white pt-24 pb-6 sm:pt-32"
    >
      {/* Colunas desiguais, e não meio a meio: o texto aqui é curto de propósito
          e não precisa de metade da tela, enquanto o mosaico é o que a seção tem
          pra mostrar.

          O 2fr só entra no xl. Na faixa do lg (1024–1280) a conta daria 304px de
          texto, e o título de 60px não cabe nisso — quebraria em "Quem / somos".
          Lá o mosaico fica no 1.5fr, que é o que a largura permite. */}
      <Reveal className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16 xl:grid-cols-[1fr_2fr]">
        <div className="flex flex-col">
          <h2 className="reveal text-4xl font-bold tracking-tight text-balance text-gray-950 sm:text-5xl lg:text-6xl">
            Quem somos
          </h2>

          <p
            style={revealDelay(1)}
            className="reveal mt-6 max-w-xl text-lg text-gray-600 sm:mt-8 sm:text-xl"
          >
            A gente pinta a borda das páginas — o acabamento que faz um exemplar
            comum virar peça de coleção.
          </p>

          <p
            style={revealDelay(2)}
            className="reveal mt-4 max-w-xl text-lg text-gray-600 sm:text-xl"
          >
            Todas as fotos deste site são trabalho nosso. A cor é sempre sob
            medida, e sai igual do primeiro ao último exemplar da tiragem.
          </p>

          {/* Os serviços viram etiqueta, e não mais uma frase: numa seção de
              texto curto, três palavras soltas se leem de relance — dentro do
              parágrafo elas passariam batido. O ciano é o mesmo dos botões e
              dos números do "Personalize": é o acento do site. */}
          <ul
            style={revealDelay(3)}
            className="reveal mt-8 flex flex-wrap gap-3"
          >
            {SERVICES.map((service) => (
              <li
                key={service}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-700"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* A grande ocupa as duas linhas da primeira coluna; as duas menores
            empilham na segunda. Moldura igual à do "Personalize" — quadro
            gray-950, cantos arredondados e sombra —, só que em 4px: as peças
            aqui têm metade da largura da foto de lá, e 8px pesariam o dobro. */}
        <div
          style={revealDelay(1)}
          className="reveal flex justify-center lg:justify-end"
        >
          <div
            className={`grid aspect-4/3 w-full ${MOSAIC_MAX_WIDTH} grid-cols-2 grid-rows-2 gap-4`}
          >
            <div className={`row-span-2 ${TILE_FRAME}`}>
              <Image
                src={MOSAIC.main.src}
                alt={MOSAIC.main.alt}
                fill
                sizes={TILE_SIZES}
                className="object-cover object-center"
              />
            </div>

            {MOSAIC.side.map((photo) => (
              <div key={photo.src} className={TILE_FRAME}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={TILE_SIZES}
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
