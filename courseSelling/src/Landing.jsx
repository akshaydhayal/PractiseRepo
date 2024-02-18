import {Typography,Button,Grid} from "@mui/material";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";
import { userContext } from "./App";
import { useRecoilValue } from "recoil";
import { userState } from "./store/user.js";

function Landing(){
    // const {username}=useContext(userContext);
    const user=useRecoilValue(userState);
    const navigate=useNavigate();
    return (
      <div
        style={{
          marginTop: "50px",
          marginLeft: "50px",
          marginRight: "0px",
          display: "flex",
        }}
      >
        <Grid container>
          <Grid item xs={5}>
            <div style={{marginLeft:"10px",marginTop:"60px" }}>
              <Typography variant="h3">Coursera Admin</Typography>
              <Typography variant="h7">A place to learn, earn and grow</Typography>
              {
                user.username=="" && <div style={{ marginTop: "25px" }}>
                <Button variant="contained" style={{ marginRight: "15px" }} onClick={()=>{
                    navigate("/signup");
                }}>SIGNUP</Button>
                <Button variant="contained" onClick={()=>{
                    navigate("/signin");
                }}>SIGNIN</Button>
              </div>
              }
            </div>
          </Grid>

          <Grid item xs={7}>
            <img
              style={{ width: "80%", objectFit: "contain" }}
              src="https://s39613.pcdn.co/wp-content/uploads/2021/11/day-picture-id1163588010.jpg"
            />
          </Grid>
        </Grid>
      </div>
    );
}
export default Landing;