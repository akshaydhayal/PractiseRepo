import { useEffect, useState } from "react";
import { CourseCard } from "./Courses";
import {useParams} from "react-router-dom";
import {Card,Typography,TextField,Button} from "@mui/material";

function Course(){
    const [courses,setCourses]=useState([]);
    const {courseId}=useParams();

    useEffect(()=>{
        fetch("http://localhost:3002/admin/courses",{
            method:"GET",
            headers:{
                "token":localStorage.getItem("token")
            }
        }).then((response)=>{
            response.json().then((data)=>{
                console.log(data);
                setCourses(data);
            })
        })
    },[]);
    let course=courses.find((c)=>{
        if(c.courseId==courseId){
            return c;
        }
    });
    console.log(course);
    return(
        <div style={{display:"flex",padding:"20px"}}>
            {course &&  <CourseCard course={course}/>}
            <UpdateCard course={course}/>
        </div>
    )
}


function UpdateCard(props){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [imageLink,setImagelink]=useState("");

    function updateCourseCard(){
        fetch("http://localhost:3002/admin/courses/"+props.course.courseId,{
            method:"PUT",
            body:JSON.stringify({
                title,description,imageLink,
                "price":150,"published":true
            }),headers:{
                "token":localStorage.getItem("token"),
                "Content-type":"application/json"
            }
        }).then((response)=>{
            response.json().then((data)=>{
                console.log(data);
            })
        })
    }
    return(<div>
        <Card variant="outlined" style={{width:"400px",padding:"10px"}}>
            <TextField variant="outlined" label="Course Title" fullWidth
            size="small" margin="normal" onChange={e=>setTitle(e.target.value)}/>
            <TextField variant="outlined" label="Course Description" fullWidth
            size="small" margin="normal" onChange={e=>setDescription(e.target.value)}/>
            <TextField variant="outlined" label="Course Imagelink" fullWidth
            size="small" margin="normal" onChange={e=>setImagelink(e.target.value)}/>
            <Button variant="outlined" onClick={updateCourseCard}>Update Course</Button>
        </Card>
    </div>)
}


export default Course;