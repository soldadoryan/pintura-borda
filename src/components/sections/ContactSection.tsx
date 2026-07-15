import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { revealDelay } from "@/constants/reveal";

export function ContactSection() {
  return (
    // Branca para separar da galeria escura logo acima e manter o ritmo
    // escuro/claro do site. Sem altura travada: formulário preso em 100vh
    // aperta em tela baixa, e o padding já entrega o respiro.
    <section className="w-full bg-white py-24 sm:py-32">
      <Reveal className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center">
        <h2 className="reveal text-4xl font-bold tracking-tight text-balance text-gray-950 sm:text-5xl lg:text-6xl">
          Entre em contato!
        </h2>

        <p
          style={revealDelay(1)}
          className="reveal mt-6 max-w-xl text-base text-gray-600 sm:text-lg"
        >
          Conte o que você tem em mente e a gente volta com as opções de cor,
          prazo e valor. Responder é rápido e não compromete nada.
        </p>

        {/* O formulário entra inteiro, e não campo a campo: escalonar quatro
            campos faria a pessoa esperar pra poder digitar. */}
        <div style={revealDelay(2)} className="reveal w-full">
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
