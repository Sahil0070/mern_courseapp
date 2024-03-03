import React,{useEffect, useState} from 'react'
import styles from './Register_Login.module.css'
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import useAuth from './AuthContext';


export default function Form(props) {
	  const navigate=useNavigate();
    const {login,setIsLoggedIn} = useAuth();
    const submitType= (props.submitType==="register")?true:false;//true will represent register and false will represent login
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [error,setError] = useState('');

    useEffect(()=>{
        let timeoutId;
        if(error){
            timeoutId = setTimeout(() => {
                setError('')
            }, 4000);
        }
        return ()=>{
            clearTimeout(timeoutId)
        }

    },[error])


    const handleSubmit=async(event)=>{
        event.preventDefault();
        if (!email.trim() ) {
            setError("Email Cannot Be Blank!!");
            return;
          }
        if(!password.trim() || password.length<8)
        {
            setError('Password should be greater than 8characters');
            return ;
        }

        try {
            // Send registration request
            const req_type = (submitType)?"signup":"login";
            const response = await fetch(`http://localhost:3000/admin/${req_type}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: email,
                password: password,
              }),
            });
      
            if (response.ok) {
              const data = await response.json();
              // Handle success, e.g., store the token
              // console.log('Registration successful');
              // console.log('Token: ' + data.token);
              // localStorage.setItem('admin_token',JSON.stringify(data.token));
              login(data.token);
              navigate('/courses');
              
            } else {
              // Handle registration failure
            //   console.error('Registration failed');
            const data = await response.json();
            if(response.status===403){
                setError(data.message);

            }else{
                setError("Registratoin Failed");
            }
              
            }
          } catch (error) {
            console.error('Error during registration:', error);
            setError("Some Error Occurred please try agian!")
            
          }
      
    }
    return (
		<div className={styles.main}>

            {error && <Alert message={error} type="error" />}

        <div className={styles.container1}>
	<div className={styles.screen}>
		<div className={styles.screen__content}>

			<form className={styles.login} onSubmit={handleSubmit}>
			{submitType && <h2 className={styles.form_header}>Register Page</h2>}
			{!submitType && <h2 className={styles.form_header}>Login Page</h2>}
				<div className={styles.login__field}>
					<i className="login__icon fas fa-user"></i>
					<input type="Email" className={styles.login__input} placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
				</div>
				<div className={styles.login__field}>
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className={styles.login__input} placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
				</div>
				<button type="submit"  className={`${styles.button} ${styles.login__submit}`} >
					{submitType && <span className={styles.button__text}>Register</span>}
					{!submitType && <span className={styles.button__text}>Login</span>}
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div  className={styles.social_login}>
				<h3>log in via</h3>
				<div  className={styles.social_icons}>
					
					<a href="#" className={`${styles.social_login__icon} fab fa-instagram`}></a>
					<a href="#" className={`${styles.social_login__icon} fab fa-facebook`}></a>
					<a href="#"  className={`${styles.social_login__icon} fab fa-twitter`}></a>
				</div>
			</div>
		</div>
		<div className={styles.screen__background}>
			<span  className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}></span>
			<span className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}></span>		
			<span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}></span>
			<span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}></span>
		</div>		
	</div>
</div>
</div>
    )
}
