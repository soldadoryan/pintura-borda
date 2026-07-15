import { SITE } from "@/constants/site";

const DEVELOPER = {
  name: "RYAN",
  url: "https://ryandrumond.com",
} as const;

export function Footer() {
  return (
    // Mesmo branco da seção de contato e separado só por um fio: assim o
    // rodapé fecha aquele bloco em vez de virar uma faixa solta.
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-sm text-gray-500 sm:flex-row sm:justify-between">
        {/* Ano resolvido na build: a página é estática, então ele congela no
            deploy. É o bastante aqui, e evita mandar JS só pra isso. */}
        <p>
          © {new Date().getFullYear()} {SITE.name}. Todos os direitos
          reservados.
        </p>

        <p>
          Desenvolvido por{" "}
          <a
            href={DEVELOPER.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-900 underline-offset-4 transition-colors hover:text-cyan-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
          >
            {DEVELOPER.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
