"use client";

import { useEffect, useRef, useState } from "react";

import { REVEAL_TRIGGER_MARGIN } from "@/constants/reveal";

/**
 * Marca o bloco assim que ele aparece na tela. Quem anima é o CSS: tudo que
 * estiver com a classe `reveal` aqui dentro sobe quando a marca chega. É por
 * isso que as seções continuam sendo Server Components — só este invólucro
 * precisa rodar no navegador.
 */
export function Reveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setRevealed(true);
        // Uma vez só: desligar o observer aqui é o que impede a animação de
        // tocar de novo quando a pessoa rolar de volta pra seção.
        observer.disconnect();
      },
      { rootMargin: REVEAL_TRIGGER_MARGIN },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-revealed={revealed || undefined} className={className}>
      {children}
    </div>
  );
}
