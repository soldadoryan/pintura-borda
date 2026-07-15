/**
 * Os ids de âncora das seções. Moram aqui porque cada um vive em dois lugares
 * ao mesmo tempo — quem aponta e quem é apontado. Soltos, um erro de digitação
 * entre os dois não quebraria o build: o link só deixaria de sair do lugar, e
 * ninguém ficaria sabendo.
 */
export const SECTION_ID = {
  about: "quem-somos",
  customization: "personalize",
} as const;
