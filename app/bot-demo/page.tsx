import BotDemoPage from "@/components/bot-demo/bot-demo-page"
import SeoHead from "@/components/seo-head"

export const metadata = {
  title: "Rust Rocket Trading Bot Demo | Test unsere Trading Bots",
  description:
    "Erlebe die Leistungsfähigkeit unserer Trading Bots in Echtzeit. Teste verschiedene Strategien und Parameter mit historischen Daten und überzeuge dich selbst von den Ergebnissen.",
}

export default function BotDemo() {
  return (
    <>
      <SeoHead title={metadata.title} description={metadata.description} canonicalPath="/bot-demo" />
      <BotDemoPage />
    </>
  )
}
