import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { CARDS } from '../data/cards'
import AirportAutocomplete from './AirportAutocomplete'
import AircraftSelect from './AircraftSelect'
import './FileNewLegModal.css'

const LS_KEY = 'pineapple-jam-pilot'

function loadPilot() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function savePilot(pilot) {
  localStorage.setItem(LS_KEY, JSON.stringify(pilot))
}

function randomCard() {
  return CARDS[Math.floor(Math.random() * CARDS.length)]
}

export default function FileNewLegModal({ open, onClose }) {
  const saved = loadPilot()
  const isReturning = !!saved

  const [callsign, setCallsign] = useState(saved?.callsign || '')
  const [name, setName] = useState(saved?.name || '')
  const [aircraft, setAircraft] = useState(saved?.aircraft || '')
  const [departure, setDeparture] = useState('')
  const [arrival, setArrival] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [drawnCard, setDrawnCard] = useState(null)

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      const pilot = loadPilot()
      setCallsign(pilot?.callsign || '')
      setName(pilot?.name || '')
      setAircraft(pilot?.aircraft || '')
      setDeparture('')
      setArrival('')
      setError('')
      setSubmitting(false)
      setDrawnCard(null)
    }
  }, [open])

  if (!open) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Validation
    const cs = callsign.trim().toUpperCase()
    if (!cs) return setError('Callsign is required.')
    if (!aircraft) return setError('Select an aircraft.')
    if (!departure) return setError('Select a departure airport.')
    if (!arrival) return setError('Select an arrival airport.')
    if (departure === arrival) return setError('Departure and arrival cannot be the same.')

    setSubmitting(true)

    try {
      // Duplicate check: same callsign + departure + arrival
      const dupeQuery = query(
        collection(db, 'legs'),
        where('callsign', '==', cs),
        where('departure', '==', departure),
        where('arrival', '==', arrival)
      )
      const dupeSnap = await getDocs(dupeQuery)
      if (!dupeSnap.empty) {
        setSubmitting(false)
        return setError(`You've already filed ${departure} → ${arrival}. Pick a different route!`)
      }

      // Leg number
      const csQuery = query(collection(db, 'legs'), where('callsign', '==', cs))
      const csSnap = await getDocs(csQuery)
      const legNumber = csSnap.size + 1

      // Draw card
      const card = randomCard()

      // Save leg
      await addDoc(collection(db, 'legs'), {
        callsign: cs,
        name: name.trim(),
        aircraft,
        departure,
        arrival,
        card,
        leg_number: legNumber,
        timestamp: serverTimestamp(),
      })

      // Save pilot to localStorage
      savePilot({ callsign: cs, name: name.trim(), aircraft })

      // Show card
      setDrawnCard(card)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      if (drawnCard) onClose()
    }
  }

  // Card reveal view
  if (drawnCard) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-panel card-reveal-panel">
          <div className="card-reveal-header">
            <h2>Leg Filed!</h2>
            <p>Your turn card for {departure} → {arrival}</p>
          </div>
          <div className="card-reveal-card" style={{ '--card-color': drawnCard.color }}>
            <span className="reveal-icon">{drawnCard.icon}</span>
            <h3 className="reveal-title">{drawnCard.title}</h3>
            <p className="reveal-text">{drawnCard.text}</p>
            <span className="reveal-category">{drawnCard.category}</span>
          </div>
          <button className="btn-primary modal-close-btn" onClick={onClose}>
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-panel">
        <div className="modal-header">
          <h2>{isReturning ? `Welcome back, ${saved.callsign}!` : 'File New Leg'}</h2>
          <button type="button" className="modal-x" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="leg-form">
          {/* Pilot info — editable for first-timers, shown for returning */}
          <div className="form-row three-col">
            <div className="field">
              <label className="field-label">Callsign</label>
              <input
                type="text"
                className="field-input"
                placeholder="e.g. AAL123"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value.toUpperCase())}
                maxLength={10}
              />
            </div>
            <div className="field">
              <label className="field-label">Name / Tag (optional)</label>
              <input
                type="text"
                className="field-input"
                placeholder="e.g. John"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
              />
            </div>
          </div>

          <AircraftSelect value={aircraft} onChange={setAircraft} />

          <div className="form-row two-col">
            <AirportAutocomplete
              label="Departure"
              value={departure}
              onChange={setDeparture}
              exclude={arrival}
            />
            <AirportAutocomplete
              label="Arrival"
              value={arrival}
              onChange={setArrival}
              exclude={departure}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn-primary submit-btn" disabled={submitting}>
            {submitting ? 'Filing…' : 'File Leg & Draw Card'}
          </button>
        </form>
      </div>
    </div>
  )
}
