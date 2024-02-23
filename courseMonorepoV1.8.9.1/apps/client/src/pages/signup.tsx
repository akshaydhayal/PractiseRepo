import { Signup } from "ui";

export default function SignupPage() {
  return (
    <div>
      <Signup onClick={async(username, password) => {
          // alert(`username : ${username} , password : ${password}`);
          const response=await fetch("http://localhost:3000/api/signup",{
            method:"POST",
            body:JSON.stringify({username,password}),
            headers:{
              "Content-Type":"application/json"
            }
          });
          const data=await response.json();
          localStorage.setItem("courseToken",data.token);
          console.log(data);
        }}
      />
    </div>
  );
}
