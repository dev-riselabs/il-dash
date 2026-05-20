import type { ReactNode } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { AuthGate } from "@/lib/auth/AuthGate";
import { useAuth } from "@/lib/auth/store";
import { useRealtimeInvalidations } from "@/lib/realtime/useRealtime";
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
import ProgrammeTracker from "./pages/ProgrammeTracker";
import CommandCenter from "./pages/CommandCenter";
import DealRoomTracker from "./pages/DealRoomTracker";
import SecuritySafety from "./pages/SecuritySafety";
import SessionQuotes from "./pages/SessionQuotes";
import Attendance from "./pages/Attendance";
import Speaker from "./pages/Speaker";
import Session from "./pages/Session";
import AdudienceFeedback from "./pages/AudienceFeedback";
import IntelligenceDashboard from "./pages/IntelligenceDashboard";
import DeepDive from "./pages/DeepDive";
import KeyInsight from "./pages/KeyInsight";
import FeedbackForm from "./pages/FeedbackForm";
import { FormShell } from "./components/layout/FormShell";
import SessionForm from "./pages/SessionForm";
import SpeakerForm from "./pages/SpeakerForm";
import AttendeeForm from "./pages/AttendeeForm";
import LandingShell from "./components/layout/LandingShell";
import Welcome from "./pages/Welcome";
import About from "./pages/About";


function AuthedShell() {
  const authed = useAuth((s) => !!s.user);
  useRealtimeInvalidations(authed);

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

function FormShellLayout() {
  return (
    <FormShell>
      <Outlet />
    </FormShell>
  );
}

function LandingShellLayout() {
  return (
    <LandingShell>
      <Outlet />
    </LandingShell>
  );
}

function App() {
  return (
    <Routes> {/* Protected Routes */}
      <Route element={
          <AuthGate>
            <AuthedShell />
          </AuthGate>
        } >
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
        <Route path="/session-quotes" element={<SessionQuotes />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/speaker" element={<Speaker />} />
        <Route path="/session" element={<Session />} />
        <Route path="/audience-feedback" element={<AdudienceFeedback />} />
        <Route path="/intelligence-dashboard" element={<IntelligenceDashboard />} />
        <Route path="/deep-dive" element={<DeepDive />} />
        <Route path="/key-insight" element={<KeyInsight />} />
      </Route>

      {/* Form Routes */}
      <Route element={<FormShellLayout />}>
        <Route path="/feedback-form" element={<FeedbackForm />} />
        <Route path="/session-form" element={<SessionForm />} />
        <Route path="/speaker-form" element={<SpeakerForm />} />
        <Route path="/attendee-form" element={<AttendeeForm />} />
      </Route>
    </Routes>
  );
}

export default App;