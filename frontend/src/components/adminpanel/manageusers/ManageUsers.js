import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { IoSearchOutline} from "react-icons/io5"; 
import { IoMdAdd } from "react-icons/io";
import { RiToggleLine,RiToggleFill } from "react-icons/ri";
import { useTheme } from "../../context/ThemeContext";

// Importing components
import AddUserModal from "../manageusers/AddUser"; 
import Sidebar from "../../common/Sidebar";

// Importing images
import img1 from "../../../media/avatars/Avatar1.png";
import img2 from "../../../media/avatars/Avatar2.png";
import img3 from "../../../media/avatars/Avatar3.png";
import img4 from "../../../media/avatars/Avatar4.png";
import defaultImg from "../../../media/avatars/default.jpg";

// Styled Components
const ManageUsersContainer = styled.div`
  display: flex;
  height: 80vh;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
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
  background-color:#808b96;
  margin-bottom:1.5rem;
`;

const TopBar = styled.div`
  display: flex;
 justify-content:space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const  TopBarRight=styled.div`
display:flex;
align-items:center;
gap:15px;
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

const ActionButton = styled.button`
  background-color: #f0ad4e;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
   margin-top:2px;
  margin-right: 10px;
  &:hover {
    background-color: #e68a00;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  margin-top:2px;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const ActionIcon=styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content:space-between;
gap:5px;
font-size:15px;
`;

const EditIcon = styled(FaRegEdit)`
  font-size: 16px;
`;
const DeleteIcon=styled(MdOutlineDelete)`
  font-size: 16px;
`;
const AddIcon = styled(IoMdAdd)`
  font-size: 16px;
  margin-right: 6px; 
`;

const AddNewUserWrapper = styled.div`
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


const StatusToggleButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  gap: 10px;
  ${props => props.status && `
    color: ${props.status === "Active" ? "#28a745" : "#dc3545"};
  `}
`;


const ActiveIconContainer=styled.div`
font-size:20px;
color: #28a745;
`;
const InactiveIconContainer=styled.div`
font-size:20px;
color: #dc3545;
`;
const ErrorMessage = styled.div`
width:100%;
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #dc3545;
  background-color: #f8d7da;
  border-radius: 5px;
`;

const ManageUsers = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    { id: 1, username: "Aarav Sharma", email: "aravsharma@example.com", imageUrl: img1, status: "Active" },
    { id: 2, username: "Diya Verma", email: "diyaverma@example.com", imageUrl: img2, status: "Inactive" },
    { id: 3, username: "Ishaan Kumar", email: "ishaankumar@example.com", imageUrl: img3, status: "Active" },
    { id: 4, username: "Rohan Patel", email: "rohanpatel@example.com", imageUrl: img4, status: "Inactive" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) 
      ),
    [searchQuery, users]
  );

  const handleAddUser = (newUser) => {
    const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const userWithDefaultImage = {
      ...newUser,
      id: newUserId,
      imageUrl: defaultImg,
      status: "Active", 
    };
    setUsers((prevUsers) => [...prevUsers, userWithDefaultImage]);
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <ManageUsersContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContent $isDarkMode={isDarkMode}>
        <Header>Manage Users</Header>
        <Separator />
        <TopBar>
          <SectionHeading>User List</SectionHeading>
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
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
                  <AddNewUserWrapper>
        <AddIcon />
        Add New User
      </AddNewUserWrapper>

          </button></TopBarRight>
        </TopBar>
        
       
        {/* Show error message if no users match */}
        {filteredUsers.length === 0 && searchQuery !== "" && (
          <ErrorMessage>No users found matching "{searchQuery}"</ErrorMessage>
        )}

        {filteredUsers.length > 0 && (
          <TableContainer  $isDarkMode={isDarkMode}>
            
          <Table>
            <TableHead>
              <tr> 
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </TableHead>
            <TableBody $isDarkMode={isDarkMode}>
                

              {filteredUsers.map((user) => (
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
                  <StatusToggleButton $status={user.status} onClick={() => handleToggleStatus(user.id)}>

                      {user.status === "Active" ? (
                        <>
                         <ActiveIconContainer> <RiToggleFill /></ActiveIconContainer>
                          Active
                        </>
                      ) : (
                        <>
                          <InactiveIconContainer> <RiToggleLine /></InactiveIconContainer>
                          Inactive
                        </>
                      )}
                    </StatusToggleButton>
                  </td>
                  <td>
                    <ActionButton onClick={() => alert("Edit user")}> <ActionIcon>< EditIcon />Edit</ActionIcon></ActionButton>
                    <DeleteButton onClick={() => handleDeleteUser(user.id)}> <ActionIcon><DeleteIcon/> Delete</ActionIcon></DeleteButton>
                  </td>
                </tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddUser}
        />
      </MainContent>
    </ManageUsersContainer>
  );
};

export default ManageUsers;