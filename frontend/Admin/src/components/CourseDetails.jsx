// CourseDetail.js

import React,{useState,useEffect}  from 'react';
import styles from './CourseDetails.module.css';
import useAuth from "./AuthContext";
import { Link } from "react-router-dom";
const CourseDetails = () => {
  const [courses,setCourses] = useState([])
  const { isLoggedIn} = useAuth();

  const token = localStorage.getItem('admin_authtoken')
  console.log(token)

  useEffect(()=>{
    const getCourses= async()=>{
      try{
        const response = await fetch("http://localhost:3000/admin/courses",{
          method:"GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if(response.ok){
          const data = await response.json();
          setCourses(data.courses);
          console.log(courses)
        }
      }catch(error){
        console.error('Error during registration:', error);
      }
    };
    if(isLoggedIn){
      getCourses();
    }
    },[isLoggedIn,token])
   
  return (
    <div className={styles.courseDetail}>
      
      <div className={styles.imageContainer}>
        <img className={styles.image} src={courses.imageLink} alt="course" />
      </div>
      <div className={styles.detailsContainer}>
        <h1 className={styles.title}>Lorem ipsum dolor sit amet consectetur.</h1>
        <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, at.</p>
        <div className={styles.additionalDetails}>
          <p className={styles.instructor}>Instructor: Lorem, ipsum.</p>
          <p className={styles.duration}>Duration: 5 hours</p>
        </div>
        <p className={styles.price}>Price: $5555</p>
        <button className={styles.purchaseButton} >
          Edit Details
        </button>
      </div>

    </div>
  );
};

export default CourseDetails;
