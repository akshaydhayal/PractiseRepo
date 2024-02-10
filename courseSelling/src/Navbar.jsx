import { Typography, Button } from "@mui/material";
import {useNavigate} from "react-router-dom";
import { useState } from "react";

function useLoginStatus(){
  const [userLoggedin,setUserLoggedin]=useState(false);
  const [username,setUsername]=useState("");
  fetch("http://localhost:3002/admin/me",{
    method:"GET",headers:{
      "token":localStorage.getItem("token")
    }
  }).then((response)=>{
    response.json().then((data)=>{
      console.log(data);
      setUsername(data.username);
    })
  })
  return username;
}
function Navbar() {
    const navigate=useNavigate();
    let username=useLoginStatus();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6">Coursera</Typography>

      {username === "" && (
        <div>
          <Button
            variant="contained"
            style={{ marginRight: "5px" }}
            onClick={() => {
              // window.location="/signup"
              navigate("/signup");
            }}
          >
            Signup
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // window.location="/signin"
              navigate("/signin");
            }}
          >
            Signin
          </Button>
        </div>
      )}
      {username != "" && (
        <div>
          <Typography variant="h6">Hi {username}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signout");
            }}
          >Logout</Button>
        </div>
      )}
    </div>
  );
}
export default Navbar;
