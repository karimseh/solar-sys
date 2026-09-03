import type { CelestialBodyDefinition } from "@/types/celestial-body"
import { JPL_PLANETARY_ELEMENTS } from "../astronomy/data/jpl-planetary-elements"
import { MOON_ORBITAL_ELEMENTS } from "../astronomy/data/moon-orbital-elements"

export const CELESTIAL_BODIES = [
  {
    id: "sun",
    name: "Sun",
    kind: "star",
    parentId: null,
    radiusKm: 695_700,
    orbitalElements: null,
    meanDistanceFromParentKm: 0,
    orbitalPeriodDays: null,
    rotationPeriodHours: 600,
    axialTiltDegrees: 7.25,
    description:
      "The Sun is the star at the center of our solar system. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
    visual: {
      color: "#ffb300",
      texturePath: "/textures/sun-surface.jpg",
      nightTexturePath: null,
    },
  },
  {
    id: "mercury",
    name: "Mercury",
    kind: "planet",
    parentId: "sun",

    radiusKm: 2_439.4,
    orbitalElements: JPL_PLANETARY_ELEMENTS.mercury,
    meanDistanceFromParentKm: 57_909_227,
    orbitalPeriodDays: 87.969,
    rotationPeriodHours: 1_407.5,
    axialTiltDegrees: 0.034,

    description:
      "Mercury is the smallest planet and the closest planet to the Sun.",

    visual: {
      color: "#9c8f7d",
      texturePath: "/textures/mercury.jpg",
      nightTexturePath: null,
    },
  },
  {
    id: "venus",
    name: "Venus",
    kind: "planet",
    parentId: "sun",

    radiusKm: 6_051.8,
    orbitalElements: JPL_PLANETARY_ELEMENTS.venus,
    meanDistanceFromParentKm: 108_209_475,
    orbitalPeriodDays: 224.701,
    rotationPeriodHours: -5_832.5,
    axialTiltDegrees: 177.36,

    description:
      "Venus is covered by a dense carbon dioxide atmosphere and rotates in the opposite direction to most planets.",

    visual: {
      color: "#d8b56a",
      texturePath: "/textures/venus.jpg",
      nightTexturePath: null,
    },
  },
  {
    id: "earth",
    name: "Earth",
    kind: "planet",
    parentId: "sun",

    radiusKm: 6_371,
    orbitalElements: JPL_PLANETARY_ELEMENTS.earth,
    meanDistanceFromParentKm: 149_598_261,
    orbitalPeriodDays: 365.256,
    rotationPeriodHours: 23.9345,
    axialTiltDegrees: 23.44,

    description:
      "Earth is the third planet from the Sun and the only known world with life.",

    visual: {
      color: "#2878ff",
      texturePath: "/textures/earth-day.jpg",
      nightTexturePath: "/textures/earth-night.png",
    },
  },
  {
    id: "moon",
    name: "Moon",
    kind: "moon",
    parentId: "earth",

    radiusKm: 1_737.4,
    orbitalElements: MOON_ORBITAL_ELEMENTS,
    meanDistanceFromParentKm: 384_400,
    orbitalPeriodDays: 27.321661,
    rotationPeriodHours: 655.719864,
    axialTiltDegrees: 6.68,

    description:
      "Earth’s only natural satellite. The Moon is synchronously rotating, so nearly the same hemisphere always faces Earth.",

    visual: {
      color: "#b8b8b8",
      texturePath: "/textures/moon.jpg",
      nightTexturePath: null,
    },
  },
  {
    id: "mars",
    name: "Mars",
    kind: "planet",
    parentId: "sun",

    radiusKm: 3_389.5,
    orbitalElements: JPL_PLANETARY_ELEMENTS.mars,
    meanDistanceFromParentKm: 227_943_822,
    orbitalPeriodDays: 686.98,
    rotationPeriodHours: 24.6229,
    axialTiltDegrees: 25.19,

    description:
      "Mars is a cold desert world with iron-rich soil, polar ice caps, volcanoes, and canyons.",

    visual: {
      color: "#b65332",
      texturePath: "/textures/mars.jpg",
      nightTexturePath: null,
    },
  },
  {
    id: "jupiter",
    name: "Jupiter",
    kind: "planet",
    parentId: "sun",

    radiusKm: 69_911,
    orbitalElements: JPL_PLANETARY_ELEMENTS.jupiter,
    meanDistanceFromParentKm: 778_340_817,
    orbitalPeriodDays: 4_332.59,
    rotationPeriodHours: 9.925,
    axialTiltDegrees: 3.13,

    description:
      "Jupiter is the largest planet, a gas giant known for its cloud bands and Great Red Spot.",

    visual: {
      color: "#c9a27c",
      texturePath: "/textures/jupiter.jpg",
      nightTexturePath: null,
      rings: {
        innerRadiusRatio: 1.75,
        outerRadiusRatio: 1.85,
        color: "#9a8875",
        opacity: 0.14,
      },
    },
  },
  {
    id: "saturn",
    name: "Saturn",
    kind: "planet",
    parentId: "sun",

    radiusKm: 58_232,
    orbitalElements: JPL_PLANETARY_ELEMENTS.saturn,
    meanDistanceFromParentKm: 1_426_666_414,
    orbitalPeriodDays: 10_759.22,
    rotationPeriodHours: 10.656,
    axialTiltDegrees: 26.73,

    description:
      "Saturn is a gas giant surrounded by an extensive system of icy rings.",

    visual: {
      color: "#d8c28f",
      texturePath: "/textures/saturn.jpg",
      nightTexturePath: null,
      rings: {
        innerRadiusRatio: 1.28,
        outerRadiusRatio: 2.35,
        color: "#cbbd9a",
        opacity: 0.72,
      },
    },
  },
  {
    id: "uranus",
    name: "Uranus",
    kind: "planet",
    parentId: "sun",

    radiusKm: 25_362,
    orbitalElements: JPL_PLANETARY_ELEMENTS.uranus,
    meanDistanceFromParentKm: 2_870_658_171,
    orbitalPeriodDays: 30_688.5,
    rotationPeriodHours: -17.24,
    axialTiltDegrees: 97.77,

    description: "Uranus is an ice giant that rotates nearly on its side.",

    visual: {
      color: "#86d5e8",
      texturePath: "/textures/uranus.jpg",
      nightTexturePath: null,
      rings: {
        innerRadiusRatio: 1.46,
        outerRadiusRatio: 2.02,
        color: "#667077",
        opacity: 0.2,
      },
    },
  },
  {
    id: "neptune",
    name: "Neptune",
    kind: "planet",
    parentId: "sun",

    radiusKm: 24_622,
    orbitalElements: JPL_PLANETARY_ELEMENTS.neptune,
    meanDistanceFromParentKm: 4_498_396_417,
    orbitalPeriodDays: 60_182,
    rotationPeriodHours: 16.11,
    axialTiltDegrees: 28.32,

    description:
      "Neptune is the outermost planet and an ice giant with extremely fast atmospheric winds.",

    visual: {
      color: "#4169c1",
      texturePath: "/textures/neptune.jpg",
      nightTexturePath: null,
      rings: {
        innerRadiusRatio: 1.7,
        outerRadiusRatio: 2.56,
        color: "#596271",
        opacity: 0.1,
      },
    },
  },
] as const satisfies readonly CelestialBodyDefinition[]
