import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/yamini-studio-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { preferredLanguage, type Language } from "@/lib/language";
import { catalogueCopy } from "@/lib/catalogue";
import { categories } from "@/lib/catalogue";
import { Heart } from 'lucide-react';
import { CatalogueSearch } from './CatalogueSearch';

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
          <p className="catalogue-brand-note">{catalogueCopy[language].heritage}</p>
          <Link to="/" aria-label="Yamini Studio">
            <img src={logoAsset.url} alt="Yamini Studio" />
          </Link>
          <div className="catalogue-header-actions"><CatalogueSearch language={language}/><Button asChild variant="ghost" size="icon" aria-label={catalogueCopy[language].wishlist} title={catalogueCopy[language].wishlist}><Link to="/collections" search={{ wishlist:true }}><Heart/></Link></Button></div>
        </div>
        <nav className="subpage-navigation"><Link to="/collections">{catalogueCopy[language].collections}</Link>{categories.map((category,i) => <Link key={category} to="/collections" search={{category}}>{catalogueCopy[language].categories[i]}</Link>)}<Link to="/" hash="mayamini">MaYamini <span>{catalogueCopy[language].launching}</span></Link><div className="language-switch" aria-label="Language selection">
            <Button variant="ghost" className={language === "pt" ? "is-active" : ""} onClick={() => setLanguage("pt")}>
              PT-BR
            </Button>
            <span aria-hidden="true">|</span>
            <Button variant="ghost" className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")}>
              EN-UK
            </Button>
          </div></nav>
      </header>
      <main>{children(language)}</main>
    </div>
  );
}
