import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/boutique")({
  head: () => ({ meta: [
    { title: "Boutique Online — Yamini Studio" },
    { name: "description", content: "A boutique Yamini Studio estará disponível em breve." },
    { property: "og:title", content: "Boutique Online — Yamini Studio" },
    { property: "og:description", content: "A boutique Yamini Studio estará disponível em breve." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/boutique" }] }),
  component: () => <ComingSoon area="boutique" />,
});