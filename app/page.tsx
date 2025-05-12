import LandingPage from "../landing-page"
import GrokChat from "@/components/grok-chat"
import DashboardButtonRemover from "@/components/dashboard-button-remover"
import { Suspense } from "react"

export default function Page() {
  return (
    <>
      <DashboardButtonRemover />
      <LandingPage />
      <Suspense fallback={null}>
        <GrokChat />
      </Suspense>
    </>
  )
}
