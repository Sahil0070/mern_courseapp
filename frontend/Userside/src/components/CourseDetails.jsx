// CourseDetails.js

import React, { useState, useEffect } from 'react';
import styles from './CourseDetails.module.css';
import useAuth from './AuthContext';
import Landing from './Landing';
import { useParams } from 'react-router-dom';
import Alert from './Alert';
const CourseDetails = () => {
  const [course, setCourse] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [alert,setAlert] = useState('');
  const { isLoggedIn,setIsLoggedIn } = useAuth();
  const { id } = useParams();
  const token = localStorage.getItem('user_authtoken');

  // const queryParameters = new URLSearchParams(window.location.search)
  // const purchased  = queryParameters.get('purchased');
  // console.log(purchased);
  useEffect(()=>{
    let timeoutId;
    if(alert){
        timeoutId = setTimeout(() => {
            setAlert('');
        }, 4000);
    }
    return ()=>{
        clearTimeout(timeoutId)
    }

},[alert])
  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/course/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const response2 = await fetch("http://localhost:3000/users/purchasedCourses", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok && response2.ok) {
          const data = await response.json();
          const data2 = await response2.json();
          setCourse(data.course);
          setPurchasedCourses(data2.purchasedCourses);
        } else if (response.status === 403) {
          localStorage.removeItem('user_authtoken');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error during fetching data:', error);
        // Add more detailed error handling here
      }
    };
    if (isLoggedIn) {
      getCourse();
    }
  }, [isLoggedIn, token, id]);

  if (!isLoggedIn) {
    return <Landing />;
  }

  if (course.length === 0 && isLoggedIn) {
    return (
      <div className={styles.wrapper}>
        <h1>No Course Found !!!</h1>
      </div>
    );
  }
   const handlePurchaseCourse = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/users/courses/${id}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if(response.ok){
        setPurchasedCourses(prevPurchasedCourses => [...prevPurchasedCourses, course]);
        console.log(purchasedCourses);
        setAlert("Course Purchased Successfully");
      }
      // Add more logic based on the response, if needed
    } catch (error) {
      console.error('Error during course purchase:', error);
   
    }
  };
  return (
    <>
    {console.log(purchasedCourses)}
      {alert && <Alert type={"success"} message={alert } />} 
    <div className={styles.wrapper}>
      <div className={styles.courseDetail}>

        <div className={styles.imageContainer}>
          <img className={styles.image} src={course.imageLink} alt="course" />
        </div>
        <div className={styles.detailsContainer}>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.description}> <span className={styles.desc_span}>Course Description:</span> {course.description}</p>
          <div className={styles.additionalDetails}>
            <p className={styles.instructor}>Instructor: Course Instructor</p>
            <p className={styles.duration}>Duration: 5 hours</p>
          </div>
          <p className={styles.price}>Price:&#8377; {course.price}</p>
          
         
          {purchasedCourses.some(purchasedCourse => String(purchasedCourse.id) === String(course.id)) ? (
                  <button className={styles.purchaseButton}>Watch Videos !!</button>
                      ) : (
<button className={styles.purchaseButton} onClick={()=>handlePurchaseCourse(id)}>Purchase Course</button>
                      )}

        </div>
      </div>
    </div>
    </>
  );
};

export default CourseDetails;
