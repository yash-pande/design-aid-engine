import { Link } from '@tanstack/react-router';
import { catalogueCopy } from '@/lib/catalogue';
import type { Language } from '@/lib/language';
export function CatalogueFooter({ language }: { language: Language }) {
 const t = catalogueCopy[language];
 return <><section className="catalogue-next"><p className="eyebrow">{t.next}</p><h2>MaYamini</h2><p>{t.maya}</p><Link to="/" hash="mayamini" className="text-link">{t.soon}</Link></section><footer className="catalogue-values">{[[t.craft,t.craftNote],[t.natural,t.naturalNote],[t.wardrobe,t.wardrobeNote]].map(([title,note]) => <div key={title}><h3>{title}</h3><p>{note}</p></div>)}</footer></>;
}