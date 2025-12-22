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
import EditProfile from "./pages/EditProfile";
import AddChallenge from "./pages/AddChallenge";
import ChallengeDetails from "./pages/ChallengeDetails";

// Import ToastContainer and CSS for toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* 🌟 LANDING PAGE (DEFAULT) */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <LandingPage />
                <Footer />
              </>
            }
          />

          {/* 🔐 AUTH */}
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

          {/* 🔁 GOOGLE OAUTH */}
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          {/* 👤 PROFILE SETUP */}
          <Route
            path="/profile-setup"
            element={
              <ProtectedRoute>
                <ProfileSetup />
              </ProtectedRoute>
            }
          />

          {/* 📊 DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireProfile>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 🎯 ADD CHALLENGE (ONLY ONCE) */}
          <Route
            path="/add-challenge"
            element={
              <ProtectedRoute requireProfile>
                <AddChallenge />
              </ProtectedRoute>
            }
          />
           <Route
  path="/challenge/:id"
  element={
    <ProtectedRoute>
      <ChallengeDetails />
    </ProtectedRoute>
  }
/>
<Route path="/challenges" element={<AddChallenge />} />
 <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <EditProfile />
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
      {/* ToastContainer with default configuration */}
      <ToastContainer />
    </Router>
  );
}

export default App;