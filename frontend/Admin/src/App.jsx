import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import Navbar from './components/Navbar';
import {AuthProvider} from './components/AuthContext'
import CourseDetails from './components/CourseDetails';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <>
        <AuthProvider>
        <Router>
        <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<CreateCourse />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/createcourse" element={<CreateCourse value="create" />} />
                <Route path="/course/:id" element={<CreateCourse value="edit" />} />
                
                
            </Routes>
        </Router>
        </AuthProvider>
        </>
    );
}

export default App;