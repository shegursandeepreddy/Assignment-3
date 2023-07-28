import React, { useState } from "react";
import "../styles/Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

function Register({ setShowRegisterPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 7) {
      setError("Password should be at least 7 characters");
      return;
    }
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      alert("Registration successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="app-name">React-Firebase App</h1>
      <form className="register-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Show Password
        </label>
        <button onClick={handleRegister}>Register</button>
        <button onClick={() => setShowRegisterPage(false)}>
          Back to Login
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default Register;
