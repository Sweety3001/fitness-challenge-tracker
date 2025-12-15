import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import ProfileSetup from "./pages/ProfileSetup";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import OAuthSuccess from "./pages/OAuthSuccess";
import HomeRedirect from "./routes/HomeRedirect";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* PUBLIC LANDING */}
          <Route path="/" element={<HomeRedirect />} />


<Route path="/oauth-success" element={<OAuthSuccess />} />

          {/* AUTH ROUTES */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
  path="/landing"
  element={
    <>
      <Navbar />
      <LandingPage />
      <Footer />
    </>
  }
/>

          <Route
  path="/profile-setup"
  element={
    <ProtectedRoute>
      <ProfileSetup />
    </ProtectedRoute>
  }
/>
         <Route
  path="/dashboard"
  element={
    <ProtectedRoute requireProfile>
      <Dashboard />
    </ProtectedRoute>
  }
/>



        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
