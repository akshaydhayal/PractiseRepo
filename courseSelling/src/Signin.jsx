import { TextField, Button, Typography, Card } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function Signin() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
  return (
    <div style={{ marginTop: "150px" }}>
      <Typography variant="h6" style={{display:"flex",justifyContent:"center"}}>
            Welcome back. Signin Below
        </Typography>
        <div style={{display:"flex",justifyContent:"center"}}>
        <Card
        variant="outlined"
        style={{ width: "400px", padding: "10px" }}
      >
        <TextField
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          style={{ marginTop: "20px" }}
          margin="normal"
          onChange={(e)=>{
            setUsername(e.target.value);
          }}
          />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          onChange={(e)=>{
            setPassword(e.target.value);
          }}
        />
        <Button variant="contained"   onClick={async()=>{
          const response=await axios.post("http://localhost:3002/admin/login",{
            username,password
          });
          console.log(response.data);
          localStorage.setItem("token",response.data.token);

          // fetch("http://localhost:3002/admin/login", {
          //     method: "POST",
          //     body: JSON.stringify({
          //       username,
          //       password,
          //     }),
          //     headers: {
          //       "Content-type": "application/json",
          //     },
          //   }).then((response) => {
          //     response.json().then((data) => {
          //       console.log(data);
          //       localStorage.setItem("token",data.token);
          //     });
          //   });
        }}>Signin</Button>
      </Card>
      </div>
    </div>
  );
}
export default Signin;
