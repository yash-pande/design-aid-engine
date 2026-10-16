import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Plus,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Check,
  Sparkles,
  MessageCircle,
  Move,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, collections, type Product } from '@/lib/catalog';
import { ProductCard, useShop } from './storefront';
import { useLanguage } from '@/lib/language-context';

export function ProductPage({ product }: { product: Product }) {
  const collection = collections.find((c) => c.slug === product.category);
  const { saved, toggleSaved } = useShop();
  const { language } = useLanguage();
  const isPt = language === 'pt';

  const displayName = (isPt ? product.namePt : product.nameEn) || product.name;
  const displayFabric = (isPt ? product.fabricPt : product.fabricEn) || product.fabric;
  const displayColor = (isPt ? product.colorPt : product.colorEn) || product.color;
  const displayDescription = (isPt ? product.descriptionPt : product.descriptionEn) || product.description;
  const displayDetails = (isPt ? product.detailsPt : product.detailsEn) || product.details;
  const displayHeritage = (isPt ? product.heritagePt : product.heritageEn) || product.heritage;

  const [photoIndex, setPhotoIndex] = useState(0);

  // Compact precision hover zoom state
  const FLYOUT_SIZE = 330;
  const ZOOM_FACTOR = 2.6;
  const LENS_SIZE = Math.round(FLYOUT_SIZE / ZOOM_FACTOR); // 127px
  const [isHovering, setIsHovering] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
  const [bgSize, setBgSize] = useState({ w: 0, h: 0 });
  const photoRef = useRef<HTMLDivElement>(null);

  // Fullscreen studio lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const gallery = (product.gallery?.map((g) => ({
    ...g,
    label: (isPt ? g.labelPt : g.labelEn) || g.label,
  }))) ?? [
    { image: product.image, label: isPt ? 'Visão geral da peça' : 'Full garment view' },
    { image: product.image, label: isPt ? 'Detalhe do tecido' : 'Fabric detail view' },
  ];
  const photo = gallery[photoIndex] ?? gallery[0];
  const isSaved = saved.includes(product.slug);

  const prevPhoto = useCallback(() => {
    setPhotoIndex((i) => Math.max(0, i - 1));
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const nextPhoto = useCallback(() => {
    setPhotoIndex((i) => Math.min(gallery.length - 1, i + 1));
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  }, [gallery.length]);

  // Hover zoom lens math on main image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    if (W <= 0 || H <= 0) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const clampX = Math.max(0, Math.min(mouseX - LENS_SIZE / 2, W - LENS_SIZE));
    const clampY = Math.max(0, Math.min(mouseY - LENS_SIZE / 2, H - LENS_SIZE));

    setLensPos({ x: clampX, y: clampY });
    setBgSize({ w: W * ZOOM_FACTOR, h: H * ZOOM_FACTOR });
    setBgPos({ x: clampX * ZOOM_FACTOR, y: clampY * ZOOM_FACTOR });
  };

  // Keyboard navigation for both PDP view & Studio Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowLeft') {
        prevPhoto();
      } else if (e.key === 'ArrowRight') {
        nextPhoto();
      } else if (lightboxOpen) {
        if (e.key === 'Escape') {
          setLightboxOpen(false);
        } else if (e.key === '+' || e.key === '=') {
          setZoomLevel((z) => Math.min(4, Math.round((z + 0.5) * 10) / 10));
        } else if (e.key === '-' || e.key === '_') {
          setZoomLevel((z) => {
            const next = Math.max(1, Math.round((z - 0.5) * 10) / 10);
            if (next === 1) setPan({ x: 0, y: 0 });
            return next;
          });
        } else if (e.key === '0' || e.key.toLowerCase() === 'r') {
          setZoomLevel(1);
          setPan({ x: 0, y: 0 });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevPhoto, nextPhoto, lightboxOpen]);

  // Lock body scroll when Studio Lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxOpen]);

  // Lightbox wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoomLevel((prev) => {
      const delta = e.deltaY < 0 ? 0.35 : -0.35;
      const next = Math.min(4, Math.max(1, prev + delta));
      if (next <= 1) setPan({ x: 0, y: 0 });
      return Math.round(next * 10) / 10;
    });
  };

  // Lightbox double click zoom toggle
  const handleDoubleClick = () => {
    setZoomLevel((prev) => {
      const next = prev > 1 ? 1 : 2.5;
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  // Lightbox drag to pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };

  const handleMouseMovePan = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const maxPan = 550 * (zoomLevel - 1);
    setPan({
      x: Math.max(-maxPan, Math.min(maxPan, dragStart.current.panX + dx)),
      y: Math.max(-maxPan, Math.min(maxPan, dragStart.current.panY + dy)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <main className="page-width">
      <div className="breadcrumb">
        <Link to="/">{isPt ? 'Início' : 'Home'}</Link>
        <ChevronRight size={10} />
        <Link to="/collections">{isPt ? 'Coleções' : 'Collections'}</Link>
        <ChevronRight size={10} />
        <Link to="/collections/$collection" params={{ collection: product.category }}>
          {collection
            ? isPt
              ? 'namePt' in collection
                ? collection.namePt
                : collection.name
              : 'nameEn' in collection
                ? collection.nameEn
                : collection.name
            : isPt
              ? 'Coleção'
              : 'Collection'}
        </Link>
        <ChevronRight size={10} />
        <span>{displayName}</span>
      </div>

      <div className="pdp-layout">
        {/* Gallery Section */}
        <section className="pdp-gallery" aria-label={isPt ? 'Fotografias do acervo' : 'Product showcase photographs'}>
          <div className="pdp-photo-stage">
            <div
              ref={photoRef}
              className="pdp-photo"
              onMouseEnter={() => setIsHovering(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => {
                setLightboxOpen(true);
                setZoomLevel(1);
                setPan({ x: 0, y: 0 });
              }}
              title={isPt ? 'Clique para ampliar em tela cheia' : 'Click to inspect in full screen'}
            >
              <img src={photo?.image} width={1024} height={1536} alt={`${displayName}, ${photo?.label}`} />

              {/* Precision Loupe Lens Cursor */}
              {isHovering && (
                <div
                  className="zoom-lens"
                  style={{
                    left: `${lensPos.x}px`,
                    top: `${lensPos.y}px`,
                    width: `${LENS_SIZE}px`,
                    height: `${LENS_SIZE}px`,
                  }}
                />
              )}

              {/* Zoom hint badge */}
              <div className="zoom-hint-badge">
                <Sparkles size={12} className="text-gold" />
                <span>{isPt ? 'Passe o cursor para ampliar · Clique para tela cheia' : 'Hover to zoom · Click to inspect'}</span>
              </div>

              {/* Previous Image Button (hidden on first image) */}
              {photoIndex > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="gallery-nav-button gallery-nav-prev"
                  aria-label={isPt ? 'Fotografia anterior' : 'Previous photograph'}
                  title={isPt ? 'Anterior (Seta Esquerda)' : 'Previous (Left Arrow)'}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevPhoto();
                  }}
                >
                  <ChevronLeft size={20} />
                </Button>
              )}

              {/* Next Image Button (hidden on last image) */}
              {photoIndex < gallery.length - 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="gallery-nav-button gallery-nav-next"
                  aria-label={isPt ? 'Próxima fotografia' : 'Next photograph'}
                  title={isPt ? 'Próxima (Seta Direita)' : 'Next (Right Arrow)'}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextPhoto();
                  }}
                >
                  <ChevronRight size={20} />
                </Button>
              )}

              {/* Studio Lightbox Trigger Button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-4 right-4 rounded-full bg-background/85 hover:bg-background shadow-md border border-border z-20"
                aria-label={isPt ? 'Abrir modo de inspeção' : 'Open studio inspection'}
                title={isPt ? 'Modo de inspeção em tela cheia' : 'Full screen inspection mode'}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                  setZoomLevel(1);
                  setPan({ x: 0, y: 0 });
                }}
              >
                <ZoomIn size={16} />
              </Button>
            </div>

            {/* Myntra-style Flyout Magnifier Pane */}
            {isHovering && (
              <div
                className="zoom-flyout"
                aria-hidden="true"
                style={{
                  backgroundImage: `url(${photo?.image})`,
                  backgroundSize: `${bgSize.w}px ${bgSize.h}px`,
                  backgroundPosition: `-${bgPos.x}px -${bgPos.y}px`,
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="zoom-flyout-tag">
                  <Sparkles size={11} />
                  <span>2.6× {isPt ? 'Detalhe do Tecido' : 'Artisan Weave Detail'}</span>
                </div>
                <div className="zoom-flyout-footer">
                  <span>{isPt ? 'Mova o cursor para explorar · Clique para abrir estúdio' : 'Move cursor to explore · Click to open full studio'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Gallery Thumbnails */}
          <div className="gallery-thumbs">
            {gallery.map((item, index) => (
              <Button
                key={item.label}
                variant="ghost"
                className="gallery-thumb"
                aria-label={item.label}
                aria-pressed={photoIndex === index}
                onClick={() => {
                  setPhotoIndex(index);
                  setZoomLevel(1);
                  setPan({ x: 0, y: 0 });
                }}
              >
                <img src={item.image} width={66} height={90} alt={item.label} />
              </Button>
            ))}
          </div>
        </section>

        {/* Dress Details & Story */}
        <section className="pdp-details">
          <p className="eyebrow text-gold">{displayFabric}</p>
          <h1 className="pdp-title">{displayName}</h1>
          <p className="eyebrow">
            {isPt ? 'O Acervo Yamini' : 'The Yamini Showcase'} ·{' '}
            {collection
              ? isPt
                ? 'namePt' in collection
                  ? collection.namePt
                  : collection.name
                : 'nameEn' in collection
                  ? collection.nameEn
                  : collection.name
              : ''}
          </p>

          <p className="pdp-description">{displayDescription}</p>

          <div className="mb-6 flex items-center gap-3">
            <span className="font-sans text-[13px] font-light text-muted-foreground">
              {isPt ? 'Cor & Tonalidade:' : 'Colour & Palette:'}
            </span>
            <span className="font-sans text-[13px] font-normal text-foreground">{displayColor}</span>
            <span className={`color-dot swatch-${product.swatch} ml-1`} title={displayColor} />
          </div>

          {/* Action button: Save Piece */}
          <div className="pt-2 pb-6 border-b border-border">
            <Button
              variant="outline"
              className="w-full h-12 rounded-none border-border font-sans text-[.68rem] font-medium tracking-[.16em] uppercase hover:bg-accent/30 transition-colors"
              onClick={() => toggleSaved(product.slug)}
            >
              <Heart size={14} className={`mr-2 ${isSaved ? 'fill-gold text-gold' : ''}`} />
              {isSaved
                ? isPt
                  ? 'Salva nos seus favoritos'
                  : 'Saved in your favorites'
                : isPt
                  ? 'Salvar peça nos favoritos'
                  : 'Save piece to favorites'}
            </Button>
          </div>

          <div className="pt-5 space-y-2.5">
            <p className="font-sans text-[14px] font-light text-muted-foreground flex items-center gap-2.5">
              <Check size={13} className="text-gold flex-shrink-0" />{' '}
              {isPt ? 'Tecidos artesanais e exclusivos' : 'Handcrafted artisan textiles'}
            </p>
            <p className="font-sans text-[14px] font-light text-muted-foreground flex items-center gap-2.5">
              <Sparkles size={13} className="text-gold flex-shrink-0" />{' '}
              {isPt ? 'Reimaginado para a vida contemporânea brasileira' : 'Reimagined for contemporary Brazilian living'}
            </p>
            <p className="font-sans text-[14px] font-light text-muted-foreground flex items-center gap-2.5">
              <MessageCircle size={13} className="text-gold flex-shrink-0" />{' '}
              {isPt ? 'Consultas privadas e atendimento personalizado' : 'Private consultations and tailored inquiries welcome'}
            </p>
          </div>

          {/* Detailed Narrative Accordion */}
          <div className="detail-accordion">
            <details open>
              <summary>
                {isPt ? 'Design & Modelagem' : 'Design & Construction'} <Plus size={13} />
              </summary>
              <p>
                {displayDetails ??
                  (isPt
                    ? `${displayFabric}. Projetado com equilíbrio arquitetônico entre fluidez e elegância. O caimento natural do tear artesanal acompanha com suavidade cada movimento.`
                    : `${displayFabric}. Designed with an architectural balance of ease and elegance. The natural drape of artisan-loomed cloth moves fluidly with every step.`)}
              </p>
            </details>

            <details>
              <summary>
                {isPt ? 'Herança Têxtil & Artesanato' : 'Textile Heritage & Craft'} <Plus size={13} />
              </summary>
              <p>
                {displayHeritage ??
                  (isPt
                    ? 'Inspirado nas nobres tradições têxteis de Maharashtra e nos teares manuais da Índia. Cada motivo preserva saberes geracionais honrados por mestres tecelões e estampadores.'
                    : 'Rooted in the royal textile traditions of Maharashtra and India’s storied handloom centers. Every motif reflects generational knowledge preserved by master weavers and printers.')}
              </p>
            </details>

            <details>
              <summary>
                {isPt ? 'Consultas ao Atelier' : 'Atelier Consultations'} <Plus size={13} />
              </summary>
              <p>
                {isPt
                  ? 'As criações Yamini Studio são desenvolvidas em edições limitadas no atelier. Para agendamentos exclusivos, consultas de modelagem sob medida ou prévias das coleções, nosso atelier está ao seu dispor.'
                  : 'Yamini Studio pieces are crafted in limited atelier runs. For bespoke appointments, custom sizing discussions, or collection previews, our atelier is at your service.'}
              </p>
            </details>

            <details>
              <summary>
                {isPt ? 'Cuidados com a Peça' : 'Care for Heirloom Cloth'} <Plus size={13} />
              </summary>
              <p>
                {isPt
                  ? 'Cuide dos tecidos artesanais com atenção e delicadeza. Recomendamos lavagem a seco suave ou lavagem manual cuidadosa com água fria e sabão neutro. Guarde ao abrigo da luz solar direta para preservar a intensidade dos pigmentos naturais e fios metálicos de zari.'
                  : 'Treat delicate artisan textiles with mindful affection. We recommend gentle dry cleaning or careful cold hand-washing using mild natural soap. Store away from direct sunlight to preserve the richness of natural dyes and metallic threads.'}
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* Related Pieces */}
      <section className="related-section">
        <p className="eyebrow text-gold mb-2">{isPt ? 'Continue a história' : 'Continue the story'}</p>
        <h2>{isPt ? 'Você também pode gostar' : 'You may also love'}</h2>
        <div className="products-grid">
          {products
            .filter((p) => p.slug !== product.slug)
            .map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
        </div>
      </section>

      {/* Full-Screen Luxury Studio Lightbox */}
      {lightboxOpen && (
        <div
          className="studio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={displayName}
          onMouseUp={handleMouseUp}
        >
          {/* Lightbox Header */}
          <header className="lightbox-header">
            <div className="lightbox-meta">
              <h2 className="lightbox-title">{displayName}</h2>
              <span className="lightbox-subtitle">
                {photo?.label} · {photoIndex + 1} / {gallery.length}
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="lightbox-controls">
              <Button
                variant="ghost"
                size="icon"
                className="lightbox-ctrl-btn"
                disabled={zoomLevel <= 1}
                aria-label={isPt ? 'Diminuir zoom' : 'Zoom out'}
                title={isPt ? 'Diminuir zoom (-)' : 'Zoom out (-)'}
                onClick={() => {
                  setZoomLevel((z) => {
                    const next = Math.max(1, Math.round((z - 0.5) * 10) / 10);
                    if (next === 1) setPan({ x: 0, y: 0 });
                    return next;
                  });
                }}
              >
                <ZoomOut size={16} />
              </Button>

              <span className="lightbox-zoom-val">{Math.round(zoomLevel * 100)}%</span>

              <Button
                variant="ghost"
                size="icon"
                className="lightbox-ctrl-btn"
                disabled={zoomLevel >= 4}
                aria-label={isPt ? 'Aumentar zoom' : 'Zoom in'}
                title={isPt ? 'Aumentar zoom (+)' : 'Zoom in (+)'}
                onClick={() => {
                  setZoomLevel((z) => Math.min(4, Math.round((z + 0.5) * 10) / 10));
                }}
              >
                <ZoomIn size={16} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lightbox-ctrl-btn ml-1"
                disabled={zoomLevel === 1 && pan.x === 0 && pan.y === 0}
                aria-label={isPt ? 'Redefinir visualização' : 'Reset view'}
                title={isPt ? 'Redefinir (R ou 0)' : 'Reset (R or 0)'}
                onClick={() => {
                  setZoomLevel(1);
                  setPan({ x: 0, y: 0 });
                }}
              >
                <RotateCcw size={14} />
              </Button>
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lightbox-close-btn"
              aria-label={isPt ? 'Fechar inspeção' : 'Close inspection'}
              title={isPt ? 'Fechar (Esc)' : 'Close (Esc)'}
              onClick={() => setLightboxOpen(false)}
            >
              <X size={18} />
            </Button>
          </header>

          {/* Lightbox Stage */}
          <div
            className="lightbox-stage"
            onWheel={handleWheel}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMovePan}
            style={{
              cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
            }}
          >
            {/* Pan Hint badge when zoomed in */}
            {zoomLevel > 1 && (
              <div className="lightbox-pan-hint">
                <Move size={12} className="text-gold" />
                <span>{isPt ? 'Arraste para mover · Clique duplo para resetar' : 'Drag to pan · Double click to reset'}</span>
              </div>
            )}

            <div
              className="lightbox-img-canvas"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
                transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <img src={photo?.image} alt={`${displayName}, ${photo?.label}`} />
            </div>

            {/* Left Nav Button (hidden on first image) */}
            {photoIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="lightbox-nav-btn lightbox-nav-prev"
                aria-label={isPt ? 'Fotografia anterior' : 'Previous photograph'}
                title={isPt ? 'Anterior (Seta Esquerda)' : 'Previous (Left Arrow)'}
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
              >
                <ChevronLeft size={24} />
              </Button>
            )}

            {/* Right Nav Button (hidden on last image) */}
            {photoIndex < gallery.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="lightbox-nav-btn lightbox-nav-next"
                aria-label={isPt ? 'Próxima fotografia' : 'Next photograph'}
                title={isPt ? 'Próxima (Seta Direita)' : 'Next (Right Arrow)'}
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
              >
                <ChevronRight size={24} />
              </Button>
            )}
          </div>

          {/* Lightbox Footer Filmstrip & Shortcuts */}
          <footer className="lightbox-footer">
            <div className="lightbox-filmstrip">
              {gallery.map((item, index) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="lightbox-thumb"
                  aria-pressed={photoIndex === index}
                  aria-label={item.label}
                  onClick={() => {
                    setPhotoIndex(index);
                    setZoomLevel(1);
                    setPan({ x: 0, y: 0 });
                  }}
                >
                  <img src={item.image} alt={item.label} />
                </Button>
              ))}
            </div>

            <div className="lightbox-keys-hint">
              <span>
                <kbd>←</kbd>
                <kbd>→</kbd> {isPt ? 'Navegar' : 'Navigate'}
              </span>
              <span>
                <kbd>Scroll</kbd> {isPt ? 'Zoom' : 'Zoom'}
              </span>
              <span>
                <kbd>Duplo clique</kbd> {isPt ? 'Alternar 2.5×' : 'Toggle 2.5×'}
              </span>
              <span>
                <kbd>Esc</kbd> {isPt ? 'Fechar' : 'Close'}
              </span>
            </div>
          </footer>
        </div>
      )}
    </main>
  );
}

export { ProductPage as default };
