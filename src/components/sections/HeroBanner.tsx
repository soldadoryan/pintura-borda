import Image from "next/image";

import { HERO_ANIMATION, toAnimationStyle } from "@/constants/animation";
import { ASSETS } from "@/constants/assets";
import { HERO_LOGO } from "@/constants/layout";
import { SECTION_ID } from "@/constants/sections";

export function HeroBanner() {
  return (
    // dvh e não vh: no celular o 100vh conta a barra de URL do navegador como
    // se ela não existisse, e o banner nasce mais alto que a tela visível.
    <section className="relative h-dvh w-full overflow-hidden bg-gray-950">
      {/* Imagem e filtro entram juntos no mesmo wrapper: assim o overlay não
          escurece o slate-950 enquanto o fundo ainda não apareceu. */}
      <div
        className="hero-fade-in absolute inset-0"
        style={toAnimationStyle(HERO_ANIMATION.background)}
      >
        <Image
          src={ASSETS.heroBackground.src}
          alt={ASSETS.heroBackground.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative flex h-full items-center justify-center px-6">
        {/* A animação fica neste invólucro, e não repetida na logo e na frase:
            repetida, cada uma escalaria em torno do próprio centro e o vão
            entre as duas ficaria parado enquanto elas crescem. No grupo, a
            dupla chega como uma peça só. */}
        <div
          className="hero-logo-reveal flex flex-col items-center"
          style={toAnimationStyle(HERO_ANIMATION.logo)}
        >
          <Image
            src={ASSETS.logo.src}
            alt={ASSETS.logo.alt}
            width={ASSETS.logo.width}
            height={ASSETS.logo.height}
            priority
            sizes={HERO_LOGO.sizes}
            className="hero-logo-shadow h-auto w-[79.2vw] max-w-[49.28rem]"
          />

          {/* O text-shadow faz aqui o que o drop-shadow faz na logo: o fundo
              acende atrás depois e tem áreas claras, então a frase não pode
              depender só do escurecido pra continuar legível.
              A cor é obrigatória: o text-shadow-lg sozinho vem preto a 10%,
              feito pra texto escuro em fundo claro. Sobre a foto, a 10% ele
              simplesmente não existe.

              O margin vem do layout.ts, e não de um mt-*: ele precisa descontar
              a faixa transparente do PNG da logo, que cresce junto com a tela. */}
          <p
            style={{ marginTop: HERO_LOGO.taglineMarginTop }}
            className="text-center text-lg font-semibold text-balance text-gray-300 text-shadow-lg text-shadow-black/60 sm:text-xl lg:text-2xl"
          >
            Pinturas em livros, cartões e convites
          </p>
        </div>
      </div>

      {/* Âncora de verdade, não enfeite: sem JS nenhum ele desce a página, e
          quem navega pelo teclado chega nele. O -translate-x-1/2 não briga com
          o hero-fade-in — o fade só mexe em opacity, e no Tailwind v4 o
          translate sai na propriedade `translate`, não no `transform`.

          O short:hidden tira ele do celular deitado. Não chega a colidir com a
          frase — sobram uns 12px num iPhone SE deitado —, mas 12px é aperto, e
          é a tela onde ele menos faz falta: quem está com o aparelho deitado já
          sabe rolar. */}
      <a
        href={`#${SECTION_ID.about}`}
        aria-label="Ir para a próxima seção"
        style={toAnimationStyle(HERO_ANIMATION.scrollHint)}
        className="hero-fade-in absolute bottom-8 left-1/2 flex h-11 w-7 -translate-x-1/2 justify-center rounded-xl border-2 border-white/25 pt-2 transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 short:hidden"
      >
        <span className="touch-hint size-2 rounded-full bg-white/90" />
      </a>
    </section>
  );
}
