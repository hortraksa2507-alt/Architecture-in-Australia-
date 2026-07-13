type Props = {
  id: string
  label: string
  checked: boolean
  onToggle: (id: string) => void
  detail?: string
}

export function CheckRow({ id, label, checked, onToggle, detail }: Props) {
  return (
    <label className={`check-row${checked ? ' done' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
        aria-describedby={detail ? `${id}-detail` : undefined}
      />
      <span className="check-box" aria-hidden="true" />
      <span className="check-copy">
        <span className="check-label">{label}</span>
        {detail ? (
          <span className="check-detail" id={`${id}-detail`}>
            {detail}
          </span>
        ) : null}
      </span>
    </label>
  )
}
