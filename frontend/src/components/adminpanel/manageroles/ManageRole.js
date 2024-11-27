import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "../../common/Sidebar";
import AddRoleModal from "../manageroles/AddRole"; // Assuming you have this modal component

// Importing images for user avatars
import img1 from "../../../media/avatars/Avatar1.png";
import img2 from "../../../media/avatars/Avatar2.png";
import img3 from "../../../media/avatars/Avatar3.png";
import img4 from "../../../media/avatars/Avatar4.png";
import img5 from "../../../media/avatars/Avatar5.png";
import img6 from "../../../media/avatars/Avatar6.png";
import img7 from "../../../media/avatars/Avatar7.jpg";
import img8 from "../../../media/avatars/Avatar8.png";
import img9 from "../../../media/avatars/Avatar9.png";
import img10 from "../../../media/avatars/Avatar10.png";

// Styled Components
const ManageRolesContainer = styled.div`
  display: flex;
  height: 80vh;
  margin-bottom: 1rem;
`;

const SidebarContainer = styled.div`
  width: 14vw;
  height: 100%;
`;

const MainContent = styled.div`
  width: 86vw;
  height: 100%;
  padding: 20px;
  background-color: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "#f9f9f9")};
  font-family: "Arial", sans-serif;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
`;

const Header = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 0px;
`;

const Separator = styled.hr`
  border: none;
  height: 2px;
  background-color: #808b96;
  margin-bottom: 1.5rem;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SectionHeading = styled.h2`
  font-size: 20px;
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid ${(props) => (props.$isDarkMode ? "#fff" : "#ddd")};
  border-radius: 5px;
  background-color: ${(props) =>
    props.$isDarkMode ? "#000" : "#fff"};
  padding: 5px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input {
    border: none;
    outline: none;
    color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
    background-color: ${(props) => (props.$isDarkMode ? "#000" : "#fff")};
    font-size: 16px;
    margin-left: 10px;
    flex: 1;
  }
`;

const TableContainer = styled.div`
  margin-top: 20px;
  padding-bottom: 10px;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const TableHead = styled.thead`
  background-color: #2e86c1;
  color: #fff;

  th {
    padding: 12px 10px;
    text-align: left;
    font-size: 16px;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: ${(props) => (props.$isDarkMode ? "#444" : "#f9f9f9")};
  }

  td {
    padding: 10px 10px;
    color: ${(props) => (props.$isDarkMode ? "#ccc" : "#333")};
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const AvatarUsernameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  margin-top: 2px;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const AddNewRoleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    padding: 1px;
  }
`;

const ErrorMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #dc3545;
  background-color: #f8d7da;
  border-radius: 5px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 15px;
  background-color: #2e86c1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #1e6e99;
  }
`;

const ManageRoles = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    { id: 1, username: "Aarav Sharma", email: "aravsharma@example.com", imageUrl: img1, role: "Admin" },
    { id: 2, username: "Diya Verma", email: "diyaverma@example.com", imageUrl: img2, role: "User" },
    { id: 3, username: "Ishaan Kumar", email: "ishaankumar@example.com", imageUrl: img3, role: "User" },
    { id: 4, username: "Rohan Patel", email: "rohanpatel@example.com", imageUrl: img4, role: "Moderator" },
    { id: 5, username: "Rishi Singh", email: "rishi@example.com", imageUrl: img5, role: "Admin" },
    {
      id: 6,
      username: "Vishal Singh",
      email: "vishal.singh@example.com",
      role: "Moderator",
      
      imageUrl: img6,
    },
    {
      id: 7,
      username: "Anant Rao",
      email: "anantrao@example.com",
      role: "Manager",
      imageUrl: img7,
    },
    {
      id: 8,
      username: "Sanya Mehta",
      email: "sanyamehta@example.com",
      role: "Admin",
      imageUrl: img8,
    },
    {
      id: 9,
      username: "Priya Nair",
      email: "priyanair@example.com",
      role: "User",
      imageUrl: img9,
    },
    {
      id: 10,
      username: "Kabir Joshi",
      email: "kabirjoshi@example.com",
      role: "Admin",
      imageUrl: img10,
    },
  ]);

  const [roles, setRoles] = useState([
    { id: 1, roleName: "Admin" },
    { id: 2, roleName: "User" },
    { id: 3, roleName: "Moderator" }
  ]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    isEditMode: false,
    userToEdit: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, users]
  );

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleAddRole = (newRole) => {
    setRoles((prevRoles) => [...prevRoles, newRole]);
    setModalState({ isOpen: false, isEditMode: false, userToEdit: null });
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <ManageRolesContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContent $isDarkMode={isDarkMode}>
        <Header>Manage Roles</Header>
        <Separator />
        <TopBar>
          <SectionHeading>Users & Roles List</SectionHeading>
          <TopBarRight>
            <SearchContainer $isDarkMode={isDarkMode}>
              <IoSearchOutline />
              <input
                type="text"
                placeholder="Search User..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
            <button
              onClick={() => setModalState({ isOpen: true, isEditMode: false })}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <AddNewRoleWrapper>
                <IoMdAdd style={{ fontSize: "16px", marginRight: "6px" }} />
                Add New Role
              </AddNewRoleWrapper>
            </button>
          </TopBarRight>
        </TopBar>

        {filteredUsers.length === 0 && searchQuery !== "" ? (
          <ErrorMessage>No users found matching "{searchQuery}"</ErrorMessage>
        ) : (
          <TableContainer $isDarkMode={isDarkMode}>
            <Table>
              <TableHead>
                <tr>
                  <th>Id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </TableHead>
              <TableBody $isDarkMode={isDarkMode}>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <AvatarUsernameWrapper>
                        <Avatar src={user.imageUrl} alt="avatar" />
                        {user.username}
                      </AvatarUsernameWrapper>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.roleName}>
                            {role.roleName}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                        <MdOutlineDelete /> Delete
                      </DeleteButton>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <PaginationWrapper>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </PageButton>
          ))}
        </PaginationWrapper>

        {modalState.isOpen && !modalState.isEditMode && (
          <AddRoleModal
            isOpen={modalState.isOpen}
            onClose={() => setModalState({ ...modalState, isOpen: false })}
            onSave={handleAddRole}
          />
        )}
      </MainContent>
    </ManageRolesContainer>
  );
};

export default ManageRoles;
