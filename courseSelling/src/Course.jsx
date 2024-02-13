import { useEffect, useState } from "react";
import { CourseCard } from "./Courses";
import { useParams } from "react-router-dom";
import { Card, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

function Course() {
  const [courses, setCourses] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://localhost:3002/admin/courses", {
        headers: { token: localStorage.getItem("token") },
      });
      console.log(response.data);
      setCourses(response.data);
    }
    getData();
  }, []);
  let course = courses.find((c) => {
    if (c._id == courseId) {
      return c;
    }
  });
  console.log(course);
  return (
    <div style={{ display: "flex", padding: "20px" }}>
      {course && <CourseCard course={course} />}
      {course && (
        <UpdateCard course={course} courses={courses} setCourses={setCourses} />
      )}
    </div>
  );
}

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImagelink] = useState("");
  const [price,setPrice]=useState(0);

  async function updateCourseCard() {
    const response = await axios.put(
      "http://localhost:3002/admin/courses/" + props.course._id,
      { title, description, imageLink, price, published: true },
      {headers: { token: localStorage.getItem("token") }}
    );
    let updatedCourseS=props.courses.map((c)=>{
        if(c._id==props.course._id){
            return {
              _id:props.course._id,
              title,
              description,
              imageLink,
              price,
              published: true,
            };
        }else{
            return c;
        }
    });
    console.log("updatedCourse : ");
    console.log(updatedCourseS);
    props.setCourses(updatedCourseS);

    // fetch("http://localhost:3002/admin/courses/" + props.course.courseId, {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     title,
    //     description,
    //     imageLink,
    //     price: 150,
    //     published: true,
    //   }),
    //   headers: {
    //     token: localStorage.getItem("token"),
    //     "Content-type": "application/json",
    //   },
    // }).then((response) => {
    //   response.json().then((data) => {
    //     console.log(data);
    //     let updatedCourses = props.courses.map((c) => {
    //       if (c.courseId == props.course.courseId) {
    //         return {
    //           courseId: props.course.courseId,
    //           title,
    //           description,
    //           imageLink,
    //           price: 150,
    //           published: true,
    //         };
    //       } else {
    //         return c;
    //       }
    //     });
    //     console.log("updatedCourse : ");
    //     console.log(updatedCourses);
    //     props.setCourses(updatedCourses);
    //   });
    // });
  }
  return (
    <div>
      <Card variant="outlined" style={{ width: "400px", padding: "10px" }}>
        <Typography variant="h6">Update Course Details</Typography>
        <TextField
          variant="outlined"
          label={"old title: " + props.course.title}
          fullWidth
          size="small"
          margin="normal"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          label={"current desc: " + props.course.description}
          fullWidth
          size="small"
          margin="normal"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          variant="outlined"
          label={"current imageLink : " + props.course.imageLink}
          fullWidth
          size="small"
          margin="normal"
          onChange={(e) => setImagelink(e.target.value)}
        />
        <TextField variant='outlined' label={"current price :"+props.course.price} fullWidth 
        size='small' margin='normal' onChange={(e)=>setPrice(e.target.value)}/>
        <Button variant="outlined" onClick={updateCourseCard}>
          Update Course
        </Button>
      </Card>
    </div>
  );
}

export default Course;
