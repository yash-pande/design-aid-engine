import { createFileRoute, Outlet } from '@tanstack/react-router';
import { ShopShell } from '@/components/shop/storefront';

export const Route = createFileRoute('/collections')({
  component: CollectionsLayout,
});

function CollectionsLayout() {
  return (
    <ShopShell>
      <Outlet />
    </ShopShell>
  );
}