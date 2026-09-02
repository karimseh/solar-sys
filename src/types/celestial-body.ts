import type { OrbitalElements } from "@/lib/astronomy/types"
export type CelestialBodyKind = "star" | "planet" | "moon"

export interface CelestialBodyDefinition {
  readonly id: string
  readonly name: string
  readonly kind: CelestialBodyKind
  readonly parentId: string | null
  readonly orbitalElements: OrbitalElements | null

  readonly radiusKm: number
  readonly meanDistanceFromParentKm: number
  readonly orbitalPeriodDays: number | null
  readonly rotationPeriodHours: number
  readonly axialTiltDegrees: number
  readonly description: string

  readonly visual: {
    readonly color: string
    readonly spinSpeed: number
    readonly texturePath: string | null
    readonly nightTexturePath: string | null
  }
}
