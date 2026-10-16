import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { Menu } from "lucide-react";
import { SidePanel } from "@/components/shop/storefront";
import { collections } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { type Language } from "@/lib/language";
import silkHero from "@/assets/silk-hero.jpg";
import silkZari from "@/assets/silk-zari.jpg";
import cottonPrint from "@/assets/cotton-print.jpg";
import textileMemory from "@/assets/textile-memory.jpg";
import miniDress from "@/assets/mini-dress.jpg";
import maxiDress from "@/assets/maxi-dress.jpg";
import beachwear from "@/assets/beachwear.jpg";
import bagsAccessories from "@/assets/bags-accessories.jpg";
import indiaCraft from "@/assets/india-craft.jpg";
import brazilLight from "@/assets/brazil-light.jpg";
import mayaminiDresses from "@/assets/mayamini-dresses.jpg";
import creativeWorkspace from "@/assets/creative-workspace.jpg";

const fabricImages = [silkZari, cottonPrint, textileMemory];
const categoryImages = [miniDress, maxiDress, beachwear, bagsAccessories];

const content = {
  pt: {
    meta: "Herança indiana. Espírito brasileiro.",
    nav: ["Yamini", "Coleções", "MaYamini", "Fundadora", "Filosofia"],
    menu: "Abrir menu", close: "Fechar menu",
    yaminiDrop: ["Por que Yamini?", "Da Índia ao Brasil", "O encontro de duas culturas"],
    collectionDrop: ["Vestidos Mini", "Vestidos Maxi", "Beachwear", "Bolsas e Acessórios"],
    heroLabel: "Herança indiana. Espírito brasileiro.",
    heroIntro: "Yamini Studio é uma marca de moda da Yamini Fashion House, criada para levar a beleza, o caráter e a riqueza dos têxteis indianos às mulheres brasileiras.",
    discover: "Conheça nossa história", heroImage: "Seda tecida à mão sob luz natural suave",
    whyTitle: "Por que Yamini?", why: [
      "O nome Yamini ocupa um lugar especial na língua, na cultura e no imaginário indianos. É também o nome de nascimento de nossa fundadora e criadora, Alka Deshmukh, tornando-o profundamente pessoal para a história da marca.",
      "Na Índia, tradicionalmente se dá um nome às crianças ao nascer, muitas vezes durante um Namkaran, ou cerimônia de nomeação. O nome de uma criança é frequentemente escolhido por seu significado e pode expressar um desejo, uma bênção ou uma qualidade que a família espera que ela encarne. Em muitas famílias, uma pessoa também pode receber outro nome mais tarde ou tornar-se conhecida por um nome diferente na vida cotidiana.",
      "Para Alka, esse nome é Yamini, criando uma ligação profundamente pessoal com suas raízes indianas, sua infância e sua identidade. Escolhê-lo para a marca é uma forma de trazer essa herança pessoal a tudo o que Yamini Studio cria.",
      "Em sânscrito, Yāminī (यामिनी) refere-se à noite e evoca a ideia de uma noite dividida em diferentes vigílias ou períodos de tempo. No uso poético e cultural, o nome está associado à imagem de uma noite estrelada e de uma luz na escuridão. O nome também carrega associações com expressão artística, beleza e criatividade, qualidades centrais ao espírito de Yamini Studio.",
      "Nas tradições filosóficas indianas, a noite pode representar calma, paz profunda, mistério e repouso. Ela evoca a quietude de um momento em que o mundo desacelera, abrindo espaço para reflexão e renovação.",
      "A imagem de uma luz na escuridão também traz um sentido de esperança, acolhimento e orientação. Evoca alguém que oferece clareza e conforto mesmo em tempos difíceis ou incertos.",
      "Essas ideias ressoam profundamente com o que Yamini Studio representa. Queremos que nossa marca carregue as mesmas qualidades de beleza, calma, acolhimento e confiança serena, celebrando ao mesmo tempo a riqueza do artesanato indiano.",
    ],
    whyQuote: "Yamini é, portanto, nome e filosofia. Conecta nossa fundadora às suas raízes e expressa o espírito que desejamos que nossas criações levem à vida das mulheres que as vestem.",
    indiaTitle: "Da Índia ao Brasil", india: [
      "Yamini Studio nasceu do desejo de levar a beleza dos tecidos tradicionais indianos a um contexto brasileiro contemporâneo.",
      "Trabalhamos com belos têxteis indianos, com especial apreço pelos tecidos e pelo artesanato de Maharashtra e de outras regiões da Índia. A linguagem de design de Yamini Studio também se inspira na herança cultural de Maharashtra, sobretudo nas tradições e estéticas ligadas aos clãs 96 Kuli Maratha, historicamente associados à aristocracia e às linhagens reais Maratha. Essa inspiração se expressa em detalhes, formas, motivos, texturas e em uma elegância discreta.",
      "Cada tecido carrega sua própria história através das cores, texturas, padrões e modos de fazer.",
      "Em vez de reproduzir vestimentas indianas tradicionais, usamos esses tecidos para criar peças contemporâneas pensadas para o estilo de vida brasileiro.",
      "Nossas coleções incluem vestidos mini, vestidos maxi, beachwear e acessórios como bolsas, unindo a riqueza dos têxteis indianos ao caráter descontraído e vibrante da moda brasileira.",
      "A intenção é simples.",
    ],
    indiaQuote: "Preservar a alma do tecido enquanto lhe damos uma nova vida.",
    fabricCaps: ["Seda tecida à mão e fio zari", "Algodão e impressão artesanal", "Textura, cor e memória"],
    categories: ["Vestidos Mini", "Vestidos Maxi", "Beachwear", "Bolsas e Acessórios"],
    cultureTitle: "O encontro de duas culturas", culture: [
      "Índia e Brasil são países ricos em cor, artesanato, natureza e expressão cultural. Yamini Studio aproxima esses dois mundos através da moda.",
      "Nossas criações têm raízes nas tradições têxteis indianas e são desenhadas para as mulheres brasileiras e seu modo de viver.",
      "Nosso objetivo é unir estética e conforto. Acreditamos que roupas belas não devem exigir uma escolha entre uma aparência singular e o bem-estar.",
      "Cada peça é uma oportunidade de vivenciar a beleza dos tecidos indianos em uma forma contemporânea, natural e em casa no Brasil.",
    ],
    indiaLabel: "Índia · origem e ofício", brazilLabel: "Brasil · luz e movimento",
    mayaTitle: "MaYamini", maya: [
      "Yamini Studio também abriga MaYamini, uma linha especial de Yamini Studio que celebra o vínculo entre mães e suas bebês meninas.",
      "Inspirada pela ligação única entre mãe e filha, MaYamini leva as cores, texturas e tecidos de Yamini Studio a peças coordenadas criadas para celebrar a união.",
      "É mais do que vestir roupas combinando. É criar momentos e memórias que serão guardados muito depois de as roupas terem sido usadas.",
    ],
    mayaQuote: "MaYamini celebra as pequenas meninas que começam suas próprias histórias e as mães que estão ali para compartilhá-las.",
    founderLabel: "Fundadora e Criadora", founder: [
      "Alka Deshmukh é a fundadora e força criativa por trás de Yamini Studio. Nascida Yamini, escolheu seu nome de nascimento para sua marca de moda, dando à marca uma conexão pessoal e cultural.",
      "Seu apreço pelos têxteis e pelo artesanato indianos, unido à sua conexão com o Brasil, inspirou-a a criar uma marca capaz de aproximar essas duas culturas.",
      "Para Alka, os tecidos indianos são mais do que materiais. Representam história, artesanato, cor, memória e identidade. Sua visão é levar esses belos têxteis além de seu contexto tradicional e apresentá-los às mulheres brasileiras por meio da moda contemporânea.",
      "Yamini Studio reflete sua própria experiência de conectar culturas e encontrar beleza no espaço entre elas.",
      "Por meio de suas criações, Alka deseja oferecer às mulheres brasileiras roupas e acessórios que combinem a estética dos têxteis indianos com o conforto e a leveza do viver brasileiro.",
    ],
    workspace: "O olhar criativo · seda, esboços e fio zari",
    mayaImage: "Vestidos coordenados para mãe e filha em algodão estampado",
    cultureEyebrow: "Índia × Brasil", mayaEyebrow: "Mãe · filha",
    copyright: "© 2026 Yamini Fashion House. Yamini Studio é uma marca da Yamini Fashion House.",
    philosophyLabel: "Nossa Filosofia", philosophyTitle: "Tecidos belos merecem novas histórias.",
    philosophy: "Yamini Studio celebra a herança têxtil indiana, permitindo que ela evolua através da moda brasileira contemporânea. Acreditamos que a moda pode conectar culturas sem apagar sua individualidade. A tradição pode inspirar algo moderno. A beleza pode coexistir com o conforto. E um tecido que atravessou gerações pode começar uma história inteiramente nova em outra parte do mundo.",
    signoff: "Têxteis indianos. Sensibilidade brasileira. Uma nova história para cada tecido.",
    disclaimer: "As imagens indicam a direção artística da futura fotografia da marca.", backTop: "Voltar ao topo",
  },
  en: {
    meta: "Indian Heritage. Brazilian Spirit.",
    nav: ["Yamini", "Collections", "MaYamini", "Founder", "Philosophy"],
    menu: "Open menu", close: "Close menu",
    yaminiDrop: ["Why Yamini?", "From India to Brazil", "A Meeting of Two Cultures"],
    collectionDrop: ["Mini Dresses", "Maxi Dresses", "Beachwear", "Bags & Accessories"],
    heroLabel: "Indian Heritage. Brazilian Spirit.",
    heroIntro: "Yamini Studio is a fashion label owned by Yamini Fashion House, created to bring the beauty, character and richness of Indian textiles to Brazilian women.",
    discover: "Discover our story", heroImage: "Hand-woven silk in soft natural light",
    whyTitle: "Why Yamini?", why: [
      "The name Yamini holds a special place in Indian language, culture and imagination. It is also the birth name of our founder and creator, Alka Deshmukh, making the name deeply personal to the story of the brand.",
      "In India, children are traditionally given a name at birth, often during a Namkaran, or naming ceremony. A child's name is frequently chosen for its meaning and may express a wish, blessing or quality that the family hopes the child will embody. In many families, a person may also later acquire another name or become known by a different name in everyday life.",
      "For Alka, that name is Yamini, making it a deeply personal connection to her Indian roots, childhood and identity. Choosing it for the brand is a way of bringing that personal heritage into everything Yamini Studio creates.",
      "In Sanskrit, Yāminī (यामिनी) refers to the night and evokes the idea of a night divided into different watches or periods of time. In poetic and cultural usage, the name is associated with the imagery of a starry night and a light in the darkness. The name also carries associations with artistic expression, beauty and creativity, qualities that are central to the spirit of Yamini Studio.",
      "In Indian philosophical traditions, the night can represent calmness, deep peace, mystery and rest. It evokes the quietness of a moment when the world slows down, creating space for reflection and renewal.",
      "The imagery of a light in the darkness also carries a sense of hope, warmth and guidance. It evokes someone who brings clarity and comfort even during difficult or uncertain times.",
      "These ideas resonate deeply with what Yamini Studio represents. We want our brand to carry the same qualities of beauty, calmness, warmth and quiet confidence, while celebrating the richness of Indian craftsmanship.",
    ],
    whyQuote: "Yamini is therefore both a name and a philosophy. It connects our founder to her roots while expressing the spirit we want our creations to bring into the lives of the women who wear them.",
    indiaTitle: "From India to Brazil", india: [
      "Yamini Studio was born from a desire to bring the beauty of Indian traditional fabrics into a contemporary Brazilian context.",
      "We work with beautiful Indian textiles, with a special appreciation for fabrics and craftsmanship from Maharashtra and other regions of India. The design language of Yamini Studio is also inspired by the cultural heritage of Maharashtra, particularly the traditions and aesthetics associated with the 96 Kuli Maratha clans, historically connected with the Maratha aristocracy and royal lineages. This inspiration finds expression through details, forms, motifs, textures and a sense of understated elegance.",
      "Each fabric carries its own history through its colours, textures, patterns and methods of making.",
      "Rather than reproducing traditional Indian clothing, we use these fabrics to create contemporary pieces designed with the Brazilian lifestyle in mind.",
      "Our collections include mini dresses, maxi dresses, beachwear and accessories such as bags, bringing together the richness of Indian textiles and the relaxed, vibrant character of Brazilian fashion.",
      "The intention is simple.",
    ],
    indiaQuote: "To preserve the soul of the fabric while giving it a new life.",
    fabricCaps: ["Hand-woven silk and zari thread", "Cotton and artisan print", "Texture, colour and memory"],
    categories: ["Mini Dresses", "Maxi Dresses", "Beachwear", "Bags & Accessories"],
    cultureTitle: "A Meeting of Two Cultures", culture: [
      "India and Brazil are both countries rich in colour, craftsmanship, nature and cultural expression. Yamini Studio brings these two worlds together through fashion.",
      "Our creations are rooted in Indian textile traditions while being designed for Brazilian women and their way of living.",
      "Our goal is to bring aesthetics and comfort together. We believe beautiful clothing should not require a compromise between looking distinctive and feeling comfortable.",
      "Every piece is an opportunity to experience the beauty of Indian fabrics in a form that feels contemporary, natural and at home in Brazil.",
    ],
    indiaLabel: "India · origin and craft", brazilLabel: "Brazil · light and movement",
    mayaTitle: "MaYamini", maya: [
      "Yamini Studio is also home to MaYamini, a special line by Yamini Studio celebrating the bond between mothers and their baby girls.",
      "Inspired by the unique bond between mother and daughter, MaYamini brings the colours, textures and fabrics of Yamini Studio into coordinated pieces designed to celebrate togetherness.",
      "It is about more than matching clothes. It is about creating moments and memories that can be cherished long after the clothes have been worn.",
    ],
    mayaQuote: "MaYamini celebrates the little girls who are beginning their own stories and the mothers who are there to share them.",
    founderLabel: "Founder and Creator", founder: [
      "Alka Deshmukh is the founder and creative force behind Yamini Studio. Born Yamini, she chose her birth name as the name of her fashion label, giving the brand a connection that is both personal and cultural.",
      "Her appreciation for Indian textiles and craftsmanship, combined with her connection to Brazil, inspired her to create a brand that could bring these two cultures together.",
      "For Alka, Indian fabrics are more than materials. They represent history, craftsmanship, colour, memory and identity. Her vision is to take these beautiful textiles beyond their traditional context and introduce them to Brazilian women through contemporary fashion.",
      "Yamini Studio reflects her own experience of connecting cultures and finding beauty in the space between them.",
      "Through her creations, Alka hopes to offer Brazilian women clothing and accessories that combine the aesthetics of Indian textiles with the comfort and ease of Brazilian living.",
    ],
    workspace: "The creative eye · silk, sketches and zari thread",
    mayaImage: "Coordinated mother and daughter dresses in printed cotton",
    cultureEyebrow: "India × Brazil", mayaEyebrow: "Mother · daughter",
    copyright: "© 2026 Yamini Fashion House. Yamini Studio is a label owned by Yamini Fashion House.",
    philosophyLabel: "Our Philosophy", philosophyTitle: "Beautiful fabrics deserve new stories.",
    philosophy: "Yamini Studio celebrates Indian textile heritage while allowing it to evolve through contemporary Brazilian fashion. We believe fashion can connect cultures without erasing their individuality. Tradition can inspire something modern. Beauty can coexist with comfort. And a fabric that has travelled through generations can begin a completely new story in another part of the world.",
    signoff: "Indian textiles. Brazilian sensibility. A new story for every fabric.",
    disclaimer: "Images indicate the art direction for the brand's future photography.", backTop: "Back to top",
  },
} as const;

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Yamini Studio — Indian Heritage. Brazilian Spirit." },
    { name: "description", content: "Yamini Studio brings Indian textile heritage to contemporary Brazilian fashion." },
    { property: "og:title", content: "Yamini Studio — Indian Heritage. Brazilian Spirit." },
    { property: "og:description", content: "Yamini Studio brings Indian textile heritage to contemporary Brazilian fashion." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }] }),
  component: Index,
});

function Index() {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = content[language];
  const navLinks = useMemo(() => [
    [t.nav[0], "#yamini"], [t.nav[1], "#collections"], [t.nav[2], "#mayamini"],
    [t.nav[3], "#founder"], [t.nav[4], "#philosophy"],
  ] as const, [t]);

  useEffect(() => {
    document.title = language === "pt" ? "Yamini Studio — Herança indiana. Espírito brasileiro." : "Yamini Studio — Indian Heritage. Brazilian Spirit.";
  }, [language]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 70);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      document.documentElement.style.setProperty("--thread-progress", `${progress}%`);
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLanguage = (next: Language) => { setLanguage(next); setMenuOpen(false); };
  const LanguageSwitch = () => <div className="language-switch" aria-label="Language selection"><Button variant="ghost" className={language === "pt" ? "is-active" : ""} onClick={() => changeLanguage("pt")}>PT-BR</Button><span aria-hidden="true">|</span><Button variant="ghost" className={language === "en" ? "is-active" : ""} onClick={() => changeLanguage("en")}>EN-UK</Button></div>;

  const isPt = language === "pt";

  return <div className="page">
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="brand-row"><a href="#top" aria-label="Yamini Studio"><img src="/favicon.png" alt="Yamini Studio" className="brand-logo-desktop" /></a></div>
      <nav className="desktop-nav" aria-label="Main navigation">
        <div className="nav-item"><a href="#yamini">{t.nav[0]}</a><div className="nav-dropdown">{t.yaminiDrop.map((item, i) => <a key={item} href={["#yamini", "#collections", "#cultures"][i]}>{item}</a>)}</div></div>
        <div className="nav-item"><Link to="/collections">{t.nav[1]}</Link></div>
        {navLinks.slice(2).map(([label, href]) => <div className="nav-item" key={href}><a href={href}>{label}</a></div>)}
        <LanguageSwitch />
      </nav>
      <div className="mobile-bar">
        <Button
          variant="ghost"
          size="icon"
          aria-label={menuOpen ? t.close : t.menu}
          onClick={() => setMenuOpen(true)}
        >
          <Menu />
        </Button>
        <a href="#top" aria-label="Yamini Studio" className="mobile-brand-link">
          <img src="/facicon-mobile.png" alt="Yamini Studio" className="mobile-brand-logo" width="115" height="115" />
        </a>
        <LanguageSwitch />
      </div>
    </header>

    {menuOpen && (
      <SidePanel title={isPt ? "Navegação" : "Menu"} onClose={() => setMenuOpen(false)}>
        <div className="flex flex-col gap-6">
          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl font-normal hover:text-gold transition-colors"
          >
            {isPt ? "Início" : "Home"}
          </a>
          <a
            href="#yamini"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl font-normal hover:text-gold transition-colors"
          >
            Yamini
          </a>
          <Link
            to="/collections"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl font-normal hover:text-gold transition-colors"
          >
            {t.nav[1]}
          </Link>
          <div className="pl-4 flex flex-col gap-3 -mt-2">
            {collections.map((c) => (
              <Link
                key={c.slug}
                to="/collections/$collection"
                params={{ collection: c.slug }}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-lg font-normal text-muted-foreground hover:text-gold transition-colors"
              >
                {isPt ? ('namePt' in c ? c.namePt : c.name) : ('nameEn' in c ? c.nameEn : c.name)}
                {!c.available && (
                  <span className="ml-2 font-sans text-xs text-muted-foreground">
                    {isPt ? '· Em breve' : '· Soon'}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <a
            href="#mayamini"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl font-normal hover:text-gold transition-colors"
          >
            MaYamini
          </a>
          <a
            href="#founder"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl font-normal hover:text-gold transition-colors"
          >
            {t.nav[3]}
          </a>
          <a
            href="#philosophy"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl font-normal hover:text-gold transition-colors"
          >
            {t.nav[4]}
          </a>
          <div className="pt-4 border-t border-border mt-2">
            <LanguageSwitch />
          </div>
        </div>
      </SidePanel>
    )}

    <main id="top">
      <section className="section hero"><div className="inner hero-grid"><div className="hero-copy"><p className="eyebrow">Yamini Studio</p><h1>{t.heroLabel}</h1><p>{t.heroIntro}</p><a className="text-link" href="#yamini">{t.discover}</a></div><figure className="hero-visual"><img src={silkHero} alt={t.heroImage} width={1024} height={1536} fetchPriority="high" /></figure></div></section>

      <section id="yamini" className="section night-section"><NightSky/><span className="devanagari" aria-hidden="true">यामिनी</span><div className="inner night-grid"><div className="night-title"><p className="eyebrow">Yāminī · यामिनी</p><h2>{t.whyTitle}</h2></div><div className="night-copy">{t.why.map(p => <p key={p}>{p}</p>)}<blockquote className="pullquote">{t.whyQuote}</blockquote></div></div></section>

      <section id="collections" className="section"><div className="inner"><div className="india-grid"><div className="india-copy"><p className="eyebrow">Maharashtra · Brasil</p><h2>{t.indiaTitle}</h2>{t.india.map(p => <p key={p}>{p}</p>)}<blockquote className="pullquote">{t.indiaQuote}</blockquote></div><div className="fabric-grid">{t.fabricCaps.map((c, i) => <figure className="fabric" key={c}><img src={fabricImages[i]} alt={c} width={508} height={1024} loading="lazy" /><figcaption className="image-caption">{c}</figcaption></figure>)}</div></div><div className="category-grid">{t.categories.map((c, i) => <Link key={c} to="/collections" search={{ category: ["mini-dresses", "maxi-dresses", "beachwear", "bags-accessories"][i] }}><figure className="category"><img src={categoryImages[i]} alt={c} width={764} height={764} loading="lazy" /><figcaption>{c}</figcaption></figure></Link>)}</div></div></section>

      <section id="cultures" className="section culture"><div className="inner"><p className="eyebrow">{t.cultureEyebrow}</p><h2>{t.cultureTitle}</h2><div className="culture-grid"><div className="culture-panel india"><img src={indiaCraft} alt={t.indiaLabel} width={764} height={764} loading="lazy" /><div><p className="eyebrow">{t.indiaLabel}</p>{t.culture.slice(0,2).map(p => <p key={p}>{p}</p>)}</div></div><div className="lattice" aria-hidden="true"/><div className="culture-panel brazil"><img src={brazilLight} alt={t.brazilLabel} width={764} height={764} loading="lazy" /><div><p className="eyebrow">{t.brazilLabel}</p>{t.culture.slice(2).map(p => <p key={p}>{p}</p>)}</div></div></div></div></section>

      <section id="mayamini" className="section mayamini"><div className="inner mayamini-grid"><img className="mayamini-image" src={mayaminiDresses} alt={t.mayaImage} width={764} height={764} loading="lazy" /><div><p className="eyebrow">{t.mayaEyebrow}</p><h2>{t.mayaTitle}</h2>{t.maya.map(p => <p key={p}>{p}</p>)}<blockquote className="pullquote">{t.mayaQuote}</blockquote></div></div></section>

      <section id="founder" className="section"><div className="inner founder-grid"><figure className="founder-still-life"><img src={creativeWorkspace} alt={t.workspace} width={764} height={764} loading="lazy" /><figcaption className="image-caption">{t.workspace}</figcaption></figure><div className="founder-copy"><p className="eyebrow">{t.founderLabel}</p><h2>Alka Deshmukh</h2>{t.founder.map(p => <p key={p}>{p}</p>)}</div></div></section>

      <section id="philosophy" className="section philosophy"><div className="inner"><p className="eyebrow">{t.philosophyLabel}</p><h2>{t.philosophyTitle}</h2><p>{t.philosophy}</p><p className="signature">Yamini Studio</p><p className="eyebrow">{t.signoff}</p></div></section>

    </main>

    <div className="prahar-thread" aria-hidden="true"><i/><i/><i/><i/></div>
    <footer className="site-footer"><div className="pallu" aria-hidden="true"><span/><span/><span/></div><div className="inner"><div className="footer-grid"><div><img src="/favicon.png" alt="Yamini Studio" className="brand-logo-desktop" width="150"/><img src="/facicon-mobile.png" alt="Yamini Studio" className="brand-logo-mobile" width="140" height="140"/><p className="footer-note">{t.disclaimer}</p></div><nav className="footer-links" aria-label="Footer">{navLinks.map(([label, href], i) => i === 1 ? <Link key={href} to="/collections">{label}</Link> : <a key={href} href={href}>{label}</a>)}</nav><div className="rangoli" title="96" aria-label="96">{Array.from({length:96},(_,i)=><i key={i}/>)}</div></div><div className="footer-bottom"><span>{t.copyright}</span><Button variant="ghost" className="lamp" title={t.backTop} aria-label={t.backTop} onClick={() => window.scrollTo({top:0, behavior:"smooth"})}><Lamp/></Button></div></div></footer>
  </div>;
}

function NightSky() { return <svg className="night-sky" viewBox="0 0 360 220" fill="none" aria-hidden="true"><path d="M72 28c-25 17-30 54-8 77 19 20 51 18 67-3-24 9-48-7-52-31-3-18 5-34 18-44-9-2-17-1-25 1Z" stroke="currentColor"/><g fill="currentColor"><circle cx="183" cy="42" r="2"/><circle cx="210" cy="55" r="1.5"/><circle cx="234" cy="87" r="2"/><circle cx="266" cy="76" r="1.5"/><circle cx="285" cy="106" r="2"/><circle cx="304" cy="138" r="1.5"/><circle cx="321" cy="164" r="2"/><circle cx="172" cy="151" r="1.5"/><circle cx="187" cy="174" r="2"/><circle cx="155" cy="180" r="1.5"/></g><circle className="sun-star" cx="207" cy="148" r="3"/></svg>; }


function Lamp() { return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1"><path className="flame" d="M16 3c4 5 3 8 0 10-3-2-4-5 0-10Z"/><path d="M7 16h18c-1 6-4 9-9 9s-8-3-9-9Zm4 10h10m-8 3h6"/></svg>; }