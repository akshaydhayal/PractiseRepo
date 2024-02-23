import { TextField, Card, Button, Typography } from "@mui/material";
import { useState } from "react";

export function AddCourse(props:{
    onClick:(title:string,description:string,price:number,imageLink:string)=>void
    }
) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageLink, setImagelink] = useState("");
  return (
    <div style={{display:"flex",justifyContent:"center", marginTop:"100px"}}>
      <Card variant="outlined" style={{display:"flex",flexDirection:"column", width:"500px"}}>
        <Typography variant="h5">Add Course</Typography>
        <TextField
          variant="outlined"
          placeholder="course title"
          size="small" margin="normal"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          placeholder="course description"
          size="small" margin="normal"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          placeholder="course price"
          size="small" margin="normal"
          onChange={(e) => {
            setPrice(Number(e.target.value));
          }}
        />
        <TextField
          variant="outlined"
          placeholder="course imageLink"
          size="small" margin="normal"
          onChange={(e) => {
            setImagelink(e.target.value);
          }}
        />
        <Button variant="contained" onClick={()=>{
            props.onClick(title,description,price,imageLink);
        }}>Add Course</Button>
      </Card>
    </div>
  );
}
