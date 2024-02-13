import {TextField, Button, Typography,Card} from "@mui/material";
import { useState } from "react";
import axios from "axios";

function Signup(){
    const [username,setUsername]=useState("");
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
              setUsername(e.target.value);
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
            console.log(response);
            console.log(response.data);
            localStorage.setItem("token",response.data.token);

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