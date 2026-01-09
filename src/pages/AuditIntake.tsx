import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AuditIntake.css'

export default function AuditIntake() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zip: '',
    homeType: 'single-family',
    sqft: '',
    yearBuilt: '',
    utility: 'eversource',
  })
  const [lightingPhotos, setLightingPhotos] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('lightingPhotos')
    if (saved) {
      setLightingPhotos(JSON.parse(saved))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/measures')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newPhotos: string[] = []
    const filesToProcess = Math.min(files.length, 3 - lightingPhotos.length)

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        newPhotos.push(result)

        if (newPhotos.length === filesToProcess) {
          const updated = [...lightingPhotos, ...newPhotos].slice(0, 3)
          setLightingPhotos(updated)
          localStorage.setItem('lightingPhotos', JSON.stringify(updated))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = (index: number) => {
    const updated = lightingPhotos.filter((_, i) => i !== index)
    setLightingPhotos(updated)
    localStorage.setItem('lightingPhotos', JSON.stringify(updated))
  }

  return (
    <div className="audit-intake">
      <h1 className="page-title">New Energy Audit</h1>
      <p className="page-subtitle">Enter property information to begin audit assessment</p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2 className="section-title">Property Information</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="address">
              Street Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-input"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="123 Main Street"
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="city">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-input"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Hartford"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="zip">
                ZIP Code *
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                className="form-input"
                value={formData.zip}
                onChange={handleChange}
                required
                pattern="[0-9]{5}"
                placeholder="06101"
              />
            </div>
          </div>

          <h2 className="section-title">Building Details</h2>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="homeType">
                Home Type *
              </label>
              <select
                id="homeType"
                name="homeType"
                className="form-select"
                value={formData.homeType}
                onChange={handleChange}
                required
              >
                <option value="single-family">Single Family</option>
                <option value="multi-family">Multi Family</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="sqft">
                Square Footage *
              </label>
              <input
                type="number"
                id="sqft"
                name="sqft"
                className="form-input"
                value={formData.sqft}
                onChange={handleChange}
                required
                min="500"
                max="20000"
                placeholder="2000"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="yearBuilt">
                Year Built *
              </label>
              <input
                type="number"
                id="yearBuilt"
                name="yearBuilt"
                className="form-input"
                value={formData.yearBuilt}
                onChange={handleChange}
                required
                min="1800"
                max="2026"
                placeholder="1985"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="utility">
                Electric Utility *
              </label>
              <select
                id="utility"
                name="utility"
                className="form-select"
                value={formData.utility}
                onChange={handleChange}
                required
              >
                <option value="eversource">Eversource Energy</option>
                <option value="ui">United Illuminating (UI)</option>
              </select>
            </div>
          </div>

          <h2 className="section-title">LED Lighting Photos</h2>
          <p className="section-description">Upload up to 3 photos of existing lighting fixtures</p>

          <div className="photo-upload-section">
            <div className="photo-upload-grid">
              {lightingPhotos.map((photo, index) => (
                <div key={index} className="photo-preview">
                  <img src={photo} alt={`Lighting fixture ${index + 1}`} />
                  <button
                    type="button"
                    className="remove-photo-btn"
                    onClick={() => removePhoto(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
              {lightingPhotos.length < 3 && (
                <label className="photo-upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                  <div className="upload-placeholder">
                    <span>+ Add Photo</span>
                  </div>
                </label>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="button button-primary">
              Start Audit Assessment →
            </button>
          </div>
        </form>
      </div>

      <div className="info-box">
        <h3>About This Tool</h3>
        <p>
          This mockup demonstrates a professional energy audit workflow for Connecticut residential properties.
          All calculations and recommendations shown are sample data for demonstration purposes only.
        </p>
      </div>
    </div>
  )
}
