import type { CelestialBodyDefinition } from "@/types/celestial-body"

export const CELESTIAL_BODIES = [
  {
    id: "sun",
    name: "Sun",
    kind: "star",
    parentId: null,
    radiusKm: 695_700,
    meanDistanceFromParentKm: 0,
    orbitalPeriodDays: null,
    rotationPeriodHours: 600,
    axialTiltDegrees: 7.25,
    description:
      "The Sun is the star at the center of our solar system. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
    visual: {
      radius: 1,
      orbitRadius: 0,
      color: "#ffb300",
      spinSpeed: 0.12,
      orbitSpeed: 0,
      texturePath: null,
    },
  },
  {
    id: "earth",
    name: "Earth",
    kind: "planet",
    parentId: "sun",

    radiusKm: 6_371,
    meanDistanceFromParentKm: 149_700_000,
    orbitalPeriodDays: 365.25,
    rotationPeriodHours: 23.9,
    axialTiltDegrees: 23.4,

    description:
      "Earth is the third planet from the Sun and the only known world with life.",

    visual: {
      radius: 0.28,
      orbitRadius: 4,
      color: "#2878ff",
      spinSpeed: 0.8,
      orbitSpeed: 0.18,
      texturePath: "/textures/earth-day.jpg",
    },
  },
] as const satisfies readonly CelestialBodyDefinition[]
