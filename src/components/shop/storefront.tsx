import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Heart, Leaf, Menu, Search, Sparkles, X, Mail, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { collections, products, type Product } from '@/lib/catalog';
import { useLanguage, LanguageSwitch } from '@/lib/language-context';

export type Panel = 'search' | 'saved' | 'inquiry' | 'menu' | null;

export type ShopState = {
  saved: string[];
  toggleSaved: (slug: string) => void;
  panel: Panel;
  setPanel: (panel: Panel) => void;
  inquiryProduct: Product | null;
  openInquiry: (product?: Product) => void;
};

const ShopContext = createContext<ShopState | null>(null);

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('Shop context is missing');
  return context;
}

export function Brand({ header = false }: { header?: boolean }) {
  return (
    <Link to="/" className={`brand ${header ? 'header-brand' : ''}`} aria-label="Yamini Studio home">
      <img src="/favicon.png" className="brand-logo brand-logo-desktop" width={557} height={448} alt="Yamini Studio" />
      <img src="/facicon-mobile.png" className="brand-logo brand-logo-mobile" width={115} height={115} alt="Yamini Studio" />
    </Link>
  );
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('yamini-saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [panel, setPanel] = useState<Panel>(null);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('yamini-saved', JSON.stringify(saved));
    } catch {
      /* ignore */
    }
  }, [saved]);

  function toggleSaved(slug: string) {
    setSaved((previous) => (previous.includes(slug) ? previous.filter((s) => s !== slug) : [...previous, slug]));
  }

  function openInquiry(product?: Product) {
    setInquiryProduct(product ?? null);
    setPanel('inquiry');
  }

  return (
    <ShopContext.Provider value={{ saved, toggleSaved, panel, setPanel, inquiryProduct, openInquiry }}>
      {children}
      {panel && <ShopDrawer panel={panel} onClose={() => setPanel(null)} />}
    </ShopContext.Provider>
  );
}

function ShopDrawer({ panel, onClose }: { panel: Panel; onClose: () => void }) {
  const { saved, toggleSaved, inquiryProduct } = useShop();
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const title =
    panel === 'search'
      ? (isPt ? 'Buscar Peças' : 'Search Pieces')
      : panel === 'saved'
      ? (isPt ? `Peças Salvas (${saved.length})` : `Saved Pieces (${saved.length})`)
      : panel === 'inquiry'
      ? (isPt ? 'Consulta ao Atelier' : 'Atelier Inquiry')
      : (isPt ? 'Coleções' : 'Collections');

  return (
    <SidePanel title={title} onClose={onClose}>
      {panel === 'menu' && (
        <div className="flex flex-col gap-6">
          <Link to="/" onClick={onClose} className="font-serif text-2xl font-normal hover:text-gold transition-colors">
            {isPt ? 'Início' : 'Home'}
          </Link>
          <Link to="/collections" onClick={onClose} className="font-serif text-2xl font-normal hover:text-gold transition-colors">
            {isPt ? 'Todas as Coleções' : 'All Collections'}
          </Link>
          {collections.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$collection"
              params={{ collection: c.slug }}
              onClick={onClose}
              className="font-serif text-2xl font-normal hover:text-gold transition-colors"
            >
              {isPt ? ('namePt' in c ? c.namePt : c.name) : ('nameEn' in c ? c.nameEn : c.name)}
              {!c.available && (
                <span className="ml-2 font-sans text-xs text-muted-foreground">
                  {isPt ? 'Em breve' : 'Launching soon'}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-4 border-t border-border mt-2">
            <LanguageSwitch />
          </div>
        </div>
      )}

      {panel === 'search' && (
        <>
          <input
            autoFocus
            className="search-input"
            aria-label={isPt ? 'Buscar na coleção' : 'Search the collection'}
            placeholder={isPt ? 'Buscar vestidos, tecidos, motivos, cores…' : 'Search dresses, textiles, motifs, colours…'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <p className="eyebrow text-muted-foreground mt-7">
            {search
              ? (isPt ? 'Peças encontradas' : 'Matching pieces')
              : (isPt ? 'Explorar o acervo' : 'Explore the showcase')}
          </p>
          {products
            .filter((p) => `${p.name} ${p.fabric} ${p.color} ${p.craft}`.toLowerCase().includes(search.toLowerCase()))
            .map((p) => (
              <PanelProduct key={p.slug} product={p} onNavigate={onClose} />
            ))}
          {!products.some((p) => `${p.name} ${p.fabric} ${p.color} ${p.craft}`.toLowerCase().includes(search.toLowerCase())) && (
            <p className="panel-empty">
              {isPt ? (
                <>
                  Nenhuma peça corresponde à sua busca.
                  <br />
                  Tente buscar por floral, zari, algodão, seda ou azul.
                </>
              ) : (
                <>
                  No pieces match your search.
                  <br />
                  Try searching floral, zari, cotton, silk, or blue.
                </>
              )}
            </p>
          )}
        </>
      )}

      {panel === 'saved' && (
        <>
          {saved.length === 0 ? (
            <div className="panel-empty">
              <p className="font-serif text-2xl font-normal mb-2">{isPt ? 'Nenhuma peça salva ainda' : 'No saved pieces yet'}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isPt
                  ? 'Clique no ícone de coração em qualquer vestido para guardar suas peças favoritas.'
                  : 'Click the heart icon on any dress to keep your favorite pieces handy.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-4">
                {isPt
                  ? 'Sua seleção de peças favoritas. Guarde para revisitar quando desejar.'
                  : 'Your selection of favorite pieces. Keep these handy to revisit anytime.'}
              </p>
              {products
                .filter((p) => saved.includes(p.slug))
                .map((p) => (
                  <PanelProduct
                    key={p.slug}
                    product={p}
                    onNavigate={onClose}
                    action={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={isPt ? `Remover ${p.name} das peças salvas` : `Remove ${p.name} from saved pieces`}
                        onClick={() => toggleSaved(p.slug)}
                      >
                        <X size={16} />
                      </Button>
                    }
                  />
                ))}
            </div>
          )}
        </>
      )}

      {panel === 'inquiry' && (
        <div className="atelier-inquiry">
          {inquiryProduct && (
            <div className="inquiry-piece-card mb-6 p-4 border border-border bg-card/60 flex gap-4 items-center">
              <img src={inquiryProduct.image} alt={inquiryProduct.name} className="w-14 h-20 object-cover" />
              <div>
                <p className="eyebrow text-gold text-[9px] mb-1">{inquiryProduct.fabric}</p>
                <h4 className="font-serif text-lg font-normal leading-tight">{inquiryProduct.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{inquiryProduct.color}</p>
              </div>
            </div>
          )}

          {submitted ? (
            <div className="panel-empty text-center py-10">
              <p className="font-serif text-3xl font-normal mb-3 text-gold">{isPt ? 'Obrigado' : 'Thank You'}</p>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {isPt
                  ? 'Recebemos sua consulta ao atelier. Alka e nossa equipe terão o prazer de entrar em contato em breve.'
                  : 'We have received your atelier inquiry. Alka and our atelier team will be delighted to connect with you shortly.'}
              </p>
              <Button variant="outline" className="mt-6 rounded-none" onClick={onClose}>
                {isPt ? 'Voltar ao acervo' : 'Back to showcase'}
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isPt
                  ? 'Interesse em caimento sob medida, consulta sobre tecidos ou uma conversa com o atelier? Deixe seus dados abaixo:'
                  : 'Interested in bespoke sizing, custom textile consultation, or a private preview? Leave your details below:'}
              </p>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  {isPt ? 'Seu Nome' : 'Your Name'}
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-border bg-transparent p-2 text-xs text-foreground outline-none focus:border-gold"
                  placeholder="Maria Silva"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  {isPt ? 'Email ou Telefone' : 'Email or Phone'}
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-border bg-transparent p-2 text-xs text-foreground outline-none focus:border-gold"
                  placeholder="contact@example.com / +55 ..."
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  {isPt ? 'Mensagem ou Dúvidas' : 'Message or Questions'}
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-border bg-transparent p-2 text-xs text-foreground outline-none focus:border-gold"
                  placeholder={
                    isPt
                      ? 'Gostaria de saber mais sobre caimento, tecidos ou disponibilidade...'
                      : 'I would love to learn more about the fabric, drape, and availability...'
                  }
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                />
              </div>

              <Button type="submit" className="add-button w-full mt-2">
                {isPt ? 'Enviar Consulta' : 'Send Inquiry'} <Send size={13} className="ml-2" />
              </Button>

              <div className="pt-4 border-t border-border mt-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                  {isPt ? 'Contato Direto' : 'Direct Contact'}
                </p>
                <div className="flex justify-center gap-4 text-xs">
                  <a
                    href="mailto:contact@yaministudio.com"
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail size={13} /> {isPt ? 'Email Atelier' : 'Email Atelier'}
                  </a>
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </SidePanel>
  );
}

export function ShopShell({ children }: { children: ReactNode }) {
  const { saved, setPanel } = useShop();
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <div className="shop-shell">
      <header className="site-header">
        <div className="page-width header-main">
          <div className="header-note">
            {isPt ? 'Herança indiana · Espírito brasileiro' : 'Indian heritage · Brazilian spirit'}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label={isPt ? 'Abrir menu de coleções' : 'Open collection menu'}
            onClick={() => setPanel('menu')}
          >
            <Menu />
          </Button>
          <Brand header />
          <div className="header-tools sm:ml-auto">
            <LanguageSwitch />
            <Button
              variant="ghost"
              size="icon"
              aria-label={isPt ? 'Buscar peças' : 'Search pieces'}
              title={isPt ? 'Buscar' : 'Search'}
              onClick={() => setPanel('search')}
            >
              <Search />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="saved-tool"
              aria-label={isPt ? 'Peças salvas' : 'Saved pieces'}
              title={isPt ? 'Peças salvas' : 'Saved pieces'}
              onClick={() => setPanel('saved')}
            >
              <Heart />
              {saved.length > 0 && <span className="text-[9px]">{saved.length}</span>}
            </Button>
          </div>
        </div>
        <nav className="nav-row" aria-label="Collections">
          {collections.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$collection"
              params={{ collection: c.slug }}
              className="nav-link"
              activeProps={{ 'data-status': 'active' }}
            >
              {isPt ? ('namePt' in c ? c.namePt : c.name) : ('nameEn' in c ? c.nameEn : c.name)}
              {!c.available && <span className="nav-soon">{isPt ? ' · Em breve' : ' · Launching soon'}</span>}
            </Link>
          ))}
        </nav>
      </header>

      {children}

      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-main">
            <Brand />
            <p className="footer-motto">
              {isPt ? 'Tecidos indianos. Sensibilidade brasileira.' : 'Indian textiles. Brazilian sensibility.'}
            </p>
            <Link to="/collections" className="eyebrow flex items-center gap-3">
              {isPt ? 'Explorar as coleções' : 'Explore the collection'} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Yamini Studio · Yamini Fashion House</span>
            <span>{isPt ? 'Enraizado na herança. Feito para novas histórias.' : 'Rooted in heritage. Made for new stories.'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PanelProduct({
  product,
  onNavigate,
  action,
}: {
  product: Product;
  onNavigate: () => void;
  action?: ReactNode;
}) {
  return (
    <div className="panel-item">
      <Link to="/products/$slug" params={{ slug: product.slug }} onClick={onNavigate}>
        <img src={product.image} width={85} height={125} alt={product.name} />
      </Link>
      <div className="flex-1">
        <Link to="/products/$slug" params={{ slug: product.slug }} onClick={onNavigate}>
          <h3 className="font-serif text-xl font-normal leading-tight">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">{product.fabric}</p>
        <p className="text-[10px] text-muted-foreground/80 mt-0.5">{product.color}</p>
      </div>
      {action}
    </div>
  );
}

export function SidePanel({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const panelContent = (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="side-panel" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="panel-heading">
          <h2>{title}</h2>
          <Button variant="ghost" size="icon" aria-label="Close panel" onClick={onClose}>
            <X />
          </Button>
        </div>
        {children}
      </section>
    </div>
  );

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(panelContent, document.body);
}

export function CraftStrip() {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <div className="craft-strip">
      <div className="craft-item">
        <Sparkles />
        <div>
          <h3>{isPt ? 'Artesanato indiano' : 'Indian craftsmanship'}</h3>
          <p>{isPt ? 'Uma história em cada fio' : 'A story in every thread'}</p>
        </div>
      </div>
      <div className="craft-item">
        <Leaf />
        <div>
          <h3>{isPt ? 'Tecidos naturais e nobres' : 'Beautiful, natural fabrics'}</h3>
          <p>{isPt ? 'Escolhidos por caráter e conforto' : 'Chosen for character and comfort'}</p>
        </div>
      </div>
      <div className="craft-item">
        <Heart />
        <div>
          <h3>{isPt ? 'Um guarda-roupa pensado' : 'A considered wardrobe'}</h3>
          <p>{isPt ? 'Peças para revisitar estação após estação' : 'Pieces to return to, season after season'}</p>
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ product, index = 1 }: { product: Product; index?: number }) {
  const { saved, toggleSaved } = useShop();
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const isSaved = saved.includes(product.slug);

  const displayName = (isPt ? product.namePt : product.nameEn) || product.name;
  const displayFabric = (isPt ? product.fabricPt : product.fabricEn) || product.fabric;
  const displayColor = (isPt ? product.colorPt : product.colorEn) || product.color;

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to="/products/$slug" params={{ slug: product.slug }} aria-label={`View ${displayName}`}>
          <img
            className="product-image"
            src={product.image}
            width={1024}
            height={1536}
            alt={`${displayName} in ${displayColor}`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          <span className="card-discover">
            {isPt ? 'Descobrir a peça' : 'Discover the piece'} <ArrowRight size={13} />
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="favorite-button"
          aria-label={isPt ? `${isSaved ? 'Remover' : 'Salvar'} ${displayName} dos favoritos` : `${isSaved ? 'Unsave' : 'Save'} ${displayName}`}
          aria-pressed={isSaved}
          onClick={() => toggleSaved(product.slug)}
        >
          <Heart className={isSaved ? 'fill-gold text-gold' : ''} size={15} />
        </Button>
      </div>
      <div className="product-info">
        <p className="product-fabric">{displayFabric}</p>
        <Link to="/products/$slug" params={{ slug: product.slug }}>
          <h2 className="product-name">{displayName}</h2>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[11px] text-muted-foreground">{displayColor}</span>
          <span className={`color-dot swatch-${product.swatch}`} title={displayColor} />
        </div>
      </div>
    </article>
  );
}
