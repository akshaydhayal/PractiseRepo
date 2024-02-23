import { Button, TextField, Card, Typography } from "@mui/material";
import { useState } from "react";

export function Signup(props:{
    onClick:(username:string, password:string)=>void
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          marginTop: "120px",
        }}
      >
        <Typography variant="h5">Welcome to Coursera</Typography>
        <TextField
          variant="outlined"
          placeholder="enter username"
          size="small"
          margin="normal"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          placeholder="enter password"
          size="small"
          margin="normal"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="contained" onClick={()=>{
            props.onClick(username,password);
        }}>Submit</Button>
      </div>
    </div>
  );
}
