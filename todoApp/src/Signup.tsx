import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate=useNavigate();
  const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
        <p>Already Signed up ?</p>
        <p>
          <Link to="/signin">Login</Link>
        </p>
        <button onClick={async()=>{
            const response=await axios.post("http://localhost:3001/users/signup",{
                username,password}
            );
            console.log(response.data);
            localStorage.setItem("todoToken",response.data.token);
            // window.location="/todos";
            navigate("/todos");
        }}>Signup</button>
      </div>
    </div>
  );
}
export default Signup;
