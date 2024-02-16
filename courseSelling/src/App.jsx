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

function useLoginStatus() {
  const [isLoading, setIsloading] = useState(true);
  const [username, setUsername] = useState("");
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
          setUsername(data.username);
        }
        setIsloading(false);
      });
    });
  }, []);

  return { username, setUsername, isLoading };
}

export const userContext=createContext();

function App() {
  let { username, setUsername, isLoading } = useLoginStatus();

  console.log("username in app: " + username);
  console.log("isLoadin in app: " + isLoading);
  return (
    <div style={{ backgroundColor: "grey", width: "100vw", height: "100vh" }}>
      <userContext.Provider value={{username,setUsername,isLoading}}>

      {/* <Router>
        <Navbar
          username={username}
          setUsername={setUsername}
          isLoading={isLoading}
          />
        <Routes>
          <Route path="/" element={<Landing username={username}/>} />
          <Route path="/signup" element={<Signup setUsername={setUsername}/>} />
          <Route path="/signin" element={<Signin setUsername={setUsername}/>} />
          <Route path="/addcourse" element={<Addcourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<Course />} />
        </Routes>
      </Router> */}
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
    </userContext.Provider>
    </div>
  );
}

export default App
