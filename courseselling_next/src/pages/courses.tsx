import { BASE_URL } from "@/config";
import { useEffect, useState } from "react"

export default function coursesPage(){
    const [courses,setCourses]=useState([]);
    const [courseLoading,setCourseLoading]=useState(true);
    // console.log('courses: '+JSON.stringify(courses));

    async function init(){
        try{
            const response=await fetch(`${BASE_URL}/admin/courses`,{
                method:'GET',
                headers:{token:localStorage.getItem('courseToken')}
            });
            const data=await response.json();
            if(data.length>=1){
                setCourses(data);
            }
            setCourseLoading(false);
            console.log(data);
        }catch(e){
            console.log(e);
            setCourseLoading(false);
        }
    }
    useEffect(()=>{
        init();
    },[])

    if(courseLoading){
        return<div>Course loading, please wait!!</div>
    }
    return(
        <div>
            Courses page
            <div className="flex flex-wrap gap-2">
            {!courseLoading && courses.length===0 && <div>Courses were not able to load!!</div>}
            {courses.length && courses.map((c)=>{
                return(
                    <div className="flex flex-col border-2 items-center border-gray-400">
                        <p>{c.title}</p>
                        <p>{c.description}</p>
                        <p>{c.price}</p>
                        <img className="w-72 h-48" src={c.imageLink}/>
                    </div>
                )
            })}
        </div>
        </div>
    )
}