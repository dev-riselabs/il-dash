import { Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import Overview from "@/pages/Overview";
import InvestmentHeatmap from "./pages/InvestmentHeatmap";
import ResolutionBoard from "./pages/ResolutionBoard";
import ParticipationAnalytics from "./pages/ParticipationAnalytics";
import SentimentFeedback from "./pages/SentimentFeedback";
import SocialmediaFeed from "./pages/SocialmediaFeed";
import AlertsUpdates from "./pages/AlertsUpdates";
import SessionInsight from "./pages/SessionInsight";
import Reports from "./pages/Reports";
import NextActionTracker from "./pages/NextActionTracker";
import GlobalInvesorMap from "./pages/GlobalInvesorMap";
import ExecutiveView from "./pages/ExecutiveView";
import CommandCenter from "./pages/CommandCenter";
import ProgrammeTracker from "./pages/ProgrammeTracker";
import DealRoomTracker from "./pages/DealRoomTracker";
import SecuritySafety from "./pages/SecuritySafety";

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/programme" element={<ProgrammeTracker />} />
        <Route path="/insights" element={<SessionInsight />} />
        <Route path="/deals" element={<DealRoomTracker />} />
        <Route path="/heatmap" element={<InvestmentHeatmap />} />
        <Route path="/resolutions" element={<ResolutionBoard />} />
        <Route path="/analytics" element={<ParticipationAnalytics />} />
        <Route path="/feedback" element={<SentimentFeedback />} />
        <Route path="/social" element={<SocialmediaFeed />} />
        <Route path="/alerts" element={<AlertsUpdates />} />
        <Route path="/security" element={<SecuritySafety />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/global" element={<GlobalInvesorMap />} />
        <Route path="/next-action-tracker" element={<NextActionTracker />} />
        <Route path="/executive-view" element={<ExecutiveView />} />
        <Route path="/command-center" element={<CommandCenter />} />
      </Routes>
    </AppShell>
  );
}

export default App;
