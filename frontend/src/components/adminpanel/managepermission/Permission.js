import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";


import AddPermissionModal from "../managepermission/AddPermission"; 

// Importing images for user avatars
import img1 from "../../../media/avatars/Avatar1.png";
import img2 from "../../../media/avatars/Avatar2.png";
import img3 from "../../../media/avatars/Avatar3.png";
import img4 from "../../../media/avatars/Avatar4.png";
import img5 from "../../../media/avatars/Avatar5.png";
import Sidebar from "../../common/Sidebar";

// Styled Components
const ManagePermissionsContainer = styled.div`
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
    props.$isDarkMode
      ? "#000"
      : "#fff"};
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

const AddNewPermissionWrapper = styled.div`
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

const Permission = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    { id: 1, username: "Aarav Sharma", email: "aravsharma@example.com", imageUrl: img1, role: "Admin" },
    { id: 2, username: "Diya Verma", email: "diyaverma@example.com", imageUrl: img2, role: "User" },
    { id: 3, username: "Ishaan Kumar", email: "ishaankumar@example.com", imageUrl: img3, role: "User" },
    { id: 4, username: "Rohan Patel", email: "rohanpatel@example.com", imageUrl: img4, role: "Moderator" },
    { id: 5, username: "Rishi Singh", email: "rishi@example.com", imageUrl: img5, role: "Admin" },
  ]);

  const [permissions, setPermissions] = useState([
    { id: 1, permission: "Read" },
    { id: 2, permission: "Write" },
    { id: 3, permission: "Delete" },
  ]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    isEditMode: false,
    permissionToEdit: null,
  });

  // Filter users based on search query
  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, users]
  );

  const handlePermissionChange = (userId, permission, checked) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              permissions: checked
                ? [...(user.permissions || []), permission]
                : user.permissions.filter((p) => p !== permission),
            }
          : user
      )
    );
  };

  const handleAddPermission = (newPermission) => {
    setPermissions((prevPermissions) => [...prevPermissions, newPermission]);
    setModalState({ isOpen: false, isEditMode: false, permissionToEdit: null });
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <ManagePermissionsContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContent $isDarkMode={isDarkMode}>
        <Header>Manage Permissions</Header>
        <Separator />
        <TopBar>
          <SectionHeading>Users & Permissions List </SectionHeading>
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
              <AddNewPermissionWrapper>
                <IoMdAdd style={{ fontSize: "16px", marginRight: "6px" }} />
                Add New Permission
              </AddNewPermissionWrapper>
            </button>
          </TopBarRight>
        </TopBar>

        {filteredUsers.length === 0 ? (
          <ErrorMessage>No users found</ErrorMessage>
        ) : (
          <TableContainer $isDarkMode={isDarkMode}>
            <Table>
              <TableHead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Permissions</th>
                  <th>Actions</th>
                </tr>
              </TableHead>
              <TableBody $isDarkMode={isDarkMode}>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <AvatarUsernameWrapper>
                        <Avatar src={user.imageUrl} />
                        <div>{user.username}</div>
                      </AvatarUsernameWrapper>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      {permissions.map((permission) => (
                        <div key={permission.id}>
                          <input
                            type="checkbox"
                            checked={user.permissions?.includes(permission.permission)}
                            onChange={(e) =>
                              handlePermissionChange(user.id, permission.permission, e.target.checked)
                            }
                          />
                          {permission.permission}
                        </div>
                      ))}
                    </td>
                    <td>
                      <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                        <MdOutlineDelete/>
                        Delete
                      </DeleteButton>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* AddPermission modal */}
        {modalState.isOpen && (
          <AddPermissionModal
            isOpen={modalState.isOpen}
            onClose={() => setModalState({ ...modalState, isOpen: false })}
            onAddPermission={handleAddPermission}
          />
        )}
      </MainContent>
    </ManagePermissionsContainer>
  );
};

export default Permission;
