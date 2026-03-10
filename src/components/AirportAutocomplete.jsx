import { useState, useRef, useEffect } from 'react'
import { AIRPORTS } from '../data/airports'
import './AirportAutocomplete.css'

export default function AirportAutocomplete({ label, value, onChange, exclude }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(0)
  const wrapperRef = useRef(null)

  const selected = AIRPORTS.find((a) => a.icao === value)

  const filtered = query.trim()
    ? AIRPORTS.filter((a) => {
        if (a.icao === exclude) return false
        const q = query.toUpperCase()
        return a.icao.includes(q) || a.name.toUpperCase().includes(q) || a.island.toUpperCase().includes(q)
      })
    : AIRPORTS.filter((a) => a.icao !== exclude)

  useEffect(() => {
    setHighlightIdx(0)
  }, [query])

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(airport) {
    onChange(airport.icao)
    setQuery('')
    setOpen(false)
  }

  function handleKeyDown(e) {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIdx((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[highlightIdx]) {
      e.preventDefault()
      handleSelect(filtered[highlightIdx])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  function handleClear(e) {
    e.stopPropagation()
    onChange('')
    setQuery('')
  }

  return (
    <div className="airport-autocomplete" ref={wrapperRef}>
      <label className="field-label">{label}</label>
      {selected && !open ? (
        <div className="airport-selected" onClick={() => setOpen(true)}>
          <span className="selected-icao">{selected.icao}</span>
          <span className="selected-name">{selected.name}</span>
          <span className="selected-island">{selected.island}</span>
          <button type="button" className="selected-clear" onClick={handleClear}>×</button>
        </div>
      ) : (
        <input
          type="text"
          className="airport-input"
          placeholder="Type ICAO or airport name…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      )}
      {open && (
        <ul className="airport-dropdown">
          {filtered.length === 0 ? (
            <li className="dropdown-empty">No airports found</li>
          ) : (
            filtered.map((a, i) => (
              <li
                key={a.icao}
                className={`dropdown-item ${i === highlightIdx ? 'highlighted' : ''}`}
                onMouseEnter={() => setHighlightIdx(i)}
                onMouseDown={() => handleSelect(a)}
              >
                <span className="dd-icao">{a.icao}</span>
                <span className="dd-name">{a.name}</span>
                <span className="dd-island">{a.island}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
