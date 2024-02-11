import {TextField,Button, Typography,Card} from "@mui/material";
import { useState } from "react";
function Addcourse(){
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [imageLink,setImagelink]=useState("");
    return(
        <div style={{display:"flex", justifyContent:"center",marginTop:"100px"}}>
            <Card variant="outlined" style={{width:"400px",padding:"10px"}}>

            <TextField variant="outlined" label="Course title" 
            size="small" fullWidth margin="normal" onChange={(e)=>{
                setTitle(e.target.value);
            }}/>
            <TextField variant="outlined" label="Course description" 
            size="small" fullWidth margin="normal" onChange={(e)=>{
                setDesc(e.target.value);
            }}/>
            <TextField variant="outlined" label="Image link" 
            size="small" onChange={(e)=>{
                setImagelink(e.target.value);
        
            }} fullWidth margin="normal"/>
            <Button variant="contained" onClick={()=>{
                fetch("http://localhost:3002/admin/courses",{
                    method:"POST",
                    body:JSON.stringify({
                        title,"description":desc,
                        "price":100,"published":true,imageLink
                    }),headers:{
                        'Content-type':"application/json",
                        'token':localStorage.getItem("token")
                    }
                }).then((response)=>{
                    response.json().then((data)=>{
                        console.log(data);
                    })
                })
            }}  >Add Course</Button>
            </Card>
        </div>
    )
}
export default Addcourse;