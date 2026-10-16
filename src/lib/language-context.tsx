import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { preferredLanguage, type Language } from "./language";
import { Button } from "@/components/ui/button";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  ready: boolean;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  ready: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("yamini-language");
        if (saved) return preferredLanguage(saved);
      }
    } catch {
      /* ignore */
    }
    return "en";
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "pt" ? "pt-BR" : "en-GB";
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("yamini-language", lang);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "pt" ? "pt-BR" : "en-GB";
    }
  };

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "yamini-language" && e.newValue) {
        setLanguageState(preferredLanguage(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, ready }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`language-switch ${className}`} aria-label="Language selection">
      <Button
        variant="ghost"
        className={language === "pt" ? "is-active" : ""}
        onClick={() => setLanguage("pt")}
      >
        PT-BR
      </Button>
      <span aria-hidden="true" className="text-border">|</span>
      <Button
        variant="ghost"
        className={language === "en" ? "is-active" : ""}
        onClick={() => setLanguage("en")}
      >
        EN-UK
      </Button>
    </div>
  );
}
