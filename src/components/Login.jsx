
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import "../styles/Login.css";

function Login({ setShowRegisterPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password.length < 7) {
      setError("Password should be at least 7 characters");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        setError("No account exits with the provided email. please register.");
      } else {
        setError(error.message);
      }
    }
    setLoading(false);
  };
  return (
    <div className="wrapper">
      <h1 className="app-name">React-Firebase App</h1>
      <form className="login-form">
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
        {/* <div>Show Password</div> */}
        <label className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Show Password
        </label>
        <button onClick={handleLogin}>
          {loading ? "Loading..." : "Login"}
        </button>
        <button onClick={() => setShowRegisterPage(true)}>New User</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
