import {AddCourse} from "ui";
import {TextField, Card, Button, Typography} from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function addCoursePage(){
    return(
        <div>
          <AddCourse onClick={async(title:string,description:string,price:number,imageLink:string)=>{
             const response=await axios.post("/api/addcourse",{
                title,description,price,imageLink
             });
             console.log(response.data);
          }}/>  
        </div>
    )
}