import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './SavingsSummary.css'

interface SavingsData {
  measure: string
  annualKwh: number
  annualSavings: number
  incentive: number
  priority: string
}

const savingsData: SavingsData[] = [
  {
    measure: 'LED Lighting',
    annualKwh: 1200,
    annualSavings: 240,
    incentive: 150,
    priority: 'High',
  },
  {
    measure: 'Air Sealing',
    annualKwh: 1800,
    annualSavings: 360,
    incentive: 500,
    priority: 'High',
  },
  {
    measure: 'Smart Thermostat',
    annualKwh: 900,
    annualSavings: 180,
    incentive: 100,
    priority: 'Medium',
  },
  {
    measure: 'Heat Pump Water Heater',
    annualKwh: 2400,
    annualSavings: 480,
    incentive: 750,
    priority: 'High',
  },
  {
    measure: 'Water Fixtures',
    annualKwh: 600,
    annualSavings: 120,
    incentive: 75,
    priority: 'Low',
  },
]

const chartData = savingsData.map(item => ({
  name: item.measure,
  'Annual Savings ($)': item.annualSavings,
  'Incentive ($)': item.incentive,
}))

export default function SavingsSummary() {
  const navigate = useNavigate()

  const totalKwh = savingsData.reduce((sum, item) => sum + item.annualKwh, 0)
  const totalSavings = savingsData.reduce((sum, item) => sum + item.annualSavings, 0)
  const totalIncentives = savingsData.reduce((sum, item) => sum + item.incentive, 0)

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'priority-high'
      case 'Medium':
        return 'priority-medium'
      case 'Low':
        return 'priority-low'
      default:
        return ''
    }
  }

  return (
    <div className="savings-summary">
      <h1 className="page-title">Estimated Savings Summary</h1>
      <p className="page-subtitle">Annual energy and cost savings based on selected measures</p>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-label">Total Annual Energy Savings</div>
          <div className="summary-value">{totalKwh.toLocaleString()} kWh</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Total Annual Cost Savings</div>
          <div className="summary-value">${totalSavings.toLocaleString()}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Total Available Incentives</div>
          <div className="summary-value">${totalIncentives.toLocaleString()}</div>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Savings by Measure</h2>
        <div className="table-container">
          <table className="savings-table">
            <thead>
              <tr>
                <th>Measure</th>
                <th>Annual kWh</th>
                <th>Annual Savings</th>
                <th>Incentive</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {savingsData.map((item, index) => (
                <tr key={index}>
                  <td className="measure-name">{item.measure}</td>
                  <td>{item.annualKwh.toLocaleString()}</td>
                  <td>${item.annualSavings.toLocaleString()}</td>
                  <td>${item.incentive.toLocaleString()}</td>
                  <td>
                    <span className={`priority-badge ${getPriorityClass(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="total-row">
                <td className="measure-name"><strong>Total</strong></td>
                <td><strong>{totalKwh.toLocaleString()}</strong></td>
                <td><strong>${totalSavings.toLocaleString()}</strong></td>
                <td><strong>${totalIncentives.toLocaleString()}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Annual Savings Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis label={{ value: 'Dollars ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Annual Savings ($)" fill="#2c5282" />
            <Bar dataKey="Incentive ($)" fill="#059669" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="disclaimer-box">
        <strong>Note:</strong> All values are estimated based on typical usage patterns and current utility rates.
        Actual savings may vary based on individual usage, weather conditions, and other factors.
      </div>

      <div className="summary-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={() => navigate('/measures')}
        >
          ← Back to Measures
        </button>
        <button
          type="button"
          className="button button-primary"
          onClick={() => navigate('/packages')}
        >
          View Recommendation Packages →
        </button>
      </div>
    </div>
  )
}
