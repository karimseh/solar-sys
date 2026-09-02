import type { CelestialBodyDefinition } from "@/types/celestial-body"
import { JPL_PLANETARY_ELEMENTS } from "../astronomy/data/jpl-planetary-elements"

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
    },
  },
] as const satisfies readonly CelestialBodyDefinition[]
