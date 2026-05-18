import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import LandDetail from "./pages/LandDetail";
import Transfer from "./pages/Transfer";
import Particles from "./components/Particles";
import AnimatedBg from "./components/AnimatedBg";

function App() {
  return (
    <Router>
      <div className="App grid-bg" style={{ minHeight: "100vh", position: "relative" }}>
        <AnimatedBg />
        <Particles />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/land/:id" element={<LandDetail />} />
            <Route path="/transfer" element={<Transfer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
