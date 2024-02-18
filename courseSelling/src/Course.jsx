import { useEffect, useState } from "react";
import { CourseCard } from "./Courses";
import { useParams } from "react-router-dom";
import { Card, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { courseState } from "./store/course.js";
import { useRecoilValue,useSetRecoilState,useRecoilState } from "recoil";
import { courseDetails, courseImageLink, courseLoading, coursePrice, courseTitle } from "./store/selectors/course.js";

function Course() {
  const [courses, setCourses] = useState([]);
//   const [course, setCourse]=useRecoilState(courseState);
  const setCourse=useSetRecoilState(courseState);
  const isLoading=useRecoilValue(courseLoading);

  const { courseId } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://localhost:3002/admin/courses/"+courseId, {
        headers: { token: localStorage.getItem("token") },
      });
      if(response.data){
          console.log(response.data);
          setCourse({isLoading:false,course:response.data});
      }else{
        setCourse({isLoading:false,course:null});
      }
    }
    getData();
  }, []);

  return (
    <div>
        {isLoading && <div>Course Loading</div>}
        {isLoading===false && 
        <div>
            <CourseBanner/>
            <div style={{ display: "flex", padding: "20px" }}>
                <CourseCardCopy/>
                <UpdateCard/>
            </div>
        </div>
        }
    </div>
  );
}

function CourseBanner(){
    const title=useRecoilValue(courseTitle);
    return(<div style={{backgroundColor:"black", height:"100px",width:"100vw",
    display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Typography variant="h4">{title}</Typography>
    </div>)
}

function CourseCardCopy(){
    const imageLink=useRecoilValue(courseImageLink);
    const courseLoadingg=useRecoilValue(courseLoading);
    return(
        <div>
            {!courseLoadingg && <Card variant="outlined" style={{width:"300px",marginRight:"10px",marginBottom:"5px",
                display:"flex",flexDirection:"column",alignItems:"center"}}>
                <TitleComponent/>
                {/* <Typography>{course.description}</Typography> */}
                <img src={imageLink} style={{width:"250px"}}></img>
                <PriceComponent/>
                </Card>
            }
            </div>
    )
}

function PriceComponent(){
  //small component for selctors so only required fields of attom are used and re-renders are less
  const price=useRecoilValue(coursePrice);
  return <Typography>Price : {price}</Typography>
}
function TitleComponent(){
  const title=useRecoilValue(courseTitle);
  return <Typography>{title}</Typography>
}

function UpdateCard() {
  const [course,setCourse]=useRecoilState(courseState);
  const [title, setTitle] = useState(course.course.title);
  const [description, setDescription] = useState(course.course.description);
  const [imageLink, setImagelink] = useState(course.course.imageLink);
  const [price,setPrice]=useState(course.course.price);

  async function updateCourseCard() {
    const response = await axios.put(
      "http://localhost:3002/admin/courses/" + course.course._id,
      { title, description, imageLink, price, published: true },
      {headers: { token: localStorage.getItem("token") }}
    );
    // setCourse(response.data.updatedCourse)
    setCourse({...course,course:response.data.updatedCourse})
  }
  return (
    <div>
      <Card variant="outlined" style={{ width: "400px", padding: "10px" }}>
        <Typography variant="h6">Update Course Details</Typography>
        <TextField
          variant="outlined"
          label={"old title: " + course.title}
          fullWidth
          size="small"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          value={description}
          label={"current desc: " + course.description}
          fullWidth
          size="small"
          margin="normal"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          variant="outlined"
          value={imageLink}
          label={"current imageLink : " + course.imageLink}
          fullWidth
          size="small"
          margin="normal"
          onChange={(e) => setImagelink(e.target.value)}
        />
        <TextField variant='outlined' value={price}
        label={"current price :"+course.price} fullWidth 
        size='small' margin='normal' onChange={(e)=>setPrice(e.target.value)}/>
        <Button variant="outlined" onClick={updateCourseCard}>
          Update Course
        </Button>
      </Card>
    </div>
  );
}

export default Course;
