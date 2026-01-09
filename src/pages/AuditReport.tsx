import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import './AuditReport.css'

export default function AuditReport() {
  const navigate = useNavigate()
  const reportRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return

    const element = reportRef.current
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = 10

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
    pdf.save('CT-Energy-Audit-Report-Sample.pdf')
  }

  return (
    <div className="audit-report-page">
      <div className="report-actions-bar">
        <button
          type="button"
          className="button button-secondary"
          onClick={() => navigate('/packages')}
        >
          ← Back to Packages
        </button>
        <button
          type="button"
          className="button button-success"
          onClick={handleDownloadPDF}
        >
          📥 Download PDF Report
        </button>
      </div>

      <div className="report-container" ref={reportRef}>
        <div className="report-header">
          <h1>Connecticut Residential Energy Audit Report</h1>
          <div className="report-badge">SAMPLE REPORT</div>
          <div className="report-meta">
            <div>Report Date: {new Date().toLocaleDateString()}</div>
            <div>Property: 123 Main Street, Hartford, CT 06101</div>
          </div>
        </div>

        <div className="report-section">
          <h2>Executive Summary</h2>
          <p>
            This sample energy audit report demonstrates potential energy efficiency improvements
            for a typical Connecticut residential property. The recommendations are based on
            standard efficiency measures and demonstrate the format and structure of a professional
            energy audit report.
          </p>
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-item-label">Total Annual Savings</div>
              <div className="summary-item-value">$1,380</div>
            </div>
            <div className="summary-item">
              <div className="summary-item-label">Energy Reduction</div>
              <div className="summary-item-value">6,900 kWh</div>
            </div>
            <div className="summary-item">
              <div className="summary-item-label">Available Incentives</div>
              <div className="summary-item-value">$1,575</div>
            </div>
            <div className="summary-item">
              <div className="summary-item-label">Est. Payback Period</div>
              <div className="summary-item-value">2.8 years</div>
            </div>
          </div>
        </div>

        <div className="report-section">
          <h2>Property Information</h2>
          <table className="info-table">
            <tbody>
              <tr>
                <td><strong>Address:</strong></td>
                <td>123 Main Street, Hartford, CT 06101</td>
              </tr>
              <tr>
                <td><strong>Property Type:</strong></td>
                <td>Single Family Residence</td>
              </tr>
              <tr>
                <td><strong>Square Footage:</strong></td>
                <td>2,000 sq ft</td>
              </tr>
              <tr>
                <td><strong>Year Built:</strong></td>
                <td>1985</td>
              </tr>
              <tr>
                <td><strong>Utility Provider:</strong></td>
                <td>Eversource Energy</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="report-section">
          <h2>Recommended Efficiency Measures</h2>
          <table className="measures-table">
            <thead>
              <tr>
                <th>Measure</th>
                <th>Annual kWh Savings</th>
                <th>Annual $ Savings</th>
                <th>Available Incentive</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LED Lighting Upgrade</td>
                <td>1,200</td>
                <td>$240</td>
                <td>$150</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Air Sealing</td>
                <td>1,800</td>
                <td>$360</td>
                <td>$500</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Smart Thermostat</td>
                <td>900</td>
                <td>$180</td>
                <td>$100</td>
                <td>Medium</td>
              </tr>
              <tr>
                <td>Heat Pump Water Heater</td>
                <td>2,400</td>
                <td>$480</td>
                <td>$750</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Low-Flow Water Fixtures</td>
                <td>600</td>
                <td>$120</td>
                <td>$75</td>
                <td>Low</td>
              </tr>
              <tr className="total-row">
                <td><strong>Total</strong></td>
                <td><strong>6,900</strong></td>
                <td><strong>$1,380</strong></td>
                <td><strong>$1,575</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="report-section">
          <h2>Methodology</h2>
          <p>
            <strong>Important:</strong> This is a sample report created for demonstration purposes.
            In a production environment, energy savings calculations would be based on:
          </p>
          <ul>
            <li>Detailed on-site assessment of existing conditions</li>
            <li>Review of 12 months of utility billing history</li>
            <li>Building characteristics and occupancy patterns</li>
            <li>Connecticut-specific climate data and utility rates</li>
            <li>Industry-standard calculation methodologies</li>
          </ul>
        </div>

        <div className="report-section">
          <h2>Assumptions</h2>
          <p>
            The following sample assumptions were used in this demonstration report:
          </p>
          <ul>
            <li>Average electricity rate: $0.20 per kWh</li>
            <li>Typical occupancy: 2-4 residents</li>
            <li>Standard usage patterns for a Connecticut residence</li>
            <li>Current incentive programs available through Connecticut utilities</li>
            <li>Professional installation by licensed contractors</li>
            <li>Measures installed according to manufacturer specifications</li>
          </ul>
          <p className="disclaimer">
            <strong>Disclaimer:</strong> All values in this report are estimated sample data for
            demonstration purposes only. Actual savings, costs, and incentives will vary based on
            specific property conditions, usage patterns, contractor pricing, and program
            availability at the time of implementation.
          </p>
        </div>

        <div className="report-section">
          <h2>Next Steps</h2>
          <ol>
            <li>Review recommended measures with property owner</li>
            <li>Obtain contractor quotes for selected improvements</li>
            <li>Apply for available utility incentive programs</li>
            <li>Schedule installation with qualified contractors</li>
            <li>Verify work completion and incentive documentation</li>
          </ol>
        </div>

        <div className="report-footer">
          <p>Connecticut Energy Audit Tool - Professional Mockup Report</p>
          <p>Generated: {new Date().toLocaleDateString()} | Report ID: SAMPLE-{Date.now()}</p>
        </div>
      </div>
    </div>
  )
}
