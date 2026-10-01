import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";

export const Route = createFileRoute("/investors")({
  head: () => ({ meta: [
    { title: "Relações com Investidores — Yamini Studio" },
    { name: "description", content: "Informações para investidores da Yamini Fashion House em breve." },
    { property: "og:title", content: "Relações com Investidores — Yamini Studio" },
    { property: "og:description", content: "Informações para investidores da Yamini Fashion House em breve." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/investors" }] }),
  component: () => <ComingSoon area="investors" />,
});