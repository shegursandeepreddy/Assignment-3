import React from "react";

const UserCard = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>User Profile</h3>
      <p>
        <b>Full Name:</b> {user.firstName} {user.lastName}
      </p>
      <p>
        <b>Date of Birth:</b> {user.dob}
      </p>
      <p>
        <b>Gender:</b> {user.gender}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>Phone Number:</b> {user.phoneNumber}
      </p>
      <button onClick={() => onEdit(user)}>Edit</button>
    </div>
  );
};

export default UserCard;
