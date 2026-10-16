import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { catalogueCopy, products, type Product } from '@/lib/catalogue';
import type { Language } from '@/lib/language';
import { useWishlist } from './CatalogueContext';
import { ProductGallery } from './ProductGallery';
import { CatalogueCard } from './CatalogueCard';
import { CatalogueFooter } from './CatalogueFooter';
export function ProductDetail({ product, language }: { product: Product; language: Language }) {
 const t = catalogueCopy[language]; const p = product[language]; const { saved,toggle } = useWishlist(); const active = saved.includes(product.slug);
 const categoryName = t.categories[product.category === 'mini-dresses' ? 0 : 1];
 return <><div className="catalogue-wrap"><nav className="catalogue-breadcrumb"><Link to="/">{t.home}</Link><span>›</span><Link to="/collections" search={{ category:product.category }}>{categoryName}</Link><span>›</span><span>{p.name}</span></nav><div className="product-detail"><ProductGallery product={product} language={language}/><div className="product-information"><p className="eyebrow product-motif">{p.note}</p><h1>{p.name}</h1><p className="piece-note">{t.eyebrow} · {categoryName}</p><p className="product-description">{p.description}</p><Button variant="ghost" className="product-wishlist" aria-pressed={active} onClick={() => toggle(product.slug)}><Heart fill={active ? 'currentColor' : 'none'}/>{active ? t.saved : t.save}</Button><p className="product-story-note">{t.pieceStory}</p><div className="product-accordions">{[[t.details,p.details],[t.fitCare,p.fit],[t.story,p.story]].map(([title,text],i) => <details key={title} open={i===0}><summary>{title}<span aria-hidden="true">+</span></summary><p>{text}</p></details>)}</div></div></div><section className="related-pieces"><p className="eyebrow">{t.continue}</p><h2>{t.related}</h2><div className="catalogue-grid columns-3">{products.filter(p => p.slug!==product.slug).map(p => <CatalogueCard key={p.slug} product={p} language={language}/>)}</div></section></div></>;
}