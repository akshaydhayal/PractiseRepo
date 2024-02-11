import { Typography, Button } from "@mui/material";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";

function useLoginStatus(){
  const [isLoading,setIsloading ]=useState(true);
  const [username,setUsername]=useState("");
  useEffect(()=>{
    fetch("http://localhost:3002/admin/me", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((response) => {
      response.json().then((data) => {
        setUsername(data.username);
        setIsloading(false);
        console.log(data);
      });
});
  },[]);
  // fetch("http://localhost:3002/admin/me",{
  //   method:"GET",headers:{
  //     "token":localStorage.getItem("token")
  //   }
  // }).then((response)=>{
  //   response.json().then((data)=>{
  //     setUsername(data.username);
  //     setIsloading(false);
  //     console.log(data);
  //   })
  // });
  return {username,isLoading};
}
function Navbar() {
    const navigate=useNavigate();
    let {username,isLoading}=useLoginStatus();
  if(isLoading){
    console.log("loading,please wait!")
    return<div>loading..</div>
  }
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
              localStorage.setItem("token",null);
              navigate("/signout");
            }}
          >Logout</Button>
        </div>
      )}
    </div>
  );
}
export default Navbar;
