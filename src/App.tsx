// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthWrapper from "./hooks/AuthWrapper";

function App() {
  return (
    <Router>
      <AuthWrapper>
        <Routes>
          {/* Define routes as normal */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          {/* Default route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthWrapper>
    </Router>
  );
}

export default App;
