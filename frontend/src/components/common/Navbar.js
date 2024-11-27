import React, { useState } from "react";
import styled from "styled-components";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import SignInModal from "../authentication/SignIn"; 

// Styled Components
const NavbarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isDarkMode",
})`
  display: flex;
  height: 7vh;
  width: auto;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#eaecee")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.div`
  font-size: 22px;
  font-weight: bold;
  font-family: Calibri;
  color: #2e86c1;
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
  color: ${(props) => (props.$isDarkMode ? "#000" : "#fff")};
  background-color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
`;

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showSignInModal, setShowSignInModal] = useState(false);

  // Function to open the SignInModal
  const openSignInModal = () => setShowSignInModal(true);

  // Function to close the SignInModal
  const closeSignInModal = () => setShowSignInModal(false);

  return (
    <>
      {/* Navbar Component */}
      <NavbarContainer $isDarkMode={isDarkMode}>
        <Heading>VRV Security</Heading>
        <ButtonContainer>

          {/* Toggle Mode */}
          <ToggleButton onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
            {isDarkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </ToggleButton>

          {/* Notification Button */}
          <IconButton aria-label="Notifications">
            <FaRegBell />
          </IconButton>

          {/* Auth Buttons */}
          <AuthButton
            $isDarkMode={isDarkMode}
            onClick={openSignInModal}
          >
            SignIn
          </AuthButton>
          <AuthButton $isDarkMode={isDarkMode}>
            SignUp
          </AuthButton>
        </ButtonContainer>
      </NavbarContainer>

      {/* SignInModal Component */}
      <SignInModal
        show={showSignInModal} 
        closeSignInModal={closeSignInModal} 
      />
    </>
  );
}

export default Navbar;
