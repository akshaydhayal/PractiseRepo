import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { userContext } from "./App.jsx";

// function useLoginStatus() {
//   const [isLoading, setIsloading] = useState(true);
//   const [username, setUsername] = useState("");
//   useEffect(() => {
//     fetch("http://localhost:3002/admin/me", {
//       method: "GET",
//       headers: {
//         token: localStorage.getItem("token"),
//       },
//     }).then((response) => {
//       response.json().then((data) => {
//         setUsername(data.username);
//         setIsloading(false);
//         console.log(data);
//       });
//     });
//   }, []);
  
//   return { username, setUsername, isLoading };
// }
function Navbar() {
// function Navbar({username, setUsername,isLoading}) {
  const {username,setUsername,isLoading}=useContext(userContext);
  console.log("username"+username);
  const navigate = useNavigate();
  // let { username, setUsername, isLoading } = useLoginStatus();
  if (isLoading) {
    return <div>loading..</div>;
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6" onClick={()=>navigate("/")}>Coursera</Typography>

      {username === "" && (
        <div>
          <Button
            variant="contained"
            style={{ marginRight: "5px" }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Signin
          </Button>
        </div>
      )}
      {username != "" && (
        <div style={{ display: "flex" }}>
          <Typography variant="h6" style={{ marginRight: "3px" }}>
            Hi {username}
          </Typography>

          <Button variant="outlined" onClick={()=>navigate("/addcourse")}>ADD COURSE</Button>
          <Button variant="outlined" onClick={()=>navigate("/courses")}>COURSES</Button>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.setItem("token", null);
              setUsername("");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
export default Navbar;
