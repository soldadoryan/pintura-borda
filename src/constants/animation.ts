import type { CSSProperties } from "react";

export type AnimationTiming = {
  readonly delayMs: number;
  readonly durationMs: number;
};

const LOGO_DELAY_MS = 200;
const LOGO_DURATION_MS = 1200;
const BACKGROUND_DURATION_MS = 1500;

export const HERO_ANIMATION = {
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
