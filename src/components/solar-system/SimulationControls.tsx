const SPEED_PRESETS = [
  { multiplier: 1, label: "Real time" },
  { multiplier: 3_600, label: "1 hour per second" },
  { multiplier: 86_400, label: "1 day per second" },
  { multiplier: 604_800, label: "1 week per second" },
  { multiplier: 2_592_000, label: "30 days per second" },
] as const

type SimulationControlsProps = {
  isPaused: boolean
  speed: number
  showOrbits: boolean
  onTogglePaused: () => void
  onSpeedChange: (speed: number) => void
  onToggleOrbits: () => void
}

type IconProps = {
  className?: string
}

function PlayIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
    </svg>
  )
}

function OrbitIcon({
  className,
  disabled = false,
}: IconProps & { disabled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />

      {disabled && <path d="M4 4l16 16" strokeWidth="2" />}
    </svg>
  )
}

function SpeedIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 17a8 8 0 1 1 14 0" />
      <path d="M12 13l4-4" />
      <circle cx="12" cy="13" r="1" fill="currentColor" />
    </svg>
  )
}

export function SimulationControls({
  isPaused,
  speed,
  showOrbits,
  onTogglePaused,
  onSpeedChange,
  onToggleOrbits,
}: SimulationControlsProps) {
  const buttonClass =
    "grid size-10 place-items-center rounded-lg border border-white/15 " +
    "bg-white/10 text-white/75 transition " +
    "hover:bg-white/20 hover:text-white"
  const selectedSpeedPreset =
    SPEED_PRESETS.find((preset) => preset.multiplier === speed) ??
    SPEED_PRESETS[0]

  const selectedSpeedIndex = SPEED_PRESETS.indexOf(selectedSpeedPreset)

  return (
    <div className="absolute top-5 left-5 z-20 flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 p-2 backdrop-blur-md">
      <button
        type="button"
        className={buttonClass}
        onClick={onTogglePaused}
        aria-label={isPaused ? "Resume simulation" : "Pause simulation"}
        title={isPaused ? "Resume" : "Pause"}
      >
        {isPaused ? (
          <PlayIcon className="size-5" />
        ) : (
          <PauseIcon className="size-5" />
        )}
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={onToggleOrbits}
        aria-label={showOrbits ? "Hide orbit paths" : "Show orbit paths"}
        title={showOrbits ? "Hide orbits" : "Show orbits"}
      >
        <OrbitIcon className="size-6" disabled={!showOrbits} />
      </button>

      <div
        className="flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 text-white/75"
        title={`Simulation speed: ${selectedSpeedPreset.label}`}
      >
        <SpeedIcon className="size-5 shrink-0" />

        <input
          type="range"
          min={0}
          max={SPEED_PRESETS.length - 1}
          step={1}
          value={selectedSpeedIndex}
          aria-label="Simulation speed"
          aria-valuetext={selectedSpeedPreset.label}
          onChange={(event) => {
            const preset = SPEED_PRESETS[Number(event.currentTarget.value)]

            if (preset) {
              onSpeedChange(preset.multiplier)
            }
          }}
          className="w-24 accent-white opacity-75"
        />
      </div>
    </div>
  )
}
