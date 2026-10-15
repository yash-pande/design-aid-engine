import { createContext, useContext, useState, type ReactNode } from 'react';
const WishlistContext = createContext<{ saved: string[]; toggle: (slug: string) => void }>({ saved: [], toggle: () => {} });
export function CatalogueProvider({ children }: { children: ReactNode }) {
 const [saved, setSaved] = useState<string[]>([]);
 return <WishlistContext.Provider value={{ saved, toggle: slug => setSaved(current => current.includes(slug) ? current.filter(s => s !== slug) : [...current, slug]) }}>{children}</WishlistContext.Provider>;
}
export const useWishlist = () => useContext(WishlistContext);