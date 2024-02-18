import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { userContext } from "./App.jsx";
import { useSetRecoilState,useRecoilState } from "recoil";
import { userState } from "./store/user.js";

function Navbar() {
  // const {username,setUsername,isLoading}=useContext(userContext);
  const [user,setUser]=useRecoilState(userState);

  console.log("username"+user.username);
  const navigate = useNavigate();
  if (user.isLoading) {
    return <div>loading..</div>;
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6" onClick={()=>navigate("/")}>Coursera</Typography>

      {user.username === "" && (
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
      {user.username != "" && (
        <div style={{ display: "flex" }}>
          <Typography variant="h6" style={{ marginRight: "3px" }}>
            Hi {user.username}
          </Typography>

          <Button variant="outlined" onClick={()=>navigate("/addcourse")}>ADD COURSE</Button>
          <Button variant="outlined" onClick={()=>navigate("/courses")}>COURSES</Button>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.setItem("token", null);
              setUser({...user,username:""})
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
