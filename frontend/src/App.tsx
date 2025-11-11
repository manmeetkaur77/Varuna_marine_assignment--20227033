import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import RoutesTab from "./pages/RoutesTab";
import CompareTab from "./pages/CompareTab";
import BankingTab from "./pages/BankingTab";
import PoolingTab from "./pages/PoolingTab";

// ✅ Error Boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error("🔥 Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-600 mt-10 text-lg">
          ⚠️ Something went wrong. Check the console for details.
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  // ✅ Log unhandled errors globally
  useEffect(() => {
    window.addEventListener("error", (e) => {
      console.error("🧨 Global Error:", e.error || e.message);
    });
    window.addEventListener("unhandledrejection", (e) => {
      console.error("🚨 Unhandled Promise Rejection:", e.reason);
    });
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <nav className="flex justify-center gap-4 bg-blue-600 text-white p-4">
            <Link to="/routes" className="hover:underline">Routes</Link>
            <Link to="/compare" className="hover:underline">Compare</Link>
            <Link to="/banking" className="hover:underline">Banking</Link>
            <Link to="/pooling" className="hover:underline">Pooling</Link>
          </nav>

          <div className="p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/routes" replace />} />
              <Route path="/routes" element={<RoutesTab />} />
              <Route path="/compare" element={<CompareTab />} />
              <Route path="/banking" element={<BankingTab />} />
              <Route path="/pooling" element={<PoolingTab />} />
              <Route
                path="*"
                element={
                  <h2 className="text-center text-xl">
                    Welcome to Fuel-EU Dashboard 🚢
                  </h2>
                }
              />
            </Routes>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
