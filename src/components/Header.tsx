import { useRouter } from "../lib/router";
import { waLink, headerChatText } from "../lib/whatsapp";
import { BRAND } from "../data/products";

function Mark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {/* Hanger */}
      <path
        d="M16 7a2.2 2.2 0 1 1 1.6 3.7L16 12l5.5 3.6c1.4.9 2.4 2.4 2.4 4.1V21H8v-1.3c0-1.7 1-3.2 2.4-4.1L16 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* M formed by tee shoulders */}
      <path
        d="M9 21v4.5h2.4V23l2.1 2.5h1l2.1-2.5v2.5H19V21"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  const { navigate, route } = useRouter();
  const isHome = route.name === "home";

  const goHomeAndScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    });
  };

  return (
    <header className={isHome
      ? "absolute inset-x-0 top-0 z-50 border-b border-[#E5DED3] bg-[#F5F0E8]/95 text-[#141414] backdrop-blur md:border-white/15 md:bg-black/10 md:text-white"
      : "sticky top-0 z-50 border-b border-[#E5DED3] bg-[#F5F0E8]/95 backdrop-blur"}>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 pt-[env(safe-area-inset-top)] sm:px-6">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F1F]"
        >
          <Mark />
          <span className={isHome ? "text-sm font-semibold tracking-[0.2em] text-[#141414] md:text-white" : "text-sm font-semibold tracking-[0.2em] text-[#141414]"}>MOODLY</span>
        </a>

        <nav className={isHome ? "hidden items-center gap-3 text-sm tracking-wide text-white sm:flex sm:gap-5 md:gap-8" : "flex items-center gap-2 text-xs tracking-wide text-[#141414] sm:gap-5 sm:text-sm md:gap-8"}>
          <a href="#drop" onClick={goHomeAndScroll("drop")} className="hover:text-[#7A1F1F]">
            Drop
          </a>
          <a
            href="#/print"
            onClick={(e) => {
              e.preventDefault();
              navigate("/print");
            }}
            className="hover:text-[#7A1F1F]"
          >
            <span className="hidden sm:inline">Print your mood</span>
            <span className="sm:hidden">Print</span>
          </a>
        </nav>

        <a
          href={waLink(headerChatText)}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#7A1F1F] px-4 py-2 text-xs font-medium tracking-wide text-white transition-colors hover:bg-[#661919] sm:text-sm"
        >
          WhatsApp
        </a>
      </div>
      <p className="sr-only">{BRAND.secondary}</p>
    </header>
  );
}
