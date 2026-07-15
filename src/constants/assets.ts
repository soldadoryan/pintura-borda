import { SITE } from "@/constants/site";

export const ASSETS = {
  logo: {
    src: "/logo.png",
    width: 2814,
    height: 809,
    alt: `Logo ${SITE.name}`,
  },
  heroBackground: {
    src: "/background.png",
    alt: "",
  },
  product1: {
    src: "/product1.png",
    width: 2752,
    height: 1536,
    alt: "Livros com as bordas das páginas pintadas em vermelho.",
  },
} as const;
