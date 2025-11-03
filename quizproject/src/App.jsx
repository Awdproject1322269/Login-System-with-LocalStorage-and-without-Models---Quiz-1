import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import QuizCreation from "./components/QuizCreation";
import TeacherControl from "./components/TeacherControl";
import Report from "./components/Report";
import Settings from "./components/Settings";
import Contact from "./components/Contact";
import About from "./components/About";
import NotFound from "./components/NotFound";

// ✅ SCROLL TO TOP COMPONENT
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// ✅ AUTO LOGOUT HOOK
function useAutoLogout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("loginTime");
    setIsLoggedIn(false);
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const loginTime = localStorage.getItem("loginTime");
    
    if (user && loginTime) {
      setIsLoggedIn(true);
      
      // ✅ 30 minutes timeout (aap change kar sakte hain)
      const timeoutDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
      const elapsedTime = Date.now() - parseInt(loginTime);
      const remainingTime = timeoutDuration - elapsedTime;

      if (remainingTime <= 0) {
        // Time already expired
        logout();
      } else {
        // Set timeout for remaining time
        const timer = setTimeout(logout, remainingTime);
        return () => clearTimeout(timer);
      }
    }
  }, [logout]);

  return { isLoggedIn, logout };
}

// ✅ PROTECTED ROUTE COMPONENT
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAutoLogout();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const loginTime = localStorage.getItem("loginTime");
    
    if (user && loginTime) {
      // Check if session expired
      const elapsedTime = Date.now() - parseInt(loginTime);
      const timeoutDuration = 30 * 60 * 1000; // 30 minutes
      
      if (elapsedTime > timeoutDuration) {
        // Session expired
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("loginTime");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  // ✅ Initialize auto logout
  useAutoLogout();

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route path="/quizcreation" element={<QuizCreation />} />
            <Route path="/teachercontrol" element={<TeacherControl />} />
            <Route path="/report" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;