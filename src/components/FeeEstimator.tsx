import { useMemo, useState } from 'react'

const STAGE_SPLIT = [
  { key: 'concept', label: 'Concept', pct: 0.15 },
  { key: 'schematic', label: 'Schematic', pct: 0.15 },
  { key: 'dd', label: 'Design development', pct: 0.2 },
  { key: 'cd', label: 'Documentation', pct: 0.35 },
  { key: 'ca', label: 'Contract admin', pct: 0.15 },
] as const

export function FeeEstimator() {
  const [budget, setBudget] = useState(850000)
  const [feePct, setFeePct] = useState(8)
  const [contingency, setContingency] = useState(10)

  const totalFee = useMemo(() => (budget * feePct) / 100, [budget, feePct])
  const withContingency = useMemo(
    () => totalFee * (1 + contingency / 100),
    [totalFee, contingency],
  )

  const stages = useMemo(
    () =>
      STAGE_SPLIT.map((s) => ({
        ...s,
        amount: totalFee * s.pct,
      })),
    [totalFee],
  )

  return (
    <div className="tool-card">
      <div className="tool-card-head">
        <h2>Fee estimator</h2>
        <p>
          Rough educational model for residential alterations and new houses. Not a quote—studios
          set fees by risk, scope, and procurement.
        </p>
      </div>

      <div className="form-grid">
        <label>
          Estimated construction budget (AUD)
          <input
            type="number"
            min={50000}
            step={10000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value) || 0)}
          />
        </label>
        <label>
          Architect fee (% of construction)
          <input
            type="number"
            min={3}
            max={18}
            step={0.5}
            value={feePct}
            onChange={(e) => setFeePct(Number(e.target.value) || 0)}
          />
        </label>
        <label>
          Contingency on fees (%)
          <input
            type="number"
            min={0}
            max={30}
            step={1}
            value={contingency}
            onChange={(e) => setContingency(Number(e.target.value) || 0)}
          />
        </label>
      </div>

      <div className="fee-summary">
        <div>
          <span className="fee-label">Base professional fee</span>
          <strong>{formatAud(totalFee)}</strong>
        </div>
        <div>
          <span className="fee-label">With contingency</span>
          <strong>{formatAud(withContingency)}</strong>
        </div>
      </div>

      <div className="fee-stages">
        {stages.map((s) => (
          <div className="fee-stage" key={s.key}>
            <div className="fee-stage-top">
              <span>{s.label}</span>
              <span>{Math.round(s.pct * 100)}%</span>
            </div>
            <strong>{formatAud(s.amount)}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

function formatAud(n: number) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(n)
}
