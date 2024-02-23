import axios from "axios";
import {Signup} from "ui";

export default function signinPage(){
    return(
        <div>
            <Signup onClick={async(username,password)=>{
                const response=await axios.post("/api/signin",{
                    username,password
                });
                console.log(response.data);
                if(response.data.token){
                    localStorage.setItem("courseToken",response.data.token);
                }
            }}/>
        </div>
    )
}