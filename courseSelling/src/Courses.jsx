import { useEffect, useState } from "react";
import {Card,Typography,Button} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Courses(){
    const [courses,setCourses]=useState([]);
    useEffect(()=>{
        async function getData(){
            const response=await axios.get("http://localhost:3002/admin/courses",{
                headers:{"token":localStorage.getItem("token")}
            });
            console.log(response.data);
            setCourses(response.data);
        }
        getData();
        // fetch("http://localhost:3002/admin/courses",{
            //     method:"GET",
            //     headers:{
                //         "token":localStorage.getItem("token")
                //     }
                // }).then((response)=>{
                    //     response.json().then((data)=>{
                        //         console.log(data);
                        //         setCourses(data);
                        //     })
                        // })
    },[]);

    return(
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
        {courses.map((course)=>{
            return <CourseCard course={course}/>
        })}
    </div>)
}
export function CourseCard(props){
    const navigate=useNavigate();
    return(
            <Card variant="outlined" style={{width:"300px",marginRight:"10px",marginBottom:"5px",
            display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Typography>{props.course.title}</Typography>
            <Typography>{props.course.description}</Typography>
            <img src={props.course.imageLink} style={{width:"250px"}}></img>
            <Typography>Price : {props.course.price}</Typography>
            <Button variant="contained" size="small" style={{marginBottom:"6px"}} onClick={()=>{
                navigate("/courses/"+props.course._id);
            }}>Edit</Button>
            </Card>
    )
}
export default Courses;