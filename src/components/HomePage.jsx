import React,{useState, useEffect} from "react";
import Navbar from "./Navbar";
import UserDetails from "./UserDetails";
import styles from '../styles/HomePage.module.css';
import Stocks from "./Stocks";
import Calculator from "./Calculator";
import Weather from "./Weather";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Login from "./Login";
import Register from "./Register";


const HomePage = () => {
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
    <div>
            {user ? (
 
    <div className={styles.container}>
      
      <div className={styles.card}>
        <UserDetails currentUser={user.email} />
      </div>
      <div className={styles.card}>
        <Stocks />
      </div>
      <div className={styles.card}>
        <Calculator />
      </div>
      <div className={styles.card}>
        <Weather />
      </div>
    </div>
  ) :  showRegisterPage ? (
      <Register setShowRegisterPage={setShowRegisterPage} />
    ) : (
      <Login setShowRegisterPage={setShowRegisterPage} />
    )}
    </div>
    
  );
};

export default HomePage;
