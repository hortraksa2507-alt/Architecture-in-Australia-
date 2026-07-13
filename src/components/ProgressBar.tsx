export function ProgressBar({
  value,
  max,
  label,
}: {
  value: number
  max: number
  label?: string
}) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100)
  return (
    <div className="progress-block" aria-label={label ?? 'Progress'}>
      <div className="progress-meta">
        <span>{label ?? 'Progress'}</span>
        <span>
          {value}/{max} · {pct}%
        </span>
      </div>
      <div className="progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
