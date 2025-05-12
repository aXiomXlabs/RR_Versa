import LandingPage from "../landing-page"
import GrokChat from "@/components/grok-chat"
import { Suspense } from "react"

export default function Page() {
  return (
    <>
      <LandingPage />
      <Suspense fallback={null}>
        <GrokChat />
      </Suspense>
    </>
  )
}
