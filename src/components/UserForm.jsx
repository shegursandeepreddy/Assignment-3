import React, { useState, useEffect, useCallback } from "react";
 import '../styles/UserDetails.css';
const UserForm = ({ formValues, errors, handleChange, handleSubmit }) => {
  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <form onSubmit={handleSubmit}>
      <div className="user-form">
        <h3>Profile Details</h3>
            <input
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              type="date"
              name="dob"
              value={formValues.dob}
              onChange={handleChange}
              max={maxDate}
              placeholder="Date of Birth"
            />
            <select
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="Prefer not to respond.">
                Prefer not to respond.
              </option>
            </select>

            <input
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="email"
              disabled
            />
            <input
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleChange}
              placeholder="phoneNumber"
            />
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default UserForm;
