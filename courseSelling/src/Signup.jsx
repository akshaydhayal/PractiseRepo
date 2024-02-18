import {TextField, Button, Typography,Card} from "@mui/material";
import { useContext, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { userContext } from "./App";
import { useSetRecoilState } from "recoil";
import {userState} from "./store/user.js";

function Signup(){
  const setUser=useSetRecoilState(userState);
  // const {setUsername}=useContext(userContext);

  const navigate=useNavigate();
  const [username,setUsernamee]=useState("");
    const [password,setPassword]=useState("");
    return (
      <div style={{marginTop:"150px"}}>
        <Typography variant="h6" style={{display:"flex",justifyContent:"center"}}>
            Welcome to Coursera Signup Below
        </Typography>
        <div style={{display:"flex",justifyContent:"center"}}>
          <Card variant="outlined" style={{width:"400px",padding:"10px"}}>
          <TextField
            label="Username"
            variant="outlined"
            size="small"
            fullWidth
            style={{marginTop:"20px"}}
            margin="normal"
            onChange={(e)=>{
              setUsernamee(e.target.value);
            }}
            />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
            />
          <Button variant="contained" onClick={async()=>{
            console.log("hello");
            const response=await axios.post("http://localhost:3002/admin/signup",{
              username,password
            },{headers:{
              'Content-Type':"application/json"}
            });
            console.log(response.data);
            setUser({username,isLoading:false});
            localStorage.setItem("token",response.data.token);
            navigate("/courses");
            // fetch("http://localhost:3002/admin/signup",{
            //   method:"POST",
            //   body:JSON.stringify({
            //     username,password
            //   }),headers:{
            //     'Content-type':"application/json"
            //   }
            // }).then((response)=>{
            //   response.json().then((data)=>{
            //     console.log(data);
            //     localStorage.setItem("token",data.token);
            //   })
            // });
          }}>Signup</Button>
            </Card>
          </div>
      </div>
    );
}
export default Signup;