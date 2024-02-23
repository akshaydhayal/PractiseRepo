import {Button, Typography} from "@mui/material";
import {useRecoilState} from "recoil";
import {userState} from "../../store/src/atoms/user";
import {useRouter} from "next/navigation";

export function Navbar(){
    const router=useRouter();
    const [user,setUser]=useRecoilState(userState);
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Coursera</Typography>
        {user.username === "" && (
          <div>
            <Button
              variant="contained"
              size="small"
              style={{ marginRight: "5px" }} onClick={()=>{
                router.push("/signup");
              }}
            >
              Signup
            </Button>
            <Button variant="contained" size="small" onClick={()=>{
                router.push("/signin");
            }} >
              Signin
            </Button>
          </div>
        )}
        {user.username != "" && (
          <div style={{display:"flex"}}>
            <Typography variant="h6">Hi {user.username}</Typography>
            <Button variant="contained" size="small" onClick={()=>{
                setUser({...user, username:""});
                localStorage.setItem("courseToken",null);
            }}>
              Signout
            </Button>
          </div>
        )}
      </div>
    );
}