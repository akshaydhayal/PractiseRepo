import { useState,useEffect,useContext ,createContext} from 'react'
import './App.css'
import Signup from './Signup'
import Navbar from './Navbar.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signin from './Signin.jsx';
import Addcourse from './Addcourse';
import Courses from './Courses.jsx';
import Course from './Course.jsx';
import Landing from "./Landing.jsx";
import {RecoilRoot, useSetRecoilState} from "recoil";
import { userState } from './store/user.js';

function useLoginStatus() {
  const setUser=useSetRecoilState(userState);
  // const [isLoading, setIsloading] = useState(true);
  // const [username, setUsername] = useState("");
  useEffect(() => {
    fetch("http://localhost:3002/admin/me", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        if(data.username){
          // setUsername(data.username);
          setUser({username:data.username,isLoading:false})
        }else{
          setUser({username:"",isLoading:false});
        }
        // setIsloading(false);
      });
    });
  }, []);

  // return { username, setUsername, isLoading };
}

export const userContext=createContext();

function App() {
  useLoginStatus();
  // let { username, setUsername, isLoading } = useLoginStatus();


  return (
    <div style={{ backgroundColor: "grey", width: "100vw", height: "100vh" }}>
    {/* <RecoilRoot> */}
      {/* <userContext.Provider value={{username,setUsername,isLoading}}> */}
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/addcourse" element={<Addcourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<Course />} />
        </Routes>
      </Router>
      {/* </userContext.Provider> */}
    {/* </RecoilRoot> */}
    </div>
  );
}

export default App
