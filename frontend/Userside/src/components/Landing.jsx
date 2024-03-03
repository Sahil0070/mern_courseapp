import React from "react";
import styles from './Landing.module.css'
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import useAuth from "./AuthContext";
import ShowCourses from './ShowCourses'
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const {isLoggedIn} = useAuth();
    if(isLoggedIn){
       return <ShowCourses /> 
    }
    return (
        <>
    <div className={styles.landing_container}>
        <div className={styles.landing_content}>
    <h1>Welcome to Skills++</h1>
    <p>Master Your Skills Today!</p>
    
    <Link to="/register" className={`${styles.btn} ${styles.btn_signup}`}>Sign Up</Link>
    <Link to="/login" className={`${styles.btn} ${styles.btn_login}`}>Log In</Link>
    </div>
</div>
</>
    )
    // return <div >
    //     <h1>Welcome to course selling website!</h1>
    //     <a href="/register">Register</a>
    //     <br/>
    //     <a href="/login">Login</a>
    // </div>
}

export default Landing;