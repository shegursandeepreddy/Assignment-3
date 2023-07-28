import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ user, logout }) => {
  const [isNavVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  return (
    <nav className="navbar">
      {user &&
      <div className="navbar-top">
        <div className="navbar-title">React-Firebase App</div>
        {
          !isNavVisible && 
          <div className="navbar-items">
            <Link className='nav-item' to="/">Home</Link>
            <Link className="nav-item" to="/weather">Weather</Link>
            <Link className="nav-item" to="/todo">Todo</Link>
            <Link className="nav-item" to="/stocks">Stocks</Link>
              <div className="nav-item">{user.email}</div>
            <button className="" onClick={logout}>
                Sign out
              </button>
          </div>
        }
         <div onClick={toggleNav} className="navbar-hamburger">&#9776;</div>
     
     
      {isNavVisible && 
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/weather">Weather</Link>
          <Link to="/todo">Todo</Link>
          <Link to="/stocks">Stocks</Link>
          <div className="navbar-user">
            {user.email}
            <button className="navbar-logout" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
      }
       </div>
      }
    </nav>
  );
};

export default Navbar;
