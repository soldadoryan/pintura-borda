import type { CSSProperties } from "react";

export type AnimationTiming = {
  readonly delayMs: number;
  readonly durationMs: number;
};

const LOGO_DELAY_MS = 200;
const LOGO_DURATION_MS = 1200;
const BACKGROUND_DURATION_MS = 1500;
const SCROLL_HINT_DURATION_MS = 800;

export const HERO_ANIMATION = {
  // A logo e a frase de baixo dela entram juntas nesta mesma contagem: a
  // animação está no grupo que embrulha as duas, não repetida em cada uma.
  logo: {
    delayMs: LOGO_DELAY_MS,
    durationMs: LOGO_DURATION_MS,
  },
  background: {
    // Derivado, não fixo: o fundo só começa quando a logo termina de crescer.
    // Mexer nos tempos da logo reajusta essa entrada sozinho.
    delayMs: LOGO_DELAY_MS + LOGO_DURATION_MS,
    durationMs: BACKGROUND_DURATION_MS,
  },
  scrollHint: {
    // Derivado pelo mesmo motivo, e último da fila: o indicador é o convite
    // pra sair do banner. Convidar antes de o fundo terminar de acender seria
    // apressar quem ainda nem viu o que tem aqui.
    delayMs: LOGO_DELAY_MS + LOGO_DURATION_MS + BACKGROUND_DURATION_MS,
    durationMs: SCROLL_HINT_DURATION_MS,
  },
} as const satisfies Record<string, AnimationTiming>;

export function toAnimationStyle({
  delayMs,
  durationMs,
}: AnimationTiming): CSSProperties {
  return {
    animationDelay: `${delayMs}ms`,
    animationDuration: `${durationMs}ms`,
  };
}
