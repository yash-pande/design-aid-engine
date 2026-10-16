import { createFileRoute } from '@tanstack/react-router';
import { CollectionPage } from '@/components/shop/collection-page';
import { pageHead } from '@/lib/catalog';

export const Route = createFileRoute('/collections/')({
  head: () =>
    pageHead(
      'The Collection',
      'Discover Yamini Studio’s maxi dresses, midi dresses and mini dresses. Indian textile heritage meets contemporary Brazilian living.'
    ),
  component: CollectionIndexPage,
});

function CollectionIndexPage() {
  return <CollectionPage />;
}
