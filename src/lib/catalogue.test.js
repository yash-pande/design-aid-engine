import { describe, expect, it } from 'bun:test';
import { products, selectProducts } from './catalogue.ts';
describe('showcase catalogue', () => {
 it('contains the three reference pieces without selling fields', () => {
  expect(products.map(p => p.en.name)).toEqual(['Aurelia Floral Mini', 'Indira Royal Blue Midi', 'Neelam Botanical Maxi']);
  expect(products.every(p => !('price' in p) && !('cart' in p) && !('checkout' in p))).toBe(true);
 });
 it('filters wishlist to the saved reference piece', () => {
  expect(selectProducts('', '', 'featured', true, ['neelam-botanical-maxi']).map(p => p.slug)).toEqual(['neelam-botanical-maxi']);
 });
 it('does not invent beachwear pieces', () => {
  expect(selectProducts('beachwear', '', 'featured', false, [])).toEqual([]);
 });
});