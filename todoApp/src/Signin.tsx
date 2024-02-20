import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate=useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", marginTop: "50px" }}>
        <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
        <p>New here ? </p>
        <Link to="/signup">
          <p>Signup </p>
        </Link>
        <button onClick={async()=>{
          const response=await axios.post("http://localhost:3001/users/login",{
            username,password
          });
          console.log(response.data);
          localStorage.setItem("todoToken",response.data.token);
          // window.location="/todos";
          navigate("/todos");
        }}>Login</button>
      </div>
    </div>
  );
}
export default Signin;
