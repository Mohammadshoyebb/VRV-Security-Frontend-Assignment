import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";


// Import Theme Context
import { ThemeProvider } from "./components/context/ThemeContext";


function App() {
  return (
    <ThemeProvider>
      <div style={{ width: "100%" }}>
        <Router>
          {/* Navbar */}
          <Navbar />
          <Sidebar/>
         
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
