import { createFileRoute } from '@tanstack/react-router';
import { SubPageShell } from '@/components/SubPageShell';
import { CatalogueListing } from '@/components/CatalogueListing';
import { categories } from '@/lib/catalogue';
export const Route = createFileRoute('/collections')({
 validateSearch: (search: Record<string, unknown>): { category?: string | undefined; wishlist?: boolean | undefined } => ({ category: typeof search['category'] === 'string' && categories.some(c => c===search['category']) ? search['category'] : undefined, wishlist: search['wishlist'] === true || search['wishlist'] === 'true' }),
 head: () => ({ meta: [{ title: 'Collections — Yamini Studio' }, { name: 'description', content: 'Discover the Yamini Studio catalogue: Indian craftsmanship reimagined for Brazilian living.' }, { property: 'og:title', content: 'Collections — Yamini Studio' }, { property: 'og:description', content: 'Explore the Yamini Studio showcase of thoughtful dresses and textile stories.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: CollectionsPage,
});
function CollectionsPage() { const { category, wishlist } = Route.useSearch(); return <SubPageShell>{language => <CatalogueListing language={language} category={category ?? ''} savedOnly={wishlist ?? false}/>}</SubPageShell>; }