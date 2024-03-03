// Navbar.jsx
import React from "react";
import { Link,useNavigate } from 'react-router-dom'; // If you are using React Router
import useAuth from "./AuthContext";
import styles from './Navbar.module.css';

function Navbar() {
  const navigate = useNavigate();
  const {isLoggedIn,setIsLoggedIn,logout} = useAuth();
  const handleLogout=()=>{
    console.log("logout")
    logout();
    setIsLoggedIn(false);
    navigate('/')
  }
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        
        <li className={styles.navTitle}>
          <Link to="/" className={styles.navHeader}>Skills++</Link>
        </li>
       {!isLoggedIn && <li className={styles.navItem}>
          <Link to="/register" className={styles.navLink}>Register</Link>
        </li>}
        {!isLoggedIn && <li className={styles.navItem}>
          <Link to="/login" className={styles.navLink}>Login</Link>
        </li>}
        {isLoggedIn && <li className={styles.navItem}>
          <Link  className={styles.navLink} to="/courses" >Courses</Link>
        </li>}
        {isLoggedIn && <li className={styles.navItem}>
          <Link  className={styles.logout_button} to="/createcourse" >Create Courses</Link>
        </li>}
        {isLoggedIn && <li className={styles.navItem}>
          <button  className={styles.logout_button} onClick={handleLogout}>Log Out</button>
        </li>}
        </ul>
      
    </nav>
  );
}

export default Navbar;
