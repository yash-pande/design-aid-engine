import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronRight, Grid2X2, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { collections, products } from '@/lib/catalog';
import { CraftStrip, ProductCard } from './storefront';
import { useLanguage } from '@/lib/language-context';

export function CollectionPage({ slug }: { slug?: string }) {
  const collection = collections.find((c) => c.slug === slug);
  const all = !slug;
  const { language } = useLanguage();
  const [roomy, setRoomy] = useState(false);

  const isPt = language === 'pt';
  const items = collection ? products.filter((p) => p.category === collection.slug) : products;

  const title = all
    ? isPt
      ? 'A Arte da Elegância Cotidiana'
      : 'The Art of Everyday Elegance'
    : collection
    ? isPt
      ? ('namePt' in collection ? collection.namePt : collection.name)
      : ('nameEn' in collection ? collection.nameEn : collection.name)
    : isPt
    ? 'Coleção não encontrada'
    : 'Collection not found';

  const description = all
    ? isPt
      ? 'Raízes no artesanato indiano. Reimaginada para a vida brasileira.\nDescubra peças especiais, cada uma com uma história tecida em seu tecido.'
      : 'Rooted in Indian craftsmanship. Reimagined for Brazilian living.\nDiscover thoughtful pieces, each with a story woven into its fabric.'
    : collection
    ? isPt
      ? ('descriptionPt' in collection ? collection.descriptionPt : collection.description)
      : ('descriptionEn' in collection ? collection.descriptionEn : collection.description)
    : '';

  return (
    <main className="page-width">
      <div className="breadcrumb">
        <Link to="/">{isPt ? 'Início' : 'Home'}</Link>
        <ChevronRight size={10} />
        {all ? (
          <span>{isPt ? 'Coleções' : 'Collections'}</span>
        ) : (
          <>
            <Link to="/collections">{isPt ? 'Coleções' : 'Collections'}</Link>
            <ChevronRight size={10} />
            <span>{collection ? (isPt ? ('namePt' in collection ? collection.namePt : collection.name) : ('nameEn' in collection ? collection.nameEn : collection.name)) : (isPt ? 'Coleção não encontrada' : 'Collection not found')}</span>
          </>
        )}
      </div>

      <section className="collection-intro">
        <p className="eyebrow text-gold">{isPt ? 'A Coleção Yamini' : 'The Yamini Collection'}</p>
        <h1 className="collection-title">{title}</h1>
        <p className="collection-description">{description}</p>
      </section>

      {collection?.available === false ? (
        <div className="empty-collection">
          <p className="font-serif text-3xl md:text-4xl text-gold font-normal">{isPt ? 'Em breve' : 'Launching soon'}</p>
          <p className="text-xs text-muted-foreground">
            {isPt ? 'Algo especial está tomando forma.' : 'Something beautiful is taking shape.'}
          </p>
          <Button variant="outline" asChild className="rounded-none mt-3">
            <Link to="/collections">
              {isPt ? 'Explorar todas as peças' : 'Explore all pieces'} <ArrowRight />
            </Link>
          </Button>
        </div>
      ) : slug && !collection ? (
        <div className="empty-collection">
          <Button variant="outline" asChild>
            <Link to="/collections">{isPt ? 'Voltar às coleções' : 'Back to collections'}</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Clean Toolbar: Piece counter on left, 4-col / 2-col switcher on right */}
          <div className="catalog-toolbar">
            <div className="toolbar-actions">
              <span className="font-sans text-[.66rem] font-normal tracking-[.2em] uppercase text-muted-foreground">
                {items.length} {items.length === 1 ? (isPt ? 'peça' : 'piece') : isPt ? 'peças' : 'pieces'}
              </span>
            </div>

            <div className="toolbar-actions ml-auto">
              <div className="layout-tools flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-6 w-6 ${roomy ? 'text-muted-foreground' : 'text-foreground'}`}
                  aria-label={isPt ? 'Visualização em quatro colunas' : 'Four column view'}
                  aria-pressed={!roomy}
                  title={isPt ? 'Visualização em quatro colunas' : 'Four column view'}
                  onClick={() => setRoomy(false)}
                >
                  <LayoutGrid size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-6 w-6 ${roomy ? 'text-foreground' : 'text-muted-foreground'}`}
                  aria-label={isPt ? 'Visualização em duas colunas' : 'Two column view'}
                  aria-pressed={roomy}
                  title={isPt ? 'Visualização em duas colunas' : 'Two column view'}
                  onClick={() => setRoomy(true)}
                >
                  <Grid2X2 size={14} />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`products-grid ${roomy ? 'roomy' : ''}`}>
            {items.map((p, index) => (
              <ProductCard key={p.slug} product={p} index={index} />
            ))}
          </div>

          <div className="catalog-end">
            <span>{isPt ? 'Você descobriu todas as peças' : "You've discovered every piece"}</span>
            <div className="catalog-end-line" />
            <span className="font-serif text-lg md:text-xl italic">
              {isPt ? 'Uma nova história para cada tecido.' : 'A new story for every fabric.'}
            </span>
          </div>
        </>
      )}

      <CraftStrip />
    </main>
  );
}

export { CollectionPage as default };
