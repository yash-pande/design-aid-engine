import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { type Language } from "@/lib/language";
import { catalogueCopy } from "@/lib/catalogue";
import { useLanguage, LanguageSwitch } from "@/lib/language-context";

/**
 * Quiet header + language handling for sub-pages, matching the home theme.
 * Synchronized with global LanguageProvider and localStorage.
 */
export function SubPageShell({ children }: { children: (language: Language) => ReactNode }) {
  const { language } = useLanguage();

  return (
    <div className="page">
      <header className="site-header is-scrolled">
        <div className="subpage-bar">
          <p className="catalogue-brand-note">{catalogueCopy[language].heritage}</p>
          <Link to="/" aria-label="Yamini Studio">
            <img src="/favicon.png" alt="Yamini Studio" className="brand-logo-desktop" />
            <img src="/facicon-mobile.png" alt="Yamini Studio" className="brand-logo-mobile" width="105" height="105" />
          </Link>
          <LanguageSwitch />
        </div>
      </header>
      <nav className="subpage-navigation">
        <Link to="/">{catalogueCopy[language].home}</Link>
        <Link to="/collections">{catalogueCopy[language].collections}</Link>
      </nav>

      <main>{children(language)}</main>
    </div>
  );
}
