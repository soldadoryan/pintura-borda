import Image from "next/image";

import { HERO_ANIMATION, toAnimationStyle } from "@/constants/animation";
import { ASSETS } from "@/constants/assets";
import { HERO_LOGO } from "@/constants/layout";

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
        <Image
          src={ASSETS.logo.src}
          alt={ASSETS.logo.alt}
          width={ASSETS.logo.width}
          height={ASSETS.logo.height}
          priority
          sizes={HERO_LOGO.sizes}
          className="hero-logo-reveal hero-logo-shadow h-auto w-[79.2vw] max-w-[49.28rem]"
          style={toAnimationStyle(HERO_ANIMATION.logo)}
        />
      </div>
    </section>
  );
}
