import type { CelestialBodyDefinition } from "@/types/celestial-body"

type BodyInfoPanelProps = {
    body: CelestialBodyDefinition | null
    onClose: () => void
}

const numberFormatter = new Intl.NumberFormat("en-US")

export default function BodyInfoPanel({ 
    body,
    onClose,}: BodyInfoPanelProps) {
    if (!body) return null
    
    return (
         <aside className="absolute right-4 top-4 z-20 w-[min(22rem,calc(100%-2rem))] rounded-2xl border border-white/15 bg-black/75 p-5 text-white shadow-2xl backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
            {body.kind}
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            {body.name}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-3 py-1 text-xl text-white/70 hover:bg-white/10 hover:text-white"
          aria-label="Close information panel"
        >
          ×
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/70">
        {body.description}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-white/50">Radius</dt>
          <dd className="mt-1">
            {numberFormatter.format(body.radiusKm)} km
          </dd>
        </div>

        <div>
          <dt className="text-white/50">Axial tilt</dt>
          <dd className="mt-1">
            {body.axialTiltDegrees}°
          </dd>
        </div>

        <div>
          <dt className="text-white/50">Rotation period</dt>
          <dd className="mt-1">
            {numberFormatter.format(
              body.rotationPeriodHours,
            )}{' '}
            hours
          </dd>
        </div>

        <div>
          <dt className="text-white/50">Orbital period</dt>
          <dd className="mt-1">
            {body.orbitalPeriodDays === null
              ? 'Not applicable'
              : `${numberFormatter.format(
                  body.orbitalPeriodDays,
                )} days`}
          </dd>
        </div>

        <div className="col-span-2">
          <dt className="text-white/50">
            Mean distance from parent
          </dt>
          <dd className="mt-1">
            {numberFormatter.format(
              body.meanDistanceFromParentKm,
            )}{' '}
            km
          </dd>
        </div>
      </dl>
    </aside>
    )
}