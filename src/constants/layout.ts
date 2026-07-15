/** Espelha `max-w-[49.28rem]` aplicado na logo do HeroBanner. */
const LOGO_MAX_WIDTH = "49.28rem";

/** Espelha `w-[79.2vw]`: abaixo do breakpoint a logo acompanha a tela. */
const LOGO_FLUID_WIDTH = "79.2vw";

/**
 * Onde o max-w passa a valer: 49.28rem = 788,48px, e 788,48 / 0,792 = 995,6px.
 * Ou seja, a logo só trava a partir de ~996px de tela — não de 768px, como
 * estava aqui. No meio dessa faixa o sizes prometia 788px enquanto a logo
 * renderizava 608px, e o next/image baixava arquivo maior que o necessário.
 */
const LOGO_BREAKPOINT = "996px";

export const HERO_LOGO = {
  maxWidth: LOGO_MAX_WIDTH,
  // Se o `sizes` mentir sobre o tamanho renderizado, o next/image escolhe um
  // arquivo na resolução errada — daí manter os valores presos aqui.
  sizes: `(min-width: ${LOGO_BREAKPOINT}) ${LOGO_MAX_WIDTH}, ${LOGO_FLUID_WIDTH}`,
} as const;
