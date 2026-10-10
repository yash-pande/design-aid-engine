export type CollectionSlug = "mini-dresses" | "maxi-dresses" | "beachwear" | "bags-accessories";

export interface CollectionPiece {
  en: string;
  pt: string;
  fabricEn: string;
  fabricPt: string;
}

export interface Collection {
  slug: CollectionSlug;
  nameEn: string;
  namePt: string;
  introEn: string;
  introPt: string;
  pieces: CollectionPiece[];
}

export const collections: Collection[] = [
  {
    slug: "mini-dresses",
    nameEn: "Mini Dresses",
    namePt: "Vestidos Mini",
    introEn:
      "Short, light dresses in hand-woven Indian silks and printed cottons, cut for the ease of Brazilian days.",
    introPt:
      "Vestidos curtos e leves em sedas indianas tecidas à mão e algodões estampados, desenhados para a leveza dos dias brasileiros.",
    pieces: [
      { en: "Yamini Mini I", pt: "Yamini Mini I", fabricEn: "Hand-woven silk with zari border", fabricPt: "Seda tecida à mão com borda zari" },
      { en: "Yamini Mini II", pt: "Yamini Mini II", fabricEn: "Block-printed cotton", fabricPt: "Algodão estampado em bloco" },
      { en: "Yamini Mini III", pt: "Yamini Mini III", fabricEn: "Silk-cotton blend, natural dye", fabricPt: "Mistura de seda e algodão, tingimento natural" },
      { en: "Yamini Mini IV", pt: "Yamini Mini IV", fabricEn: "Handloom cotton with woven motif", fabricPt: "Algodão de tear com motivo tecido" },
    ],
  },
  {
    slug: "maxi-dresses",
    nameEn: "Maxi Dresses",
    namePt: "Vestidos Maxi",
    introEn:
      "Long, flowing silhouettes that let Indian textiles move with the body, from morning light to evening.",
    introPt:
      "Silhuetas longas e fluidas que deixam os têxteis indianos se mover com o corpo, da luz da manhã à noite.",
    pieces: [
      { en: "Yamini Maxi I", pt: "Yamini Maxi I", fabricEn: "Hand-woven silk, Paithani-inspired border", fabricPt: "Seda tecida à mão, borda inspirada em Paithani" },
      { en: "Yamini Maxi II", pt: "Yamini Maxi II", fabricEn: "Soft mul cotton with artisan print", fabricPt: "Algodão mul suave com estampa artesanal" },
      { en: "Yamini Maxi III", pt: "Yamini Maxi III", fabricEn: "Silk with woven zari thread", fabricPt: "Seda com fio zari tecido" },
      { en: "Yamini Maxi IV", pt: "Yamini Maxi IV", fabricEn: "Handloom cotton, indigo dye", fabricPt: "Algodão de tear, tingimento índigo" },
    ],
  },
  {
    slug: "beachwear",
    nameEn: "Beachwear",
    namePt: "Beachwear",
    introEn:
      "Airy pieces for the Brazilian coast, carrying the colour and texture of Indian craft into sun and salt air.",
    introPt:
      "Peças arejadas para o litoral brasileiro, levando a cor e a textura do artesanato indiano ao sol e à maresia.",
    pieces: [
      { en: "Yamini Beach I", pt: "Yamini Beach I", fabricEn: "Featherlight handloom cotton", fabricPt: "Algodão de tear ultraleve" },
      { en: "Yamini Beach II", pt: "Yamini Beach II", fabricEn: "Printed cotton voile", fabricPt: "Voil de algodão estampado" },
      { en: "Yamini Beach III", pt: "Yamini Beach III", fabricEn: "Cotton-silk wrap, natural dye", fabricPt: "Envelope de algodão e seda, tingimento natural" },
      { en: "Yamini Beach IV", pt: "Yamini Beach IV", fabricEn: "Textured handloom weave", fabricPt: "Tecelagem manual texturizada" },
    ],
  },
  {
    slug: "bags-accessories",
    nameEn: "Bags & Accessories",
    namePt: "Bolsas e Acessórios",
    introEn:
      "Bags and small accessories made from the same treasured textiles, so the fabric's story continues beyond the wardrobe.",
    introPt:
      "Bolsas e pequenos acessórios feitos dos mesmos têxteis preciosos, para que a história do tecido continue além do guarda-roupa.",
    pieces: [
      { en: "Yamini Tote I", pt: "Bolsa Yamini I", fabricEn: "Hand-woven silk with zari detail", fabricPt: "Seda tecida à mão com detalhe zari" },
      { en: "Yamini Pouch I", pt: "Necessaire Yamini I", fabricEn: "Block-printed cotton, lined", fabricPt: "Algodão estampado em bloco, forrado" },
      { en: "Yamini Scarf I", pt: "Lenço Yamini I", fabricEn: "Silk-cotton, hand-rolled edge", fabricPt: "Seda e algodão, borda enrolada à mão" },
      { en: "Yamini Clutch I", pt: "Clutch Yamini I", fabricEn: "Woven motif cotton with silk trim", fabricPt: "Algodão com motivo tecido e acabamento em seda" },
    ],
  },
];

export function findCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export const collectionsCopy = {
  en: {
    meta: "Collections — Yamini Studio",
    description: "Mini dresses, maxi dresses, beachwear and bags in Indian textiles, made for Brazilian life.",
    eyebrow: "Yamini Studio",
    title: "Collections",
    intro:
      "Four collections carry Indian textiles into Brazilian life: mini dresses, maxi dresses, beachwear, and bags and accessories.",
    view: "View collection",
    pieces: "The pieces",
    fabric: "Fabric",
    back: "Back to collections",
    home: "Back to home",
    comingNote: "Photography for each piece is on its way.",
  },
  pt: {
    meta: "Coleções — Yamini Studio",
    description: "Vestidos mini, vestidos maxi, beachwear e bolsas em têxteis indianos, feitos para a vida brasileira.",
    eyebrow: "Yamini Studio",
    title: "Coleções",
    intro:
      "Quatro coleções levam os têxteis indianos à vida brasileira: vestidos mini, vestidos maxi, beachwear e bolsas e acessórios.",
    view: "Ver coleção",
    pieces: "As peças",
    fabric: "Tecido",
    back: "Voltar às coleções",
    home: "Voltar ao início",
    comingNote: "A fotografia de cada peça está a caminho.",
  },
} as const;
