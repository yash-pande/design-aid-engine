import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Search, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { catalogueCopy, selectProducts } from '@/lib/catalogue';
import type { Language } from '@/lib/language';
export function CatalogueSearch({ language }: { language: Language }) {
 const [open,setOpen] = useState(false); const [query,setQuery] = useState(''); const t = catalogueCopy[language];
 const results = selectProducts('',query,'featured',false,[]);
 return <><Button variant="ghost" size="icon" title={t.searchTitle} aria-label={t.searchTitle} onClick={() => setOpen(true)}><Search/></Button><Sheet open={open} onOpenChange={setOpen}><SheetContent side="right" className="catalogue-search-panel"><SheetTitle>{t.searchTitle}</SheetTitle><SheetDescription className="sr-only">{t.search}</SheetDescription><label className="search-panel-input"><Search size={18}/><Input aria-label={t.search} placeholder={t.searchPlaceholder} value={query} onChange={e => setQuery(e.target.value)}/></label><p className="search-panel-caption">{query ? `${results.length} ${t.pieces}` : t.searchPrompt}</p><div className="search-results">{results.map(p => <Link key={p.slug} to="/products/$slug" params={{ slug:p.slug }} className="search-result" onClick={() => setOpen(false)}><img src={p.images[0]} alt={p[language].name}/><div><p>{p[language].note}</p><h3>{p[language].name}</h3></div><ArrowUpRight size={16}/></Link>)}{!results.length && <p>{t.searchEmpty}</p>}</div></SheetContent></Sheet></>;
}