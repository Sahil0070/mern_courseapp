import React, { useEffect, useState } from "react";
import Landing from './Landing';
import useAuth from "./AuthContext";
import styles from './ShowPurchasedCourses.module.css';
import { Link } from "react-router-dom";

function ShowPurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const token = localStorage.getItem('user_authtoken');

  useEffect(() => {
    const getPurchasedCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/purchasedCourses", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPurchasedCourses(data.purchasedCourses);

        } else if (response.status === 403) {
          localStorage.removeItem('user_authtoken');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    };

    if (isLoggedIn) {
      getPurchasedCourses();
    }
  }, [isLoggedIn, token]);

  if (!isLoggedIn) {
    return <Landing />;
  }

  if (purchasedCourses.length === 0 && isLoggedIn) {
    return <div>
      <h1>No Courses Available !!!</h1>
    </div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.courseList}>
        {purchasedCourses.map((course) => (
          <div className={styles.courseCard} key={course.id}>
            <img src={course.imageLink} alt="Course Image" className={styles.cardImage} />
            <div className={styles.cardContent}>
              <div className={styles.courseTitle}>{course.title}</div>
              <div className={styles.courseDescription}>{course.description}</div>
              {/* <div className={styles.price}>&#8377; {course.price}</div> */}
              
              <Link
                to={`/course/${course.id}?purchased=true`}
                state={{ course }}
                className={styles.button}
              >
                Start Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowPurchasedCourses;
