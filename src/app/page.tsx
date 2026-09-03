import SolarSystemCanvas from "@/components/solar-system/SolarSystemCanvas"
import { SITE_CONFIG } from "@/config/site"

export default function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black">
      <SolarSystemCanvas />
      <footer className="absolute right-5 bottom-5 z-20 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-xs text-white/50 backdrop-blur-md">
        Built by{" "}
        <a
          href={SITE_CONFIG.authorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-white/75 transition hover:text-white"
        >
          {SITE_CONFIG.authorName}
        </a>
      </footer>
    </main>
  )
}
