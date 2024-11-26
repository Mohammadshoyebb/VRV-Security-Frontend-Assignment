import React from "react";
import styled from "styled-components";
import { FaUsers, FaUserCog, FaUserLock } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

// Styled Components
const SidebarContainer = styled.div`
  height: 84.5vh;
  background-color: ${(props) => (props.$isDarkMode ? "#2d2d2d" : "#f4f4f4")};
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
`;

const Menu = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin-top: 20px;
`;

const MenuItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$isDarkMode ? "#444" : "#ddd")};
    color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  }

  & svg {
    margin-right: 10px;
    font-size: 20px;
  }
`;

function Sidebar() {
  const { isDarkMode } = useTheme();

  return (
    <SidebarContainer $isDarkMode={isDarkMode}>
      {/* Menu Section */}
      <Menu>
        <MenuItem $isDarkMode={isDarkMode}>
          <MdDashboard />
          Dashboard
        </MenuItem>
        <MenuItem $isDarkMode={isDarkMode}>
          <FaUsers />
          Users
        </MenuItem>
        <MenuItem $isDarkMode={isDarkMode}>
          <FaUserCog />
          Roles
        </MenuItem>
        <MenuItem $isDarkMode={isDarkMode}>
          <FaUserLock />
          Permissions
        </MenuItem>
      </Menu>
    </SidebarContainer>
  );
}

export default Sidebar;
