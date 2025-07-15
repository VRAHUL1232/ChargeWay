import Homepage from "./pages/Homepage";
import Contact from "./pages/Contact";
import { Route, Router, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import MapboxComponent from "./components/MapComponent";
import { UserLocationProvider } from "./context/userLocation";
import { StationLocationProvider } from "./context/stationLocation";
import Booking from "./pages/Booking";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<AuthPage isLogin={true} />} />
      <Route path="/register" element={<AuthPage isLogin={false} />} />
      <Route path="/booking/:id" element={<Booking/>} />
      <Route
        path="/adminpanel"
        element={
          <ProtectedRoute isAllowed={["Admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAllowed={["User"]}>
            <UserLocationProvider>
              <StationLocationProvider>
                <Dashboard />
              </StationLocationProvider>
            </UserLocationProvider>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
export default App;
