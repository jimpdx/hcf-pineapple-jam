import { useState } from 'react'
import DashboardTable from './DashboardTable'
import './Dashboard.css'

export default function Dashboard() {
  const [filterCallsign, setFilterCallsign] = useState('')
  const [filterDeparture, setFilterDeparture] = useState('')

  return (
    <div className="dashboard">
      <div className="dashboard-controls">
        <div className="filter-group">
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by callsign…"
            value={filterCallsign}
            onChange={(e) => setFilterCallsign(e.target.value)}
          />
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by departure…"
            value={filterDeparture}
            onChange={(e) => setFilterDeparture(e.target.value)}
          />
          {(filterCallsign || filterDeparture) && (
            <button
              className="filter-clear"
              onClick={() => { setFilterCallsign(''); setFilterDeparture('') }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <DashboardTable
        filterCallsign={filterCallsign}
        filterDeparture={filterDeparture}
      />
    </div>
  )
}
