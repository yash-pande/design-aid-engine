import { createFileRoute } from '@tanstack/react-router';
import { CollectionPage } from '@/components/shop/collection-page';
import { ShopShell } from '@/components/shop/storefront';
import { collections, pageHead } from '@/lib/catalog';

export const Route = createFileRoute('/collections/$collection')({
  head: ({ params }) => {
    const collection = collections.find((c) => c.slug === params.collection);
    return pageHead(
      collection?.name ?? 'Collection unavailable',
      collection?.description ?? 'Explore the Yamini Studio collection.'
    );
  },
  component: CollectionRoute,
});

function CollectionRoute() {
  const { collection } = Route.useParams();
  return <CollectionPage key={collection} slug={collection} />;
}
