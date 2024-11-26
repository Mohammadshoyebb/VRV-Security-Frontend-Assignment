import React from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";

const FooterContainer = styled.footer`
  height: 5.8vh;
  padding:0.5rem;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#eaecee")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  border-top: 1px solid ${(props) => (props.$isDarkMode ? "#555" : "#ddd")};
  position: relative; 
  
`;

function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <FooterContainer $isDarkMode={isDarkMode}>
      Designed & Developed with <span style={{ color: "red" ,padding:'0.5rem'}}> &hearts; </span> by Janhvi Pandey
    </FooterContainer>
  );
}

export default Footer;
