import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/yamini-studio-logo.png.asset.json";

type Language = "pt" | "en";

export function ComingSoon({ area }: { area: "boutique" | "investors" }) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    try {
      if (localStorage.getItem("yamini-language") === "en") setLanguage("en");
    } catch { /* Browsing remains available when storage is blocked. */ }
  }, []);

  const copy = {
    pt: {
      eyebrow: area === "boutique" ? "Boutique Online" : "Relações com Investidores",
      title: "Em breve",
      body: area === "boutique" ? "A boutique Yamini Studio está sendo preparada com cuidado." : "Esta área está sendo preparada com cuidado.",
      back: "Voltar ao Yamini Studio",
    },
    en: {
      eyebrow: area === "boutique" ? "Online Boutique" : "Investor Relations",
      title: "Coming soon",
      body: area === "boutique" ? "The Yamini Studio boutique is being prepared with care." : "This area is being prepared with care.",
      back: "Return to Yamini Studio",
    },
  }[language];

  return (
    <main className="coming-soon-shell">
      <div className="language-switch" aria-label="Language">
        <button onClick={() => setLanguage("pt")} className={language === "pt" ? "is-active" : ""}>PT-BR</button>
        <span aria-hidden="true">|</span>
        <button onClick={() => setLanguage("en")} className={language === "en" ? "is-active" : ""}>EN-UK</button>
      </div>
      <Link to="/" aria-label="Yamini Studio home"><img className="quiet-logo" src={logoAsset.url} alt="Yamini Studio" /></Link>
      <div className="coming-soon-copy">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        <Link className="text-link" to="/">{copy.back}</Link>
      </div>
    </main>
  );
}