import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Todo from "./components/Todo";
import './App.css'
import WeatherPage from "./components/WeatherPage";
import Navbar from "./components/Navbar";
import Stocks from "./components/StocksPage";

function App() {
  const [user, setUser] = useState(null);
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowRegisterPage(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar user={user} logout={handleLogout} />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/stocks" element={<Stocks />} />
      </Routes>
    </Router>
  );
}

export default App;
