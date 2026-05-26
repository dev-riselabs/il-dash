import { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { AuthGate } from "@/lib/auth/AuthGate";
import { SignUp } from "@/lib/auth/SignUp";
import { useAuth } from "@/lib/auth/store";
import { useRealtimeInvalidations } from "@/lib/realtime/useRealtime";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Lazy load all pages
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
const ProgrammeTracker = lazy(() => import("./pages/ProgrammeTracker"));
const CommandCenter = lazy(() => import("./pages/CommandCenter"));
const DealRoomTracker = lazy(() => import("./pages/DealRoomTracker"));
const SecuritySafety = lazy(() => import("./pages/SecuritySafety"));
const SessionQuotes = lazy(() => import("./pages/SessionQuotes"));
const Attendance = lazy(() => import("./pages/Attendance"));
const Speaker = lazy(() => import("./pages/Speaker"));
const Session = lazy(() => import("./pages/Session"));
const AdudienceFeedback = lazy(() => import("./pages/AudienceFeedback"));
const IntelligenceDashboard = lazy(() => import("./pages/IntelligenceDashboard"));
const DeepDive = lazy(() => import("./pages/DeepDive"));
const KeyInsight = lazy(() => import("./pages/KeyInsight"));
const Welcome = lazy(() => import("./pages/Welcome"));
const SignupAdminPage = lazy(() => import("./pages/SignupAdminPage"));
const UserManagementPage = lazy(() => import("./pages/UserManagementPage"));
const AttendeeFormIntegrated = lazy(() => import("./pages/AttendeeFormIntegrated"));
const SpeakerFormIntegrated = lazy(() => import("./pages/SpeakerFormIntegrated"));
const SessionFormIntegrated = lazy(() => import("./pages/SessionFormIntegrated"));
const FeedbackFormIntegrated = lazy(() => import("./pages/FeedbackFormIntegrated"));
const AttendanceManagementPage = lazy(() => import("./pages/AttendanceManagementPage"));
const DealRoom = lazy(() => import("./pages/DealRoom"));
const DealRoomForm = lazy(() => import("./pages/DealRoomForm"));
const About = lazy(() => import("./pages/About"));
const DemoForm = lazy(() => import("./pages/DemoForm"));
import { FormShell } from "./components/layout/FormShell";
import LandingShell from "./components/layout/LandingShell";

// Simple loading fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
    </div>
  );
}



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
    <Routes>
      {/* Public Routes - No Authentication Required */}
      <Route element={<AppShell><Outlet /></AppShell>}>
        <Route path="/investlagos" element={<Suspense fallback={<PageLoader />}><Overview /></Suspense>} />
        <Route path="/programme" element={<Suspense fallback={<PageLoader />}><ProgrammeTracker /></Suspense>} />
        <Route path="/insights" element={<Suspense fallback={<PageLoader />}><SessionInsight /></Suspense>} />
        <Route path="/deals" element={<Suspense fallback={<PageLoader />}><DealRoomTracker /></Suspense>} />
        <Route path="/heatmap" element={<Suspense fallback={<PageLoader />}><InvestmentHeatmap /></Suspense>} />
        <Route path="/resolutions" element={<Suspense fallback={<PageLoader />}><ResolutionBoard /></Suspense>} />
        <Route path="/analytics" element={<Suspense fallback={<PageLoader />}><ParticipationAnalytics /></Suspense>} />
        <Route path="/feedback" element={<Suspense fallback={<PageLoader />}><SentimentFeedback /></Suspense>} />
        <Route path="/social" element={<Suspense fallback={<PageLoader />}><SocialmediaFeed /></Suspense>} />
        <Route path="/alerts" element={<Suspense fallback={<PageLoader />}><AlertsUpdates /></Suspense>} />
        <Route path="/security" element={<Suspense fallback={<PageLoader />}><SecuritySafety /></Suspense>} />
        <Route path="/reports" element={<Suspense fallback={<PageLoader />}><Reports /></Suspense>} />
        <Route path="/global" element={<Suspense fallback={<PageLoader />}><GlobalInvesorMap /></Suspense>} />
        <Route path="/next-action-tracker" element={<Suspense fallback={<PageLoader />}><NextActionTracker /></Suspense>} />
        <Route path="/executive-view" element={<Suspense fallback={<PageLoader />}><ExecutiveView /></Suspense>} />
        <Route path="/command-center" element={<Suspense fallback={<PageLoader />}><CommandCenter /></Suspense>} />
        <Route path="/session-quotes" element={<Suspense fallback={<PageLoader />}><SessionQuotes /></Suspense>} />
        <Route path="/attendance-management" element={<Suspense fallback={<PageLoader />}><AttendanceManagementPage /></Suspense>} />
        <Route path="/intelligence-dashboard" element={<Suspense fallback={<PageLoader />}><IntelligenceDashboard /></Suspense>} />
        <Route path="/deep-dive" element={<Suspense fallback={<PageLoader />}><DeepDive /></Suspense>} />
        <Route path="/key-insight" element={<Suspense fallback={<PageLoader />}><KeyInsight /></Suspense>} />
      </Route>

      {/* Public Auth Pages - Separate Signup and Signin */}
      <Route path="/signup" element={<Suspense fallback={<PageLoader />}><SignUp /></Suspense>} />
      <Route path="/signin" element={<Suspense fallback={<PageLoader />}><AuthGate><AuthedShell /></AuthGate></Suspense>} />

      {/* Admin-Only Routes - Requires Authentication */}
      <Route element={<AuthGate><AuthedShell /></AuthGate>}>
        <Route path="/session" element={<Suspense fallback={<PageLoader />}><Session /></Suspense>} />
        <Route path="/speaker" element={<Suspense fallback={<PageLoader />}><Speaker /></Suspense>} />
        <Route path="/audience-feedback" element={<Suspense fallback={<PageLoader />}><AdudienceFeedback /></Suspense>} />
        <Route path="/attendance" element={<Suspense fallback={<PageLoader />}><Attendance /></Suspense>} />
        <Route path="/deal-room" element={<Suspense fallback={<PageLoader />}><DealRoom /></Suspense>} />
        <Route
          path="/user-management"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute requiredRoles={["super_admin", "admin", "operator"]}>
                <UserManagementPage />
              </ProtectedRoute>
            </Suspense>
          }
        />
      </Route>

      {/* Form Routes */}
      <Route element={<FormShellLayout />}>
        <Route path="/feedback-form" element={<Suspense fallback={<PageLoader />}><FeedbackFormIntegrated /></Suspense>} />
        <Route path="/session-form" element={<Suspense fallback={<PageLoader />}><SessionFormIntegrated /></Suspense>} />
        <Route path="/speaker-form" element={<Suspense fallback={<PageLoader />}><SpeakerFormIntegrated /></Suspense>} />
        <Route path="/attendee-form" element={<Suspense fallback={<PageLoader />}><AttendeeFormIntegrated /></Suspense>} />
        <Route path="/deal-room-form" element={<Suspense fallback={<PageLoader />}><DealRoomForm /></Suspense>} />
        <Route
          path="/signup-admin"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute requiredRoles={["super_admin"]}>
                <SignupAdminPage />
              </ProtectedRoute>
            </Suspense>
          }
        />
      </Route>
      <Route element={<LandingShellLayout />}>
        <Route path="/" element={<Suspense fallback={<PageLoader />}><Welcome /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
        <Route path="/demo-form" element={<Suspense fallback={<PageLoader />}><DemoForm /></Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
