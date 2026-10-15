import { createFileRoute, notFound } from '@tanstack/react-router';
import { products } from '@/lib/catalogue';
import { SubPageShell } from '@/components/SubPageShell';
import { ProductDetail } from '@/components/ProductDetail';
export const Route = createFileRoute('/products/$slug')({
 loader: ({ params }) => { const product = products.find(p => p.slug===params.slug); if (!product) throw notFound(); return product; },
 head: ({ loaderData }) => {
 const title = loaderData ? `${loaderData.en.name} — Yamini Studio` : 'Piece unavailable — Yamini Studio'; const description = loaderData?.en.description ?? 'Explore the Yamini Studio catalogue.';
 return { meta: [{ title },{ name: 'description', content: description },{ property: 'og:title', content: title },{ property: 'og:description', content: description },{ property: 'og:type', content: 'website' },{ name: 'twitter:card', content: 'summary_large_image' }] };
 },
 component: ProductPage,
});
function ProductPage() { const product = Route.useLoaderData(); return <SubPageShell>{language => <ProductDetail key={product.slug} product={product} language={language}/>}</SubPageShell>; }