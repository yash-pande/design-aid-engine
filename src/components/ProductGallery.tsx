import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { catalogueCopy, type Product } from '@/lib/catalogue';
import type { Language } from '@/lib/language';
export function ProductGallery({ product, language }: { product: Product; language: Language }) {
 const [index,setIndex] = useState(0); const [open,setOpen] = useState(false); const t = catalogueCopy[language];
 const change = (step: number) => setIndex(current => (current+step+product.images.length)%product.images.length);
 return <div className="product-gallery"><Button variant="ghost" className="product-main-photo" aria-label={t.zoom} onClick={() => setOpen(true)}><img src={product.images[index]} alt={`${product[language].name} — ${index+1}`}/><span className="photo-expand"><Maximize2/></span></Button><div className="gallery-thumbnails">{product.images.map((image,i) => <Button key={image} variant="ghost" className={index===i ? 'is-selected' : ''} aria-label={`${t.image} ${i+1}`} aria-pressed={index===i} onClick={() => setIndex(i)}><img src={image} alt={`${product[language].name} — ${i+1}`}/></Button>)}</div><Dialog open={open} onOpenChange={setOpen}><DialogContent className="catalogue-lightbox"><DialogTitle>{product[language].name}</DialogTitle><DialogDescription className="sr-only">{t.gallery}</DialogDescription><TransformWrapper key={index} minScale={1} maxScale={6} centerOnInit wheel={{ step: 0.15 }} doubleClick={{ step: 1 }}><>{/* Domain library handles pinch, wheel zoom and panning. */}<TransformComponent wrapperClass="zoom-stage" contentClass="zoom-content"><img src={product.images[index]} alt={product[language].name} draggable={false}/></TransformComponent><ZoomControls language={language} onPrevious={() => change(-1)} onNext={() => change(1)} index={index} count={product.images.length}/></></TransformWrapper></DialogContent></Dialog></div>;
}
import { useControls } from 'react-zoom-pan-pinch';
function ZoomControls({ language,onPrevious,onNext,index,count }: { language: Language; onPrevious: () => void; onNext: () => void; index: number; count: number }) {
 const { zoomIn,zoomOut,resetTransform } = useControls(); const t = catalogueCopy[language];
 return <div className="zoom-controls"><Button variant="ghost" size="icon" title={t.previous} aria-label={t.previous} onClick={onPrevious}><ChevronLeft/></Button><span>{index+1} / {count}</span><Button variant="ghost" size="icon" title={t.nextImage} aria-label={t.nextImage} onClick={onNext}><ChevronRight/></Button><span className="zoom-divider"/><Button variant="ghost" size="icon" title={t.zoomOut} aria-label={t.zoomOut} onClick={() => zoomOut()}><ZoomOut/></Button><Button variant="ghost" size="icon" title={t.zoomIn} aria-label={t.zoomIn} onClick={() => zoomIn()}><ZoomIn/></Button><Button variant="ghost" size="icon" title={t.zoomReset} aria-label={t.zoomReset} onClick={() => resetTransform()}><RotateCcw/></Button></div>;
}