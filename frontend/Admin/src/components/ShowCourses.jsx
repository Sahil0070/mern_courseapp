// ShowCourses.jsx
import React, { useEffect, useState } from "react";
import Landing from './Landing';
import useAuth from "./AuthContext";
import styles from './ShowCourses.module.css';
import { Link } from "react-router-dom";

function ShowCourses() {
  const [courses, setCourses] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const token = localStorage.getItem('admin_authtoken');

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/courses", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCourses(data.courses);
        } else if (response.status === 403) {
          localStorage.removeItem('admin_authtoken');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error during registration:', error);
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
    return <div>
      <h1>No Courses Available !!!</h1>
    </div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.courseCardContainer}>
        {courses.map((course) => {
          return (
            <div className={styles.card} key={course.id}>
              <img src={course.imageLink} alt="Course Image" className={styles.cardImage} />
              <div className={styles.cardContent}>
                <div className={styles.courseTitle}>{course.title}</div>
                <div className={styles.courseDescription}>{course.description}</div>
                <div className={styles.price}>&#8377; {course.price}</div>
                <Link
                  to={`/course/${course.id}`}
                  state={{ course }}
                  className={styles.button}
                >
                  Edit Now
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowCourses;
