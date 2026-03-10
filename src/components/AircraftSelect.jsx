import { AIRCRAFT } from '../data/aircraft'
import './AircraftSelect.css'

export default function AircraftSelect({ value, onChange }) {
  return (
    <div className="aircraft-select">
      <label className="field-label">Aircraft</label>
      <div className="aircraft-grid">
        {AIRCRAFT.map((ac) => (
          <button
            key={ac.name}
            type="button"
            className={`aircraft-tile ${value === ac.name ? 'selected' : ''}`}
            onClick={() => onChange(ac.name)}
          >
            <span className="tile-name">{ac.name}</span>
            <span className="tile-speed">{ac.speed} KTAS</span>
          </button>
        ))}
      </div>
    </div>
  )
}
