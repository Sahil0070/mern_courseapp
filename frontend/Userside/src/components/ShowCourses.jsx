import React, { useEffect, useState } from "react";
import Landing from './Landing';
import useAuth from "./AuthContext";
import styles from './ShowCourses.module.css';
import { Link } from "react-router-dom";
import Alert from "./Alert";

function ShowCourses() {
  const [alert,setAlert] = useState('')
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const token = localStorage.getItem('user_authtoken');
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
    const getCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/courses", {
          method: "GET",
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
          setCourses(data.courses);
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
      getCourses();
    }
  }, [isLoggedIn, token]);

  if (!isLoggedIn) {
    return <Landing />;
  }

  if (courses.length === 0 && isLoggedIn) {
    return (
      <div className={styles.main} >
        <h1>No Courses Available !!!</h1>
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
        setPurchasedCourses(prevPurchasedCourses => [...prevPurchasedCourses, {id}]);
        setAlert("Course Purchased Successfully");
      }
      // Add more logic based on the response, if needed
    } catch (error) {
      console.error('Error during course purchase:', error);
   
    }
  };

 
  return (
    <div className={styles.main}>
      <div className={styles.courseCardContainer}>
     {alert && <Alert type={"success"} message={alert } />} 
        
        {courses.map((course) => {
       
          const courseIdAsString = String(course.id);
          return (
            <div className={styles.card} key={course.id}>
                {purchasedCourses.some(purchasedCourse => String(purchasedCourse.id) === String(course.id))  &&  ( <span className= {styles.purchased}>Already Purchased!!</span> )  }
                
                
              <img src={course.imageLink} alt="Course Image" className={styles.cardImage} />
              <div className={styles.cardContent}>
                <div className={styles.courseTitle}>{course.title}</div>
                <div className={styles.courseDescription}>{course.description}</div>
                <div className={styles.price}>&#8377; {course.price}</div>
                {!purchasedCourses.some(purchasedCourse => String(purchasedCourse.id) === String(course.id)) && (
                            <Link
                              to={`/course/${course.id}`}
                              state={{ course }}
                              className={styles.button}
                            >
                              View Details
                            </Link>
                     
                      )}
               
                {purchasedCourses.some(purchasedCourse => String(purchasedCourse.id) === String(course.id)) ? (
                       <Link  to={`/course/${course.id}?purchased=true`} className={styles.button} >Start Learning!</Link>
                      ) : (
                        <button
                          className={styles.button}
                          onClick={() => handlePurchaseCourse(course.id)}
                        >
                          Purchase Now
                        </button>
                      )}


              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowCourses;
