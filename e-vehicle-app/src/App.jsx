import Homepage from "./pages/Homepage";
import Contact from "./pages/Contact";
import { Route, Router, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import UnAuthorisedPage from "./pages/UnAuthorisedPage";
import PageNotFound from "./pages/PageNotFound";
import NetworkError from "./pages/NetworkError";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<AuthPage isLogin={true} />} />
      <Route path="/register" element={<AuthPage isLogin={false} />} />
      <Route path="/adminpanel" element={<ProtectedRoute isAllowed={['Admin']} ><AdminPanel /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute isAllowed={['User', 'Admin']} ><Dashboard /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute isAllowed={['User', 'Admin']}><Contact /></ProtectedRoute>} />
      <Route path="/unauthorised" element={<UnAuthorisedPage />} />
      <Route path="network-error" element={<NetworkError/>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
export default App;
