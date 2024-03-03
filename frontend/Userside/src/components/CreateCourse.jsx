import React, { useState,useEffect} from "react";
import styles from "./CreateCourse.module.css";
import useAuth from "./AuthContext";
import Landing from "./Landing";
import { useLocation, useParams } from "react-router-dom";
import Alert from "./Alert";
const CreateCourse = (props) => {
  const [status,setStatus] = useState('')
  useEffect(()=>{
    let timeoutId;
    if(status){
        timeoutId = setTimeout(() => {
            setStatus('')
        }, 4000);
    }
    return ()=>{
        clearTimeout(timeoutId)
    }

},[status])

  console.log(props.value);
  const {id }= useParams();
  const location = useLocation();
  const {course} =location.state || {};
  console.log("Location state:", location.state);
  
  const submitType= (props.value==="create")?true:false;//true will represent create and false will represent edit
  console.log(submitType);
  const token = localStorage.getItem('user_authtoken');
  const {isLoggedIn} = useAuth();
  const [formData, setFormData] = useState( (submitType)? {
    title: '',
    description: '',
    price: '',
    imageLink: '',
  }: {
    title: course.title,
    description: course.description,
    price:course.price,
    imageLink: course.imageLink,
  });

  const { title, description, price, imageLink } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const req_link = (submitType)?"http://localhost:3000/users/courses":`http://localhost:3000/users/courses/${id}`;
    const method= (submitType)?"POST":"PUT";
    try {
      const response = await fetch(req_link, {
        method:method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          price,
          imageLink,
          "published": true
        }),
      });

      if (response.ok) {
        console.log("Course created successfully");
        setFormData({
          title: '',
          description: '',
          price: '',
          imageLink: '',
        });
        (submitType)?setStatus('Course Created Successfully'):setStatus('Course Updated Successfully');
        
      } else {
        console.error("Failed to create course");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if(!isLoggedIn){
    return <Landing />
  }
  return (
    <div>
      {status && <Alert message={status} type="success" />}
    <div className={styles.createCoursesContainer}>
      <div className={styles.formContainer}>
       {submitType && <h1>Create course seamlessly</h1>}
       {!submitType && <h1>Edit course seamlessly</h1>}
        <form id="courseForm" onSubmit={handleSubmit}>
          <label htmlFor="COURSE_TITLE">Course Title *</label>
          <input
            type="text"
            id="COURSE_TITLE"
            name="title"
            required
            placeholder="Enter the title of your course"
            value={title}
            onChange={handleChange}
          />

          <label htmlFor="COURSE_DESCRIPTION">Course Description *</label>
          <textarea
            required
            id="COURSE_DESCRIPTION"
            name="description"
            placeholder="Enter a brief description of your course"
            value={description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="COURSE_PRICE">Course Price *</label>
          <input
            type="number"
            id="COURSE_PRICE"
            name="price"
            required
            placeholder="Enter the price of your course"
            value={price}
            onChange={handleChange}
          />

          <label htmlFor="IMAGE_LINK">Image Link *</label>
          <input
            type="url"
            id="IMAGE_LINK"
            name="imageLink"
            required
            placeholder="Enter the link to an image representing your course"
            value={imageLink}
            onChange={handleChange}
          />

          {submitType && <button type="submit">Create Course</button>}
          {!submitType &&<button type="submit">Edit Course</button>}
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateCourse;
