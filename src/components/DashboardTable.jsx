import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { AIRPORTS } from '../data/airports'
import './DashboardTable.css'

const airportMap = Object.fromEntries(AIRPORTS.map((a) => [a.icao, a]))

function formatTimestamp(ts) {
  if (!ts) return '—'
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mm = String(d.getUTCMinutes()).padStart(2, '0')
  return hh + mm + 'z'
}

function AirportCell({ icao }) {
  const airport = airportMap[icao]
  return (
    <span className="airport-cell">
      <strong>{icao}</strong>
      {airport && <span className="airport-name">{airport.name}</span>}
    </span>
  )
}

function CardBadge({ card }) {
  if (!card) return <span className="card-badge empty">—</span>
  const wrapRef = useRef(null)
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  const handleEnter = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const tipW = 300
    let left = rect.left + rect.width / 2 - tipW / 2
    left = Math.max(8, Math.min(left, window.innerWidth - tipW - 8))
    setPos({ top: rect.top - 10, left })
    setHover(true)
  }, [])

  const tooltip = hover && createPortal(
    <div
      className="card-tooltip visible"
      style={{
        '--card-color': card.color,
        top: pos.top + 'px',
        left: pos.left + 'px',
      }}
    >
      <span className="tooltip-category">{card.category}</span>
      <span className="tooltip-icon">{card.icon}</span>
      <span className="tooltip-title">{card.title}</span>
      <span className="tooltip-text">{card.text}</span>
    </div>,
    document.body
  )

  return (
    <>
      <span
        className="card-badge-wrap"
        ref={wrapRef}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setHover(false)}
      >
        <span className="card-badge" style={{ '--card-color': card.color }}>
          <span className="card-icon">{card.icon}</span>
          <span className="card-title">{card.title}</span>
        </span>
      </span>
      {tooltip}
    </>
  )
}

export default function DashboardTable({ filterCallsign, filterDeparture }) {
  const [legs, setLegs] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState('timestamp')
  const [sortAsc, setSortAsc] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'legs'), orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setLegs(data)
      setLoading(false)
    })
    return unsub
  }, [])

  // Group legs by callsign and apply filters + sorting
  const groups = useMemo(() => {
    const csFilter = filterCallsign.trim().toUpperCase()
    const depFilter = filterDeparture.trim().toUpperCase()

    // Filter
    let filtered = legs
    if (csFilter) {
      filtered = filtered.filter((l) =>
        l.callsign.toUpperCase().includes(csFilter)
      )
    }
    if (depFilter) {
      filtered = filtered.filter(
        (l) =>
          l.departure.toUpperCase().includes(depFilter) ||
          (airportMap[l.departure]?.name || '').toUpperCase().includes(depFilter)
      )
    }

    // Group by callsign
    const map = new Map()
    for (const leg of filtered) {
      const cs = leg.callsign
      if (!map.has(cs)) map.set(cs, [])
      map.get(cs).push(leg)
    }

    // Sort legs within each group by leg_number
    for (const [, groupLegs] of map) {
      groupLegs.sort((a, b) => (a.leg_number || 0) - (b.leg_number || 0))
    }

    // Sort groups
    let entries = [...map.entries()]
    entries.sort((a, b) => {
      const aLegs = a[1]
      const bLegs = b[1]
      if (sortField === 'callsign') {
        const cmp = a[0].localeCompare(b[0])
        return sortAsc ? cmp : -cmp
      }
      // Default: sort by most recent timestamp
      const aTime = aLegs[aLegs.length - 1]?.timestamp?.seconds || 0
      const bTime = bLegs[bLegs.length - 1]?.timestamp?.seconds || 0
      return sortAsc ? aTime - bTime : bTime - aTime
    })

    return entries
  }, [legs, filterCallsign, filterDeparture, sortField, sortAsc])

  function handleSort(field) {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(field === 'callsign')
    }
  }

  function SortIcon({ field }) {
    if (sortField !== field) return null
    return <span className="sort-arrow">{sortAsc ? ' ▲' : ' ▼'}</span>
  }

  if (loading) {
    return (
      <div className="table-loading">
        <span className="loading-icon">🍍</span>
        <p>Loading flights…</p>
      </div>
    )
  }

  if (groups.length === 0) {
    return (
      <div className="table-empty">
        <span className="empty-icon">✈️</span>
        <h3>No flights filed yet</h3>
        <p>Be the first to register a leg!</p>
      </div>
    )
  }

  const totalLegs = groups.reduce((sum, [, g]) => sum + g.length, 0)

  return (
    <div className="table-wrapper">
      <div className="table-stats">
        <span>{groups.length} pilot{groups.length !== 1 ? 's' : ''}</span>
        <span className="stat-divider">·</span>
        <span>{totalLegs} leg{totalLegs !== 1 ? 's' : ''} filed</span>
      </div>

      <div className="table-scroll">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => handleSort('callsign')}>
                Callsign<SortIcon field="callsign" />
              </th>
              <th>Name</th>
              <th>Aircraft</th>
              <th>Leg</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Turn Card</th>
              <th className="sortable" onClick={() => handleSort('timestamp')}>
                Filed<SortIcon field="timestamp" />
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map(([callsign, groupLegs]) =>
              groupLegs.map((leg, i) => (
                <tr key={leg.id} className={i === 0 ? 'group-first' : 'group-cont'}>
                  <td className="cell-callsign">{callsign}</td>
                  <td className="cell-name">{leg.name}</td>
                  <td className="cell-aircraft">{leg.aircraft}</td>
                  <td className="cell-leg">{leg.leg_number}</td>
                  <td className="cell-airport"><AirportCell icao={leg.departure} /></td>
                  <td className="cell-airport"><AirportCell icao={leg.arrival} /></td>
                  <td className="cell-card"><CardBadge card={leg.card} /></td>
                  <td className="cell-time">{formatTimestamp(leg.timestamp)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
