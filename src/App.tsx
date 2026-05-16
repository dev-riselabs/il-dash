import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import Placeholder from "@/pages/Placeholder";

const Overview = lazy(() => import("@/pages/Overview"));
const InvestmentHeatmap = lazy(() => import("./pages/InvestmentHeatmap"));
const ResolutionBoard = lazy(() => import("./pages/ResolutionBoard"));
const ParticipationAnalytics = lazy(() => import("./pages/ParticipationAnalytics"));
const SentimentFeedback = lazy(() => import("./pages/SentimentFeedback"));
const SocialmediaFeed = lazy(() => import("./pages/SocialmediaFeed"));
const AlertsUpdates = lazy(() => import("./pages/AlertsUpdates"));
const SessionInsight = lazy(() => import("./pages/SessionInsight"));
const Reports = lazy(() => import("./pages/Reports"));
const NextActionTracker = lazy(() => import("./pages/NextActionTracker"));
const GlobalInvesorMap = lazy(() => import("./pages/GlobalInvesorMap"));
const ExecutiveView = lazy(() => import("./pages/ExecutiveView"));
const CommandCenter = lazy(() => import("./pages/CommandCenter"));

function RouteFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[40vh] text-white/60 text-sm font-dmSans">
      Loading…
    </div>
  );
}

function App() {
  return (
    <AppShell>
      <Suspense fallback={<RouteFallback />}>
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
          <Route path="/insights" element={<SessionInsight />} />
          <Route
            path="/deals"
            element={
              <Placeholder
                title="Deal Room Tracker"
                description="Track active investment deals, MoUs, and partnership announcements."
              />
            }
          />
          <Route path="/heatmap" element={<InvestmentHeatmap />} />
          <Route path="/resolutions" element={<ResolutionBoard />} />
          <Route path="/analytics" element={<ParticipationAnalytics />} />
          <Route path="/feedback" element={<SentimentFeedback />} />
          <Route path="/social" element={<SocialmediaFeed />} />
          <Route path="/alerts" element={<AlertsUpdates />} />
          <Route
            path="/security"
            element={
              <Placeholder
                title="Security Intelligence"
                description="Safety status, incident reports, and venue security monitoring."
              />
            }
          />
          <Route path="/reports" element={<Reports />} />
          <Route path="/global" element={<GlobalInvesorMap />} />
          <Route path="/next-action-tracker" element={<NextActionTracker />} />
          <Route path="/executive-view" element={<ExecutiveView />} />
          <Route path="/command-center" element={<CommandCenter />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}

export default App;
