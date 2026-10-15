import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/yamini-studio-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { preferredLanguage, type Language } from "@/lib/language";
import { catalogueCopy } from "@/lib/catalogue";

/**
 * Quiet header + language handling for sub-pages, matching the home theme.
 * Language hydrates from localStorage and persists only after hydration.
 */
export function SubPageShell({ children }: { children: (language: Language) => ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setLanguage(preferredLanguage(localStorage.getItem("yamini-language")));
    } catch {
      /* Keep English default. */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en-GB";
    if (ready) {
      try {
        localStorage.setItem("yamini-language", language);
      } catch {
        /* Language still works for this visit. */
      }
    }
  }, [language, ready]);

  return (
    <div className="page">
      <header className="site-header is-scrolled">
        <div className="subpage-bar">
          <Link to="/" aria-label="Yamini Studio">
            <img src={logoAsset.url} alt="Yamini Studio" />
          </Link>
          <div className="language-switch" aria-label="Language selection">
            <Button variant="ghost" className={language === "pt" ? "is-active" : ""} onClick={() => setLanguage("pt")}>
              PT-BR
            </Button>
            <span aria-hidden="true">|</span>
            <Button variant="ghost" className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")}>
              EN-UK
            </Button>
          </div>
        </div>
      </header>
      <nav className="subpage-navigation"><Link to="/">{catalogueCopy[language].home}</Link><Link to="/collections">{catalogueCopy[language].collections}</Link></nav>
      <main>{children(language)}</main>
    </div>
  );
}
