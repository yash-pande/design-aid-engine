import midi4 from '@/assets/indira-midi-4.png';
import midi2 from '@/assets/indira-midi-2.png';
import midi3 from '@/assets/indira-midi-3.png';
import midi6 from '@/assets/indira-midi-6.png';
import maxi1 from '@/assets/neelam-maxi-1.png';
import maxi2 from '@/assets/neelam-maxi-2.png';
import maxi3 from '@/assets/neelam-maxi-3.png';
import maxi4 from '@/assets/neelam-maxi-4.png';
import maxi5 from '@/assets/neelam-maxi-5.png';
import maxi6 from '@/assets/neelam-maxi-6.png';
import floral1 from '@/assets/aurelia-floral-1.png';
import floral2 from '@/assets/aurelia-floral-2.png';
import floral3 from '@/assets/aurelia-floral-3.png';
import floral4 from '@/assets/aurelia-floral-4.png';
import floral5 from '@/assets/aurelia-floral-5.png';
import floral6 from '@/assets/aurelia-floral-6.png';
import ivoryblueFront from '@/assets/Royal Blue Floral Ruffle Mini Dress/front.png';
import ivoryblueBack from '@/assets/Royal Blue Floral Ruffle Mini Dress/back.png';
import ivoryblueSide from '@/assets/Royal Blue Floral Ruffle Mini Dress/side.png';
import ivoryblueThirdQuarter from '@/assets/Royal Blue Floral Ruffle Mini Dress/third-quarter.png';
import ivoryblueStrap from '@/assets/Royal Blue Floral Ruffle Mini Dress/strap.png';
import ivoryblueDetails from '@/assets/Royal Blue Floral Ruffle Mini Dress/details.png';
import ivoryblueThreeSide from '@/assets/Royal Blue Floral Ruffle Mini Dress/3side.png';
import blackgoldFront from '@/assets/blackgold/front.png';
import blackgoldBack from '@/assets/blackgold/back.png';
import blackgoldSide from '@/assets/blackgold/side.png';
import blackgoldThirdQuarter from '@/assets/blackgold/third-quarter.png';
import blackgoldStrap from '@/assets/blackgold/strap.png';
import blackgoldDetails from '@/assets/blackgold/details.png';
import blackgoldThreeSide from '@/assets/blackgold/3side.png';
import greenPurpleFront from '@/assets/Green & Purple Ikat Print Midi Dress/front.png';
import greenPurpleBack from '@/assets/Green & Purple Ikat Print Midi Dress/back.png';
import greenPurpleSide from '@/assets/Green & Purple Ikat Print Midi Dress/side.png';
import greenPurpleThirdQuarter from '@/assets/Green & Purple Ikat Print Midi Dress/third-quarter.png';
import greenPurpleStrap from '@/assets/Green & Purple Ikat Print Midi Dress/strap.png';
import greenPurpleDetails from '@/assets/Green & Purple Ikat Print Midi Dress/details.png';
import greenPurpleThreeSide from '@/assets/Green & Purple Ikat Print Midi Dress/3side.png';
import orangeGoldFront from '@/assets/Orange & Gold Zari Pleated Maxi Dress/front.png';
import orangeGoldBack from '@/assets/Orange & Gold Zari Pleated Maxi Dress/back.png';
import orangeGoldSide from '@/assets/Orange & Gold Zari Pleated Maxi Dress/side.png';
import orangeGoldThirdQuarter from '@/assets/Orange & Gold Zari Pleated Maxi Dress/third-quarter.png';
import orangeGoldDetails from '@/assets/Orange & Gold Zari Pleated Maxi Dress/details.png';
import orangeGoldThreeSide from '@/assets/Orange & Gold Zari Pleated Maxi Dress/3side.jpg';

export const collections = [
  {
    slug: 'midi-dresses',
    name: 'Midi Dress',
    namePt: 'Vestidos Midi',
    nameEn: 'Midi Dresses',
    description: 'Beautifully balanced dresses with a story in every detail. Discover our Midi Dress showcase.',
    descriptionPt: 'Vestidos de proporções equilibradas e caimento fluido. Descubra nosso acervo de vestidos midi.',
    descriptionEn: 'Beautifully balanced dresses with a story in every detail. Discover our Midi Dress showcase.',
    available: true,
  },
  {
    slug: 'mini-dresses',
    name: 'Mini Dress',
    namePt: 'Vestidos Mini',
    nameEn: 'Mini Dresses',
    description: 'Fresh dresses and playful details. Discover our Mini Dress showcase.',
    descriptionPt: 'Vestidos frescos, solares e de movimento descontraído. Descubra nosso acervo de vestidos mini.',
    descriptionEn: 'Fresh dresses and playful details. Discover our Mini Dress showcase.',
    available: true,
  },
  {
    slug: 'maxi-dresses',
    name: 'Maxi Dress',
    namePt: 'Vestidos Maxi',
    nameEn: 'Maxi Dresses',
    description: 'Flowing dresses, expressive prints, and thoughtful details. Discover our Maxi Dress showcase.',
    descriptionPt: 'Vestidos longos e fluidos, estampas expressivas e tecidos artesanais. Descubra nosso acervo de vestidos maxi.',
    descriptionEn: 'Flowing dresses, expressive prints, and thoughtful details. Discover our Maxi Dress showcase.',
    available: true,
  },
  {
    slug: 'mayamini',
    name: 'Mayamini',
    namePt: 'Mayamini',
    nameEn: 'Mayamini',
    description: 'A new chapter is taking shape. Mayamini is launching soon.',
    descriptionPt: 'Um novo capítulo está tomando forma. Mayamini será lançada em breve.',
    descriptionEn: 'A new chapter is taking shape. Mayamini is launching soon.',
    available: false,
  },
] as const;

export type Product = {
  slug: string;
  name: string;
  namePt?: string;
  nameEn?: string;
  category: string;
  fabric: string;
  fabricPt?: string;
  fabricEn?: string;
  craft: string;
  craftPt?: string;
  craftEn?: string;
  color: string;
  colorPt?: string;
  colorEn?: string;
  swatch: string;
  image: string;
  tag: string;
  tagPt?: string;
  tagEn?: string;
  description: string;
  descriptionPt?: string;
  descriptionEn?: string;
  gallery?: { image: string; label: string; labelPt?: string; labelEn?: string; contain?: boolean }[];
  details?: string;
  detailsPt?: string;
  detailsEn?: string;
  heritage?: string;
  heritagePt?: string;
  heritageEn?: string;
};

export function getProductLocalized(product: Product, language: string) {
  const isPt = language === 'pt';
  return {
    ...product,
    name: (isPt ? product.namePt : product.nameEn) || product.name,
    fabric: (isPt ? product.fabricPt : product.fabricEn) || product.fabric,
    craft: (isPt ? product.craftPt : product.craftEn) || product.craft,
    color: (isPt ? product.colorPt : product.colorEn) || product.color,
    tag: (isPt ? product.tagPt : product.tagEn) || product.tag,
    description: (isPt ? product.descriptionPt : product.descriptionEn) || product.description,
    details: (isPt ? product.detailsPt : product.detailsEn) || product.details,
    heritage: (isPt ? product.heritagePt : product.heritageEn) || product.heritage,
    gallery: product.gallery?.map((g) => ({
      ...g,
      label: (isPt ? g.labelPt : g.labelEn) || g.label,
    })),
  };
}

export const products: Product[] = [
  {
    slug: 'aurelia-floral-midi',
    name: 'Aurelia Floral Mini',
    namePt: 'Aurelia Mini Floral',
    nameEn: 'Aurelia Floral Mini',
    category: 'mini-dresses',
    fabric: 'Floral print · Smocked bodice',
    fabricPt: 'Estampa floral · Corpo com lastex',
    fabricEn: 'Floral print · Smocked bodice',
    craft: 'Handcrafted Prints',
    craftPt: 'Estamparia Artesanal',
    craftEn: 'Handcrafted Prints',
    color: 'Ivory & yellow',
    colorPt: 'Marfim & amarelo solar',
    colorEn: 'Ivory & yellow',
    swatch: 'ivory',
    image: floral1,
    tag: 'Artisan Showcase',
    tagPt: 'Acervo Artesanal',
    tagEn: 'Artisan Showcase',
    description: 'A sunlit floral dress with delicate yellow blossoms and soft green leaves on an ivory ground. Tie-up shoulder straps frame a square neckline, while a smocked bodice opens into a softly gathered, tiered skirt.',
    descriptionPt: 'Um vestido mini floral em marfim e amarelo com delicadas flores amarelas e folhas verdes suaves. Laços ajustáveis nos ombros emolduram o decote quadrado, enquanto o corpo em lastex se abre em uma saia franzida em camadas.',
    descriptionEn: 'A sunlit floral dress with delicate yellow blossoms and soft green leaves on an ivory ground. Tie-up shoulder straps frame a square neckline, while a smocked bodice opens into a softly gathered, tiered skirt.',
    details: 'Adjustable tie-up shoulder straps. Square neckline. Smocked front and back bodice. Gathered waist and tiered skirt with a ruffled hem. Yellow floral print with green foliage on ivory ground. Tailored for breathable comfort and effortless grace.',
    detailsPt: 'Amarrações ajustáveis nos ombros. Decote quadrado. Corpo franzido em lastex na frente e nas costas. Cintura franzida e saia em camadas com barra em babado. Estampa floral amarela com folhagens verdes em fundo marfim.',
    detailsEn: 'Adjustable tie-up shoulder straps. Square neckline. Smocked front and back bodice. Gathered waist and tiered skirt with a ruffled hem. Yellow floral print with green foliage on ivory ground. Tailored for breathable comfort and effortless grace.',
    heritage: 'Inspired by traditional Indian hand-block motifs, simplified for the vibrant sunlight of Brazil. Every blossom carries the quiet rhythm of artisan printing.',
    heritagePt: 'Inspirado nos tradicionais motivos indianos de estamparia em bloco, simplificados para a luminosidade vibrante do Brasil. Cada flor carrega o ritmo sereno da estamparia artesanal.',
    heritageEn: 'Inspired by traditional Indian hand-block motifs, simplified for the vibrant sunlight of Brazil. Every blossom carries the quiet rhythm of artisan printing.',
    gallery: [
      { image: floral1, label: 'Front view', labelPt: 'Visão frontal' },
      { image: floral2, label: 'Side view', labelPt: 'Visão lateral' },
      { image: floral3, label: 'Back view', labelPt: 'Visão posterior' },
      { image: floral4, label: 'Alternate front view', labelPt: 'Visão frontal alternativa' },
      { image: floral5, label: 'Design & construction', labelPt: 'Design & modelagem', contain: true },
      { image: floral6, label: 'Shoulder tie & smocking detail', labelPt: 'Detalhe dos laços & lastex', contain: true },
    ],
  },
  {
    slug: 'indira-royal-blue-midi',
    name: 'Indira Royal Blue Midi',
    namePt: 'Indira Midi Azul Royal',
    nameEn: 'Indira Royal Blue Midi',
    category: 'midi-dresses',
    fabric: 'Gold motifs · Ornate border',
    fabricPt: 'Motivos dourados · Barra ornamentada',
    fabricEn: 'Gold motifs · Ornate border',
    craft: 'Zari & Gold Motifs',
    craftPt: 'Tecelagem Zari & Motivos Dourados',
    craftEn: 'Zari & Gold Motifs',
    color: 'Royal blue & gold',
    colorPt: 'Azul royal & dourado',
    colorEn: 'Royal blue & gold',
    swatch: 'royal-blue',
    image: midi4,
    tag: 'Artisan Showcase',
    tagPt: 'Acervo Artesanal',
    tagEn: 'Artisan Showcase',
    description: 'A royal-blue dress scattered with delicate gold motifs. A fitted sleeveless bodice and scoop neckline meet a gathered skirt, finished with an ornate gold-toned border and colourful decorative accents.',
    descriptionPt: 'Um vestido azul royal salpicado de delicados motivos dourados. O corpo sem mangas ajustado e decote arredondado encontram uma saia franzida fluida, finalizada com uma barra ornamentada em tons dourados e detalhes coloridos.',
    descriptionEn: 'A royal-blue dress scattered with delicate gold motifs. A fitted sleeveless bodice and scoop neckline meet a gathered skirt, finished with an ornate gold-toned border and colourful decorative accents.',
    details: 'Sleeveless dress. Scoop front neckline and low scoop back. Fitted bodice with a gathered waist and back tie bow. Full skirt with small gold motifs and an ornate multicoloured hem border.',
    detailsPt: 'Vestido sem mangas. Decote frontal arredondado e decote posterior suave. Corpo ajustado com cintura franzida e laço posterior. Saia ampla com pequenos motivos em zari e barra multicolorida ricamente ornamentada.',
    detailsEn: 'Sleeveless dress. Scoop front neckline and low scoop back. Fitted bodice with a gathered waist and back tie bow. Full skirt with small gold motifs and an ornate multicoloured hem border.',
    heritage: 'Rooted in the royal textile traditions of Maharashtra and the Maratha lineage. Metallic zari threads are woven with precision to reflect light in gentle, shifting glimmers.',
    heritagePt: 'Enraizado nas nobres tradições têxteis de Maharashtra e da linhagem Maratha. Fios metálicos de zari são tecidos com precisão artesanal para refletir a luz em suaves cintilações.',
    heritageEn: 'Rooted in the royal textile traditions of Maharashtra and the Maratha lineage. Metallic zari threads are woven with precision to reflect light in gentle, shifting glimmers.',
    gallery: [
      { image: midi4, label: 'Front view', labelPt: 'Visão frontal' },
      { image: midi2, label: 'Back view', labelPt: 'Visão posterior' },
      { image: midi3, label: 'Side view', labelPt: 'Visão lateral' },
      { image: midi6, label: 'Alternate front view', labelPt: 'Visão frontal alternativa' },
    ],
  },
  {
    slug: 'neelam-botanical-maxi',
    name: 'Neelam Botanical Maxi',
    namePt: 'Neelam Maxi Botânico',
    nameEn: 'Neelam Botanical Maxi',
    category: 'maxi-dresses',
    fabric: 'Botanical print · Ruffled shoulders',
    fabricPt: 'Estampa botânica · Ombros com babados',
    fabricEn: 'Botanical print · Ruffled shoulders',
    craft: 'Botanical Motif Print',
    craftPt: 'Estamparia Botânica Artesanal',
    craftEn: 'Botanical Motif Print',
    color: 'Blue & white',
    colorPt: 'Azul botânico & branco',
    colorEn: 'Blue & white',
    swatch: 'botanical-blue',
    image: maxi2,
    tag: 'Artisan Showcase',
    tagPt: 'Acervo Artesanal',
    tagEn: 'Artisan Showcase',
    description: 'Blue and white botanical motifs bring a fresh rhythm to this flowing dress. Ruffled shoulders frame a scoop neckline, while a gathered waist leads into a full skirt with a softly ruffled lower tier.',
    descriptionPt: 'Motivos botânicos em azul e branco trazem frescor e movimento a este vestido longo e fluido. Babados delicados nos ombros emolduram o decote, enquanto a cintura franzida se abre em uma saia com barra em babado suave.',
    descriptionEn: 'Blue and white botanical motifs bring a fresh rhythm to this flowing dress. Ruffled shoulders frame a scoop neckline, while a gathered waist leads into a full skirt with a softly ruffled lower tier.',
    details: 'Ruffled shoulder straps. Scoop front neckline and low scoop back. Fitted bodice and gathered waist. Blue and white botanical print. Full skirt with a gathered ruffle tier at the hem.',
    detailsPt: 'Alças com babados delicados. Decote frontal arredondado e decote posterior cavado. Corpo ajustado e cintura franzida. Estampa botânica azul e branca. Saia ampla em camadas franzidas.',
    detailsEn: 'Ruffled shoulder straps. Scoop front neckline and low scoop back. Fitted bodice and gathered waist. Blue and white botanical print. Full skirt with a gathered ruffle tier at the hem.',
    heritage: 'A dialogue between Indian natural dye botanical patterns and Brazilian coastal breezes. Designed with fluid movement, allowing the hand-loomed fabric to float naturally.',
    heritagePt: 'Um diálogo harmonioso entre padrões botânicos de pigmentos naturais indianos e a brisa do litoral brasileiro. Projetado com caimento orgânico, permitindo que o tecido artesanal flutue naturalmente a cada passo.',
    heritageEn: 'A dialogue between Indian natural dye botanical patterns and Brazilian coastal breezes. Designed with fluid movement, allowing the hand-loomed fabric to float naturally.',
    gallery: [
      { image: maxi2, label: 'Front view', labelPt: 'Visão frontal' },
      { image: maxi1, label: 'Alternate front view', labelPt: 'Visão frontal alternativa' },
      { image: maxi3, label: 'Side view', labelPt: 'Visão lateral' },
      { image: maxi4, label: 'Back view', labelPt: 'Visão posterior' },
      { image: maxi5, label: 'Fabric & construction details', labelPt: 'Detalhes do tecido & construção', contain: true },
      { image: maxi6, label: 'Design & construction', labelPt: 'Design & modelagem', contain: true },
    ],
  },
  {
    slug: 'ivory-royal-blue-botanical-ruffle-mini-dress',

    name: 'Ivory & Royal Blue Botanical Ruffle Mini Dress',
    nameEn: 'Ivory & Royal Blue Botanical Ruffle Mini Dress',
    namePt: 'Vestido Curto Botânico Marfim e Azul Royal com Babados',

    category: 'mini-dresses',

    fabric: 'Botanical Printed Fabric · Sheer Organza Ruffles',
    fabricEn: 'Botanical Printed Fabric · Sheer Organza Ruffles',
    fabricPt: 'Tecido com Estampa Botânica · Babados de Organza Transparente',

    craft: 'Botanical Print & Ruffle Detailing',
    craftEn: 'Botanical Print & Ruffle Detailing',
    craftPt: 'Estampa Botânica e Detalhes com Babados',

    color: 'Ivory & Royal Blue',
    colorEn: 'Ivory & Royal Blue',
    colorPt: 'Marfim e Azul Royal',

    swatch: 'royal-blue',

    image: ivoryblueFront,

    tag: 'Summer Edit',
    tagEn: 'Summer Edit',
    tagPt: 'Coleção de Verão',

    description:
      'A statement mini dress featuring an ivory base adorned with delicate navy botanical motifs. Designed with a fitted square-neck bodice, dramatic royal blue ruffled shoulder straps, and a beautifully gathered skirt. A geometric border and a layered sheer blue hem complete this playful, feminine silhouette.',

    descriptionEn:
      'A statement mini dress featuring an ivory base adorned with delicate navy botanical motifs. Designed with a fitted square-neck bodice, dramatic royal blue ruffled shoulder straps, and a beautifully gathered skirt. A geometric border and a layered sheer blue hem complete this playful, feminine silhouette.',

    descriptionPt:
      'Um vestido curto marcante com base marfim e delicados motivos botânicos em azul-marinho. Apresenta corpo ajustado com decote quadrado, alças com babados volumosos em azul royal e saia franzida. A barra geométrica e o acabamento em camadas de tecido azul transparente completam esta silhueta feminina e delicada.',

    details:
      'Square neckline, fitted bodice, wide ruffled shoulder straps, and a gathered mini skirt. Features navy botanical motifs, a geometric Greek-key inspired border, a layered sheer royal blue hem, and a decorative back waist bow.',

    detailsEn:
      'Square neckline, fitted bodice, wide ruffled shoulder straps, and a gathered mini skirt. Features navy botanical motifs, a geometric Greek-key inspired border, a layered sheer royal blue hem, and a decorative back waist bow.',

    detailsPt:
      'Decote quadrado, corpo ajustado, alças largas com babados e saia curta franzida. Apresenta motivos botânicos em azul-marinho, barra geométrica inspirada no padrão grego, acabamento em camadas de tecido azul royal transparente e laço decorativo na cintura posterior.',

    heritage:
      'A playful interpretation of botanical motifs and classic geometric borders, balanced with sculptural ruffles and contrasting blue layers. Thoughtful detailing gives this mini dress a distinctive, polished look.',

    heritageEn:
      'A playful interpretation of botanical motifs and classic geometric borders, balanced with sculptural ruffles and contrasting blue layers. Thoughtful detailing gives this mini dress a distinctive, polished look.',

    heritagePt:
      'Uma interpretação delicada de motivos botânicos e barras geométricas clássicas, equilibrada por babados marcantes e camadas contrastantes em azul. Os detalhes cuidadosos conferem ao vestido curto um visual distinto e sofisticado.',

    gallery: [
      {
        image: ivoryblueFront,
        label: 'Front View',
        labelPt: 'Vista frontal',
      },
      {
        image: ivoryblueBack,
        label: 'Back View',
        labelPt: 'Vista traseira',
      },
      {
        image: ivoryblueSide,
        label: 'Side View',
        labelPt: 'Vista lateral',
      },
      {
        image: ivoryblueThirdQuarter,
        label: 'Three-Quarter View',
        labelPt: 'Vista em três quartos',
      },
      {
        image: ivoryblueStrap,
        label: 'Ruffle Strap Detail',
        labelPt: 'Detalhe das alças com babados',
      },
      {
        image: ivoryblueDetails,
        label: 'Fabric Print & Border Detail',
        labelPt: 'Detalhes da estampa e da barra',
      },
      {
        image: ivoryblueThreeSide,
        label: 'Technical Front, Back & Side Views',
        labelPt: 'Vistas técnicas frontal, traseira e lateral',
      },
    ],
  },
  {
    slug: 'black-gold-floral-brocade-midi-dress',

    name: 'Black & Gold Floral Brocade Midi Dress',
    nameEn: 'Black & Gold Floral Brocade Midi Dress',
    namePt: 'Vestido Midi de Brocado Floral Preto e Dourado',

    category: 'midi-dresses',

    fabric: 'Floral Brocade · Antique Gold Detailing',
    fabricEn: 'Floral Brocade · Antique Gold Detailing',
    fabricPt: 'Brocado Floral · Detalhes em Dourado Antigo',

    craft: 'Floral Brocade Weaving',
    craftEn: 'Floral Brocade Weaving',
    craftPt: 'Tecelagem de Brocado Floral',

    color: 'Black & Antique Gold',
    colorEn: 'Black & Antique Gold',
    colorPt: 'Preto e Dourado Antigo',

    swatch: 'terracotta',

    image: blackgoldFront,

    tag: 'Evening Edit',
    tagEn: 'Evening Edit',
    tagPt: 'Coleção para a Noite',

    description:
      'An elegant black and antique-gold floral brocade dress featuring an intricately patterned bodice and a voluminous gathered skirt. Designed with a square neckline, delicate tie-up shoulder straps, and a statement floral border, this timeless silhouette brings rich texture and sophisticated charm to special occasions.',

    descriptionEn:
      'An elegant black and antique-gold floral brocade dress featuring an intricately patterned bodice and a voluminous gathered skirt. Designed with a square neckline, delicate tie-up shoulder straps, and a statement floral border, this timeless silhouette brings rich texture and sophisticated charm to special occasions.',

    descriptionPt:
      'Um elegante vestido de brocado floral preto e dourado antigo, com corpo ricamente estampado e saia ampla franzida. O decote quadrado, as delicadas alças com laços ajustáveis e a marcante barra floral conferem textura sofisticada e charme atemporal para ocasiões especiais.',

    details:
      'Square neckline, fitted bodice, adjustable tie-up shoulder straps with bows, and a gathered flared midi skirt. Features an all-over gold floral motif, decorative horizontal bands, and a wide floral brocade border along the hem.',

    detailsEn:
      'Square neckline, fitted bodice, adjustable tie-up shoulder straps with bows, and a gathered flared midi skirt. Features an all-over gold floral motif, decorative horizontal bands, and a wide floral brocade border along the hem.',

    detailsPt:
      'Decote quadrado, corpo ajustado, alças com laços ajustáveis e saia midi ampla e franzida. Apresenta motivos florais dourados por toda a peça, faixas horizontais decorativas e uma larga barra de brocado floral.',

    heritage:
      'A celebration of ornate floral motifs and traditional-inspired border patterns, combining deep black tones with antique-gold detailing for a richly textured, statement-making look.',

    heritageEn:
      'A celebration of ornate floral motifs and traditional-inspired border patterns, combining deep black tones with antique-gold detailing for a richly textured, statement-making look.',

    heritagePt:
      'Uma celebração de motivos florais ornamentados e padrões de barras de inspiração tradicional, combinando tons intensos de preto com detalhes em dourado antigo para um visual marcante e rico em textura.',

    gallery: [
      {
        image: blackgoldFront,
        label: 'Front View',
        labelPt: 'Vista frontal',
      },
      {
        image: blackgoldBack,
        label: 'Back View',
        labelPt: 'Vista traseira',
      },
      {
        image: blackgoldSide,
        label: 'Side View',
        labelPt: 'Vista lateral',
      },
      {
        image: blackgoldThirdQuarter,
        label: 'Three-Quarter View',
        labelPt: 'Vista em três quartos',
      },
      {
        image: blackgoldDetails,
        label: 'Strap, Neckline & Border Details',
        labelPt: 'Detalhes das alças, do decote e da barra',
      },
      {
        image: blackgoldThreeSide,
        label: 'Technical Front, Back & Side Views',
        labelPt: 'Vistas técnicas frontal, traseira e lateral',
      },
    ],
  }, {
    slug: 'green-purple-ikat-print-midi-dress',

    name: 'Green & Purple Ikat Print Midi Dress',
    nameEn: 'Green & Purple Ikat Print Midi Dress',
    namePt: 'Vestido Midi Verde e Roxo com Estampa Ikat',

    category: 'midi-dresses',

    fabric: 'Silk Blend · Zari Border',
    fabricEn: 'Silk Blend · Zari Border',
    fabricPt: 'Mistura de Seda · Borda Zari',

    craft: 'Ikat Print & Zari Woven Border',
    craftEn: 'Ikat Print & Zari Woven Border',
    craftPt: 'Estampa Ikat e Borda Tecida em Zari',

    color: 'Green & Purple',
    colorEn: 'Green & Purple',
    colorPt: 'Verde e Roxo',

    swatch: 'green',

    image: greenPurpleFront,

    tag: 'Festive Collection',
    tagEn: 'Festive Collection',
    tagPt: 'Coleção Festiva',

    description:
      'A vibrant midi dress featuring a beige bodice with a colorful ikat print in shades of purple, green, and blue. The gathered skirt is a bright lime green with subtle gold motifs, finishing with a striking purple border adorned with intricate gold zari woven details. The sleeveless design with a scoop neck offers a comfortable and elegant fit.',

    descriptionEn:
      'A vibrant midi dress featuring a beige bodice with a colorful ikat print in shades of purple, green, and blue. The gathered skirt is a bright lime green with subtle gold motifs, finishing with a striking purple border adorned with intricate gold zari woven details. The sleeveless design with a scoop neck offers a comfortable and elegant fit.',

    descriptionPt:
      'Um vestido midi vibrante com corpo bege e estampa ikat colorida em tons de roxo, verde e azul. A saia franzida é de um verde limão brilhante com sutis motivos dourados, terminando com uma impressionante borda roxa adornada com intrincados detalhes tecidos em zari dourado. O design sem mangas com decote redondo oferece um ajuste confortável e elegante.',

    details:
      'Scoop neckline, sleeveless fitted bodice with ikat print, gathered lime green midi skirt with gold motifs, and a wide purple hem with intricate gold zari woven detailing.',

    detailsEn:
      'Scoop neckline, sleeveless fitted bodice with ikat print, gathered lime green midi skirt with gold motifs, and a wide purple hem with intricate gold zari woven detailing.',

    detailsPt:
      'Decote redondo, corpo ajustado sem mangas com estampa ikat, saia midi verde limão franzida com motivos dourados e ampla bainha roxa com intrincados detalhes tecidos em zari dourado.',

    heritage:
      'This dress beautifully blends traditional Indian textile elements with a modern silhouette. The ikat-inspired print on the bodice and the rich zari woven border at the hem celebrate classic craftsmanship, while the bright colors and midi length create a contemporary, festive look.',

    heritageEn:
      'This dress beautifully blends traditional Indian textile elements with a modern silhouette. The ikat-inspired print on the bodice and the rich zari woven border at the hem celebrate classic craftsmanship, while the bright colors and midi length create a contemporary, festive look.',

    heritagePt:
      'Este vestido combina lindamente elementos têxteis indianos tradicionais com uma silhueta moderna. A estampa inspirada no ikat no corpo e a rica borda tecida em zari na bainha celebram o artesanato clássico, enquanto as cores brilhantes e o comprimento midi criam um visual contemporâneo e festivo.',

    gallery: [
      {
        image: greenPurpleFront,
        label: 'Front View',
        labelPt: 'Vista frontal',
      },
      {
        image: greenPurpleBack,
        label: 'Back View',
        labelPt: 'Vista traseira',
      },
      {
        image: greenPurpleSide,
        label: 'Side View',
        labelPt: 'Vista lateral',
      },
      {
        image: greenPurpleThirdQuarter,
        label: 'Three-Quarter View',
        labelPt: 'Vista em três quartos',
      },
      {
        image: greenPurpleStrap,
        label: 'Bodice Detail',
        labelPt: 'Detalhe do corpo',
      },
      {
        image: greenPurpleDetails,
        label: 'Fabric & Border Details',
        labelPt: 'Detalhes do tecido e da borda',
      },
      {
        image: greenPurpleThreeSide,
        label: 'Technical Front, Back & Side Views',
        labelPt: 'Vistas técnicas frontal, traseira e lateral',
      },
    ],
  }, {
    slug: 'orange-gold-zari-pleated-maxi-dress',

    name: 'Orange & Gold Zari Pleated Maxi Dress',
    nameEn: 'Orange & Gold Zari Pleated Maxi Dress',
    namePt: 'Vestido Longo Pregueado Laranja e Dourado com Zari',

    category: 'maxi-dresses',

    fabric: 'Cotton Blend · Zari Woven Details',
    fabricEn: 'Cotton Blend · Zari Woven Details',
    fabricPt: 'Mistura de Algodão · Detalhes Tecidos em Zari',

    craft: 'Zari Weaving & Pleating',
    craftEn: 'Zari Weaving & Pleating',
    craftPt: 'Tecelagem Zari e Pregas',

    color: 'Orange & Gold',
    colorEn: 'Orange & Gold',
    colorPt: 'Laranja e Dourado',

    swatch: 'orange',

    image: orangeGoldFront,

    tag: 'Festive Edit',
    tagEn: 'Festive Edit',
    tagPt: 'Edição Festiva',

    description:
      'An elegant bright orange maxi dress featuring a fitted scoop-neck bodice with distinctive gold zari woven straps. The skirt is beautifully pleated, flowing into a wide, ornate gold zari border accented by a delicate purple wavy trim. A perfect blend of traditional festive textures and a contemporary sleeveless silhouette.',

    descriptionEn:
      'An elegant bright orange maxi dress featuring a fitted scoop-neck bodice with distinctive gold zari woven straps. The skirt is beautifully pleated, flowing into a wide, ornate gold zari border accented by a delicate purple wavy trim. A perfect blend of traditional festive textures and a contemporary sleeveless silhouette.',

    descriptionPt:
      'Um elegante vestido longo laranja brilhante com corpo ajustado de decote redondo e alças distintas tecidas em zari dourado. A saia é lindamente pregueada, fluindo para uma ampla e ornamentada borda de zari dourado acentuada por um delicado acabamento ondulado roxo. Uma mistura perfeita de texturas festivas tradicionais e uma silhueta contemporânea sem mangas.',

    details:
      'Scoop neckline, thick gold zari shoulder straps, fitted bodice, and a pleated maxi skirt. Finished with a wide woven gold zari hem featuring a purple zigzag pattern. Concealed back zipper closure.',

    detailsEn:
      'Scoop neckline, thick gold zari shoulder straps, fitted bodice, and a pleated maxi skirt. Finished with a wide woven gold zari hem featuring a purple zigzag pattern. Concealed back zipper closure.',

    detailsPt:
      'Decote redondo, alças grossas em zari dourado, corpo ajustado e saia longa pregueada. Finalizado com uma ampla bainha tecida em zari dourado apresentando um padrão em ziguezague roxo. Fechamento por zíper traseiro oculto.',

    heritage:
      'Drawing inspiration from classic Indian festive textiles, this dress highlights rich zari work typically found in traditional sarees. The vibrant orange hue and ornate borders bring celebratory heritage into an effortless, modern design.',

    heritageEn:
      'Drawing inspiration from classic Indian festive textiles, this dress highlights rich zari work typically found in traditional sarees. The vibrant orange hue and ornate borders bring celebratory heritage into an effortless, modern design.',

    heritagePt:
      'Inspirando-se nos clássicos tecidos festivos indianos, este vestido destaca o rico trabalho em zari tipicamente encontrado em saris tradicionais. O vibrante tom laranja e as bordas ornamentadas trazem a herança comemorativa para um design moderno e descomplicado.',

    gallery: [
      {
        image: orangeGoldThreeSide,
        label: 'Technical Front, Back & Side Views',
        labelPt: 'Vistas técnicas frontal, traseira e lateral',
      },
      {
        image: orangeGoldFront,
        label: 'Front View',
        labelPt: 'Vista frontal',
      },
      {
        image: orangeGoldSide,
        label: 'Side View',
        labelPt: 'Vista lateral',
      },
      {
        image: orangeGoldThirdQuarter,
        label: 'Three-Quarter View',
        labelPt: 'Vista em três quartos',
      },
      {
        image: orangeGoldBack,
        label: 'Back View',
        labelPt: 'Vista traseira',
      },
      {
        image: orangeGoldDetails,
        label: 'Strap, Bodice & Border Details',
        labelPt: 'Detalhes das alças, corpo e borda',
      },
    ],
  }

];

export function findProduct(slug: string): Product | undefined {
  if (slug === 'aurelia-floral-mini') {
    return products.find((p) => p.slug === 'aurelia-floral-midi');
  }
  return products.find((p) => p.slug === slug);
}

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} — Yamini Studio` },
      { name: 'description', content: description },
      { property: 'og:title', content: `${title} — Yamini Studio` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  };
}
