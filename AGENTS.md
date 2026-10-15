<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture

- Keep the home editorial journey continuous with in-page anchors; Collections and product details use dedicated TanStack routes for shareable catalogue browsing.
- Catalogue data and bilingual product copy live in a shared browser-safe module; wishlist state is session-only React context because no account or permanent saving is requested.
- Keep all visible copy in the language dictionary so Portuguese and English switch together without partial translations.
- Import editorial photographs as bundled assets and render individual cropped source images, not multi-image sheets, to keep each subject independent and accessible.
- Resolve saved language through the shared language helper and persist only after preferences have hydrated, preventing the initial render from overwriting an existing selection.
