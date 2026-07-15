import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Há um package-lock.json solto em C:\Users\ryand que o Next escolhe
    // como raiz do workspace se não fixarmos aqui.
    root: __dirname,
  },
};

export default nextConfig;
