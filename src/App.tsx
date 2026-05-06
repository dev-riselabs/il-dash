import { Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import Overview from '@/pages/Overview'
import Placeholder from '@/pages/Placeholder'
import InvestmentHeatmap from './pages/InvestmentHeatmap'
import ResolutionBoard from './pages/ResolutionBoard'
import ParticipationAnalytics from './pages/ParticipationAnalytics'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route
          path="/programme"
          element={
            <Placeholder
              title="Programme Tracker"
              description="Live programme schedule, current/next sessions, and speaker rotation."
            />
          }
        />
        <Route
          path="/insights"
          element={
            <Placeholder
              title="AI Session Insights"
              description="Real-time AI-generated summaries, key insights, and featured quotes."
            />
          }
        />
        <Route
          path="/deals"
          element={
            <Placeholder
              title="Deal Room Tracker"
              description="Track active investment deals, MoUs, and partnership announcements."
            />
          }
        />
        <Route
          path="/heatmap"
          element={
            <InvestmentHeatmap/>
          }
        />
        <Route
          path="/resolutions"
          element={
            <ResolutionBoard
            />
          }
        />
        <Route
          path="/analytics"
          element={
            <ParticipationAnalytics/>
          }
        />
        <Route
          path="/feedback"
          element={
            <Placeholder
              title="Sentiment & Feedback"
              description="Aggregated participant sentiment from QR feedback and live polls."
            />
          }
        />
        <Route
          path="/social"
          element={
            <Placeholder
              title="Social Media Feed"
              description="Live social media stream filtered by summit hashtags and mentions."
            />
          }
        />
        <Route
          path="/alerts"
          element={
            <Placeholder
              title="Alerts & Updates"
              description="System alerts, schedule changes, and broadcast updates."
            />
          }
        />
        <Route
          path="/security"
          element={
            <Placeholder
              title="Security Intelligence"
              description="Safety status, incident reports, and venue security monitoring."
            />
          }
        />
        <Route
          path="/reports"
          element={
            <Placeholder
              title="Reports"
              description="End-of-day intelligence reports and post-summit exports."
            />
          }
        />
      </Routes>
    </AppShell>
  )
}

export default App
