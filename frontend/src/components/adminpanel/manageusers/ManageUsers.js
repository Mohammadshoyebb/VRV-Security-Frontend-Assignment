import React, { useState } from "react";
import AddUserModal from "../manageusers/AddUser";

function ManageUsers() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Add User</button>
      <AddUserModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default ManageUsers;
