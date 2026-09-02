export type CelestialBodyKind = "star" | "planet" | "moon" 

export interface CelestialBodyDefinition {
    readonly id: string
    readonly name: string
    readonly kind: CelestialBodyKind
    readonly parentId: string | null

    readonly radiusKm: number
    readonly meanDistanceFromParentKm: number
    readonly orbitalPeriodDays: number | null
    readonly rotationPeriodHours: number
    readonly axialTiltDegrees: number
    readonly description: string

    readonly visual: {
        readonly radius: number
        readonly orbitRadius: number
        readonly color: string
        readonly spinSpeed: number
        readonly orbitSpeed: number
        readonly texturePath: string | null
    }
}