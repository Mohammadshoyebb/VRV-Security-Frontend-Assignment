import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import common components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

//Import Admin control components
import Dashboard from "./components/adminpanel/Dashboard";

// Import Theme Context
import { ThemeProvider } from "./components/context/ThemeContext";


function App() {
  return (
    <ThemeProvider>
      <div style={{ width: "100%" }}>
        <Router>
          {/* Navbar */}
          <Navbar />

          {/* Main content container */}
          <div className="container">
            <Routes>
              {/* Dashboard (Home) Route */}
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>

          {/* Footer Section */}
          <Footer/>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
