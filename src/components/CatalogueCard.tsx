import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from './CatalogueContext';
import { catalogueCopy, type Product } from '@/lib/catalogue';
import type { Language } from '@/lib/language';
export function CatalogueCard({ product, language }: { product: Product; language: Language }) {
 const t = catalogueCopy[language];
 const { saved, toggle } = useWishlist();
 const active = saved.includes(product.slug);
 return <article className="catalogue-card"><div className="catalogue-photo"><Link to="/products/$slug" params={{ slug: product.slug }}><img src={product.images[0]} alt={product[language].name} loading="lazy"/><span className="discover-piece">{t.discover}</span></Link><Button variant="ghost" size="icon" className="save-piece" aria-label={active ? t.saved : t.save} title={active ? t.saved : t.save} aria-pressed={active} onClick={() => toggle(product.slug)}><Heart fill={active ? 'currentColor' : 'none'}/></Button></div><p className="piece-note">{product[language].note}</p><h2><Link to="/products/$slug" params={{ slug: product.slug }}>{product[language].name}</Link></h2></article>;
}