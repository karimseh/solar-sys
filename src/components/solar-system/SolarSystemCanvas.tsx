'use client'

import { useEffect, useRef, useState } from "react"
import { SolarSystemEngine } from "@/lib/solar-system/SolarSystemEngine"
import BodyInfoPanel from "@/components/solar-system/BodyInfoPanel"
import { CELESTIAL_BODIES } from "@/lib/solar-system/bodies"
import { SimulationControls } from "./SimulationControls"


export default function SolarSystemCanvas() {
    const containerRef = useRef<HTMLDivElement>(null)
    const engineRef = useRef<SolarSystemEngine | null>(null)

    const [progress, setProgress] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [errorUrl, setErrorUrl] = useState<string | null>(null)
    const [selectedBodyId, setSelectedBodyId] = useState<string | null>(null)
    const [isPaused, setIsPaused] = useState(false)
    const [simulationSpeed, setSimulationSpeed] = useState(1)
    const [showOrbits, setShowOrbits] = useState(true)

    function handleClosePanel(): void {
        setSelectedBodyId(null)
        engineRef.current?.clearSelection()
    }
    function handleTogglePaused() {
        const nextPaused = !isPaused

        setIsPaused(nextPaused)
        engineRef.current?.setPaused(nextPaused)
    }

    function handleSpeedChange(speed: number) {
        setSimulationSpeed(speed)
        engineRef.current?.setSimulationSpeed(speed)
    }

    function handleToggleOrbits() {
        const nextVisible = !showOrbits

        setShowOrbits(nextVisible)
        engineRef.current?.setOrbitPathsVisible(nextVisible)
    }

    useEffect(() => {
        const container = containerRef.current

        if (!container) return
        let active = true

        const engine = new SolarSystemEngine(container, {
            onProgress: (value) => {
                if (active) {
                    setProgress(Math.round(value * 100))
                }
            },
            onReady: () => {
                if (active) {
                    setIsReady(true)
                }
            },
            onError: (url) => {
                if (active) {
                    setErrorUrl(url)
                }
            },
            onSelect: (bodyId) => {
                if (active) {
                    setSelectedBodyId(bodyId)
                }
            }
        })

        engineRef.current = engine

        return () => {
            active = false
            if (engineRef.current == engine) {
                engineRef.current = null
            }

            engine.dispose()
        }

    }, [])
    const selectedBody = CELESTIAL_BODIES.find(
        (body) => body.id === selectedBodyId,
    ) ?? null

    return (
        <div className="relative h-full w-full overflow-hidden">
            <SimulationControls
                isPaused={isPaused}
                speed={simulationSpeed}
                showOrbits={showOrbits}
                onTogglePaused={handleTogglePaused}
                onSpeedChange={handleSpeedChange}
                onToggleOrbits={handleToggleOrbits}
            />
            <div
                ref={containerRef}
                className="h-full w-full"
            />

            {(!isReady || errorUrl) && (
                <div
                    className="absolute inset-0 z-10 grid place-items-center bg-black text-white"
                    aria-live="polite"
                >
                    {errorUrl ? (
                        <div className="max-w-md px-6 text-center">
                            <p className="text-red-400">
                                Failed to load a solar-system asset.
                            </p>

                            <p className="mt-2 break-all text-sm text-white/60">
                                {errorUrl}
                            </p>
                        </div>
                    ) : (
                        <div className="w-64">
                            <p className="mb-3 text-center text-sm">
                                Loading solar system… {progress}%
                            </p>

                            <div className="h-1 overflow-hidden rounded-full bg-white/20">
                                <div
                                    className="h-full bg-amber-400 transition-[width] duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
            <BodyInfoPanel
                body={selectedBody}
                onClose={handleClosePanel}
            />
        </div>
    )
}