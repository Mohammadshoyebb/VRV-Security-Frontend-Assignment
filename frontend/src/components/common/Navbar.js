import React from "react";
import styled from "styled-components";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

// Styled Components
const NavbarContainer = styled.div`
  display: flex;
  height: 7vh;
  width: auto;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${(props) => (props.isDarkMode ? "#333" : "#eaecee")};
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.div`
  font-size: 22px;
  font-weight: bold;
  font-family: Calibri;
  color:#2e86c1;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 19px;
  color: inherit;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: inherit;
`;

const AuthButton = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: ${(props) => (props.isDarkMode ? "#000" : "#fff")};
  background-color: ${(props) => (props.isDarkMode ? "#fff" : "#333")};
`;

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme(); 
  console.log(isDarkMode);
  const handleAuthClick = () => {
    alert("Redirecting to Sign In/Sign Up page...");
    // Add your logic for routing to Sign In/Sign Up page here
  };

  return (
    <NavbarContainer isDarkMode={isDarkMode}>
      <Heading>VRV Security</Heading>
      <ButtonContainer>
        {/* Toggle Mode */}
        <ToggleButton onClick={toggleDarkMode}>
          {isDarkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        </ToggleButton>

        {/* Notification Button */}
        <IconButton>
          <FaRegBell />
        </IconButton>

        {/* Auth Button */}
        <AuthButton isDarkMode={isDarkMode} onClick={handleAuthClick}>
          SignIn 
        </AuthButton>
        <AuthButton isDarkMode={isDarkMode} onClick={handleAuthClick}>
          SignUp 
        </AuthButton>
      </ButtonContainer>
    </NavbarContainer>
  );
}

export default Navbar;
