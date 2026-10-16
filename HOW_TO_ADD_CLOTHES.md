# How to Add New Clothes / Dresses to Yamini Studio

This guide explains how to add new dresses to your website step by step. All dresses are catalog-driven, which means adding a dress in one place automatically creates:
1. A card on the **`/collections`** showcase page.
2. An entry in its respective category (**`/collections/midi-dresses`**, **`/collections/mini-dresses`**, **`/collections/maxi-dresses`**, etc.).
3. A full dedicated **Product Detail Page** (**`/products/[slug]`**) with 100% full-image display, compact zoom lens, previous/next image navigation, and full-screen studio inspection lightbox.
4. Automatic language switching between **English (EN)** and **Brazilian Portuguese (PT)** for dress names, fabrics, colors, descriptions, construction details, and photo labels.
5. An entry in the wishlist favorites.
6. Related pieces recommendations on other dress pages.

---

## Step 1: Add Your Images to `src/assets/`

1. Place your dress photos in the `src/assets/` folder.
2. You can add multiple angles for the gallery (e.g. front view, side view, back view, fabric detail).
3. Recommended naming format:
   - `src/assets/ruby-zari-1.png` (Front view)
   - `src/assets/ruby-zari-2.png` (Back view)
   - `src/assets/ruby-zari-3.png` (Detail view)

---

## Step 2: Open `src/lib/catalog.ts`

Open the file:
`src/lib/catalog.ts`

### 2.1 Import Your Images at the Top
Add `import` statements at the top of `src/lib/catalog.ts`:

```typescript
import rubyZari1 from '@/assets/ruby-zari-1.png';
import rubyZari2 from '@/assets/ruby-zari-2.png';
import rubyZari3 from '@/assets/ruby-zari-3.png';
```

---

## Step 3: Add the Dress to the `products` Array (with Bilingual PT/EN Support)

Scroll down to `export const products: Product[] = [` and copy-paste this bilingual template:

```typescript
  {
    slug: 'ruby-zari-midi', // URL: /products/ruby-zari-midi
    name: 'Ruby Zari Midi',
    namePt: 'Ruby Zari Midi', // Name in Portuguese
    nameEn: 'Ruby Zari Midi', // Name in English
    category: 'midi-dresses', // Choose one: 'midi-dresses' | 'mini-dresses' | 'maxi-dresses' | 'mayamini'
    
    // Fabric headlines
    fabric: 'Pure Mulberry Silk · Hand-loomed Zari',
    fabricPt: 'Seda Mulberry Pura · Tear Manual Zari',
    fabricEn: 'Pure Mulberry Silk · Hand-loomed Zari',
    
    // Craft details
    craft: 'Zari Weaving',
    craftPt: 'Tecelagem Zari Artesanal',
    craftEn: 'Zari Weaving',
    
    // Color
    color: 'Crimson & gold',
    colorPt: 'Carmesim & dourado',
    colorEn: 'Crimson & gold',
    swatch: 'terracotta', // Swatch dot class
    
    image: rubyZari1, // Primary cover image
    tag: 'Artisan Showcase',
    tagPt: 'Acervo Artesanal',
    tagEn: 'Artisan Showcase',
    
    // Story description
    description: 'A radiant crimson silk dress woven with delicate gold floral vines. Features a fitted bodice and a gently gathered fluted skirt.',
    descriptionPt: 'Um vestido radiante de seda carmesim tecido com delicadas ramagens florais douradas. Apresenta corpo ajustado e saia fluida suavemente franzida.',
    descriptionEn: 'A radiant crimson silk dress woven with delicate gold floral vines. Features a fitted bodice and a gently gathered fluted skirt.',
    
    // Technical construction details
    details: 'V-neckline. Fluted sleeves with gold zari hem detailing. Architectural gathered waistline and concealed back zipper.',
    detailsPt: 'Decote em V. Mangas fluidas com barra decorativa em fios de ouro zari. Cintura arquitetônica franzida e fechamento posterior.',
    detailsEn: 'V-neckline. Fluted sleeves with gold zari hem detailing. Architectural gathered waistline and concealed back zipper.',
    
    // Heritage narrative
    heritage: 'Crafted in collaboration with master weavers from historic Maharashtra handloom clusters. Metallic zari threads reflect light in gentle, shifting glimmers.',
    heritagePt: 'Confeccionado em colaboração com mestres tecelões dos centros têxteis históricos de Maharashtra. Os fios metálicos de zari refletem a luz em suaves cintilações.',
    heritageEn: 'Crafted in collaboration with master weavers from historic Maharashtra handloom clusters. Metallic zari threads reflect light in gentle, shifting glimmers.',
    
    // Showcase gallery with bilingual labels
    gallery: [
      { image: rubyZari1, label: 'Front view', labelPt: 'Visão frontal' },
      { image: rubyZari2, label: 'Back view', labelPt: 'Visão posterior' },
      { image: rubyZari3, label: 'Zari embroidery & fabric detail', labelPt: 'Detalhes do bordado em zari' },
    ],
  },
```

> **Note**: Portuguese fields (`namePt`, `fabricPt`, `colorPt`, `descriptionPt`, etc.) are optional! If you only provide the base English fields (`name`, `fabric`, etc.), the site will automatically fall back to them gracefully without any errors.

---

## Field Breakdown & Rules

| Field | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `slug` | **Yes** | Unique URL identifier (lowercase with hyphens). This creates the link `/products/ruby-zari-midi`. | `'ruby-zari-midi'` |
| `name` / `namePt` | **Yes** | Display name in English and Portuguese. | `'Ruby Zari Midi'` |
| `category` | **Yes** | Must match one of the categories exactly:<br>• `'midi-dresses'`<br>• `'mini-dresses'`<br>• `'maxi-dresses'`<br>• `'mayamini'` | `'midi-dresses'` |
| `fabric` / `fabricPt` | **Yes** | Fabric headline (shows above title in gold). | `'Seda Mulberry Pura · Tear Manual'` |
| `color` / `colorPt` | **Yes** | Color name displayed in the details. | `'Carmesim & dourado'` |
| `swatch` | **Yes** | Color dot class name. Choose from:<br>`'ivory'`, `'royal-blue'`, `'botanical-blue'`, `'sage'`, `'rose'`, `'terracotta'` (or add your own in `styles.css`). | `'terracotta'` |
| `image` | **Yes** | The primary showcase image variable imported in Step 2.1. | `rubyZari1` |
| `description` / `descriptionPt` | **Yes** | Editorial story displayed on the product page. | `'Um vestido radiante de seda...'` |
| `details` / `detailsPt` | Optional | Design, neckline, cut, and fit specifications. | `'Decote em V. Mangas fluidas...'` |
| `heritage` / `heritagePt` | Optional | Regional craftsmanship and artisan history. | `'Confeccionado em colaboração...'` |
| `gallery` | **Yes** | Array of photos with `label` (EN) and `labelPt` (PT) for the zoom gallery and full-screen lightbox. | See template above |

---

## Step 4: (Optional) Adding a Custom Color Swatch Dot

If your dress has a color that is not covered by the existing swatches (`ivory`, `royal-blue`, `botanical-blue`, `sage`, `rose`, `terracotta`), you can add a new swatch class in `src/styles.css`:

```css
.swatch-emerald { background: #1b4d3e; }
.swatch-maroon  { background: #5a1827; }
```

Then in `src/lib/catalog.ts`, set `swatch: 'emerald'`.

---

## Image Sizing & Aspect Ratio

- **100% Full Visibility**: All images on the collection page and product detail page are set to `object-fit: contain`. Your entire image will be visible 100% without any cropping or cutting off of the neckline or hem.
- **Image Formats**: `.png`, `.jpg`, `.jpeg`, `.webp` are all supported.
- **Recommended Aspect Ratio**: 2:3 (e.g. 1024×1536) or portrait format works best, but any aspect ratio will be displayed completely without distortion or truncation.
