import { createFileRoute, notFound } from '@tanstack/react-router';
import { ProductPage } from '@/components/shop/product-page';
import { ShopShell } from '@/components/shop/storefront';
import { findProduct, pageHead } from '@/lib/catalog';

export const Route = createFileRoute('/products/$slug')({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData?.name ?? 'Piece unavailable',
      loaderData?.description ?? 'Explore the Yamini Studio collection.'
    ),
  component: ProductDetailRoute,
});

function ProductDetailRoute() {
  const product = Route.useLoaderData();
  return (
    <ShopShell>
      <ProductPage key={product.slug} product={product} />
    </ShopShell>
  );
}