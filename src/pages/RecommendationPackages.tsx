import { useNavigate } from 'react-router-dom'
import './RecommendationPackages.css'

interface Package {
  id: string
  name: string
  description: string
  measures: string[]
  annualSavings: number
  totalIncentives: number
  estimatedCost: number
  paybackYears: number
  icon: string
}

const packages: Package[] = [
  {
    id: 'quick-wins',
    name: 'Quick Wins',
    description: 'Low-cost, high-impact measures with immediate returns',
    measures: ['LED Lighting', 'Water Fixtures', 'Smart Thermostat'],
    annualSavings: 540,
    totalIncentives: 325,
    estimatedCost: 800,
    paybackYears: 1.5,
    icon: '⚡',
  },
  {
    id: 'essential',
    name: 'Essential',
    description: 'Recommended combination for balanced savings and investment',
    measures: ['LED Lighting', 'Air Sealing', 'Smart Thermostat', 'Water Fixtures'],
    annualSavings: 900,
    totalIncentives: 825,
    estimatedCost: 2100,
    paybackYears: 2.3,
    icon: '🏠',
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive',
    description: 'Complete efficiency upgrade for maximum long-term savings',
    measures: [
      'LED Lighting',
      'Air Sealing',
      'Smart Thermostat',
      'Heat Pump Water Heater',
      'Water Fixtures',
    ],
    annualSavings: 1380,
    totalIncentives: 1575,
    estimatedCost: 4500,
    paybackYears: 2.8,
    icon: '🌟',
  },
]

export default function RecommendationPackages() {
  const navigate = useNavigate()

  return (
    <div className="recommendation-packages">
      <h1 className="page-title">Recommendation Packages</h1>
      <p className="page-subtitle">Pre-configured measure bundles optimized for different goals</p>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <div className="package-icon">{pkg.icon}</div>
            <h2 className="package-name">{pkg.name}</h2>
            <p className="package-description">{pkg.description}</p>

            <div className="package-measures">
              <h3 className="measures-heading">Included Measures:</h3>
              <ul className="measures-list">
                {pkg.measures.map((measure, index) => (
                  <li key={index}>{measure}</li>
                ))}
              </ul>
            </div>

            <div className="package-stats">
              <div className="stat-row">
                <span className="stat-label">Annual Savings:</span>
                <span className="stat-value">${pkg.annualSavings.toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Available Incentives:</span>
                <span className="stat-value">${pkg.totalIncentives.toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Estimated Cost:</span>
                <span className="stat-value">${pkg.estimatedCost.toLocaleString()}</span>
              </div>
              <div className="stat-row highlight">
                <span className="stat-label">Simple Payback:</span>
                <span className="stat-value">{pkg.paybackYears} years</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="comparison-table-section card">
        <h2 className="section-title">Package Comparison</h2>
        <div className="table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Annual Savings</th>
                <th>Incentives</th>
                <th>Est. Cost</th>
                <th>Payback</th>
                <th>Measures</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="package-name-cell">
                    <span className="package-icon-small">{pkg.icon}</span>
                    {pkg.name}
                  </td>
                  <td>${pkg.annualSavings.toLocaleString()}</td>
                  <td>${pkg.totalIncentives.toLocaleString()}</td>
                  <td>${pkg.estimatedCost.toLocaleString()}</td>
                  <td>{pkg.paybackYears} yrs</td>
                  <td>{pkg.measures.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="disclaimer-box">
        <strong>Note:</strong> Cost estimates and payback periods are sample values for demonstration only.
        Actual costs and savings will vary based on contractor pricing, site-specific conditions, and
        current incentive programs.
      </div>

      <div className="packages-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={() => navigate('/summary')}
        >
          ← Back to Summary
        </button>
        <button
          type="button"
          className="button button-success"
          onClick={() => navigate('/report')}
        >
          Generate Audit Report →
        </button>
      </div>
    </div>
  )
}
