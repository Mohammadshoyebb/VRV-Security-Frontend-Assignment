import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import common components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

//Import Admin control components
import Dashboard from "./components/adminpanel/Dashboard";
import ManageUsers from "./components/adminpanel/manageusers/ManageUsers";
import ManageRole from "./components/adminpanel/manageroles/ManageRole";
// import ManagePermission from "./components/adminpanel/managepermission/ManagePermission";

// Import Theme Context
import { ThemeProvider } from "./components/context/ThemeContext";
import Permission from "./components/adminpanel/managepermission/Permission";
// import ManagePermission from "./components/adminpanel/managepermission/ManagePermission";

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
              {/* AdminControl Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/manageuser" element={<ManageUsers/>}/>
              <Route path="/managerole" element={<ManageRole/>}/>
              <Route path="/managepermission" element={<Permission/>}/>

              
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
