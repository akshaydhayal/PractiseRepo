import { useState } from 'react'
import './App.css'
import Signup from './Signup'
import Navbar from './Navbar.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signin from './Signin.jsx';
import Addcourse from './Addcourse';
import Courses from './Courses.jsx';
import Course from './Course.jsx';

function App() {
  return (
      <div style={{backgroundColor:"grey",width:"100vw",height:"100vh"}}>
        <Router>
        <Navbar/>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path="/addcourse" element={<Addcourse/>}/>
            <Route path='/courses' element={<Courses/>}/>
            <Route path='/courses/:courseId' element={<Course/>}/>
          </Routes>
        </Router>

      </div>
  )
}

export default App
