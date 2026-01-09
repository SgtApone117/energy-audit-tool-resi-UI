import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MeasuresInput.css'

interface MeasureSection {
  id: string
  title: string
  description: string
  icon: string
}

const measures: MeasureSection[] = [
  {
    id: 'lighting',
    title: 'LED Lighting',
    description: 'Replace incandescent and CFL bulbs with LED equivalents',
    icon: '💡',
  },
  {
    id: 'airsealing',
    title: 'Air Sealing',
    description: 'Seal air leaks around windows, doors, and penetrations',
    icon: '🌬️',
  },
  {
    id: 'thermostat',
    title: 'Smart Thermostat',
    description: 'Install programmable or smart thermostat for optimal control',
    icon: '🌡️',
  },
  {
    id: 'heatpump',
    title: 'Heat Pump Water Heater',
    description: 'Upgrade to high-efficiency heat pump water heating',
    icon: '♨️',
  },
  {
    id: 'waterfixtures',
    title: 'Water Fixtures',
    description: 'Install low-flow showerheads and faucet aerators',
    icon: '🚿',
  },
]

export default function MeasuresInput() {
  const navigate = useNavigate()
  const [selectedMeasures, setSelectedMeasures] = useState<Set<string>>(new Set())
  const [photos, setPhotos] = useState<{ [key: string]: string }>({})

  const toggleMeasure = (id: string) => {
    const newSelected = new Set(selectedMeasures)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedMeasures(newSelected)
  }

  const handlePhotoUpload = (measureId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotos({
        ...photos,
        [measureId]: file.name,
      })
    }
  }

  const handleContinue = () => {
    navigate('/summary')
  }

  return (
    <div className="measures-input">
      <h1 className="page-title">Energy Efficiency Measures</h1>
      <p className="page-subtitle">Select and document applicable measures for this property</p>

      <div className="measures-grid">
        {measures.map((measure) => (
          <div
            key={measure.id}
            className={`measure-card ${selectedMeasures.has(measure.id) ? 'selected' : ''}`}
          >
            <div className="measure-header">
              <span className="measure-icon">{measure.icon}</span>
              <div className="measure-checkbox">
                <input
                  type="checkbox"
                  id={measure.id}
                  checked={selectedMeasures.has(measure.id)}
                  onChange={() => toggleMeasure(measure.id)}
                />
              </div>
            </div>

            <h3 className="measure-title">{measure.title}</h3>
            <p className="measure-description">{measure.description}</p>

            {selectedMeasures.has(measure.id) && (
              <div className="measure-photo-upload">
                <label className="photo-upload-label" htmlFor={`photo-${measure.id}`}>
                  {photos[measure.id] ? (
                    <span className="photo-uploaded">
                      ✓ {photos[measure.id]}
                    </span>
                  ) : (
                    <span className="photo-placeholder">
                      📷 Upload Photo (Optional)
                    </span>
                  )}
                </label>
                <input
                  type="file"
                  id={`photo-${measure.id}`}
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(measure.id, e)}
                  className="photo-input"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="measures-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={() => navigate('/')}
        >
          ← Back to Intake
        </button>
        <button
          type="button"
          className="button button-primary"
          onClick={handleContinue}
          disabled={selectedMeasures.size === 0}
        >
          Continue to Summary →
        </button>
      </div>

      <div className="info-box">
        <h3>Photo Documentation</h3>
        <p>
          Photos are optional but recommended for comprehensive documentation. This mockup simulates
          file upload functionality. In production, photos would be stored and included in the final report.
        </p>
      </div>
    </div>
  )
}
