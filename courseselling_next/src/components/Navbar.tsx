import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "@/config";
import { userState } from "@/store/atoms/user";
import { useRecoilState } from "recoil";

export default function Navbar(){
    const router = useRouter();
    // const [username,setUsername]=useState(null);
    const [user,setUser]=useRecoilState(userState);

    async function init(){
        try {
            const response=await fetch(`${BASE_URL}/admin/me`,{
                headers:{token:localStorage.getItem('courseToken')}
            })
            const data=await response.json();
            console.log(data);
            if(data.username){
                // setUsername(data.username)
                setUser({userLoading:false,username:data.username})
            }else{
                setUser({userLoading:false,username:null})
            }  
        } catch (error) {
            console.log(error);
            setUser({userLoading:false,username:null})
        }
    }
    useEffect(()=>{
        init();
    },[])

    console.log(user);
    // if(user.userLoading){
    //     return<div>User loading, please wait</div>
    // }
    return(
        <div className="flex justify-between p-4">
            <p>Coursera</p>
            <div className="flex gap-2">
                {/* {username ? <p>Hi {username}</p>: <button onClick={()=>{
                        router.push('/signin');
                    }}>Signin</button>
                } */}
                {user.username ? <p>Hi {user.username}</p>: <button onClick={()=>{
                        router.push('/signin');
                    }}>Signin</button>
                }
                {/* { username ? <button onClick={()=>{
                    localStorage.setItem('courseToken',null);
                    setUsername(null);
                }}>Logout</button> : <button onClick={()=>[
                    router.push('/signup')
                ]}>Signup</button>
                } */}
                { user.username ? <button onClick={()=>{
                    localStorage.setItem('courseToken',null);
                    setUser({...user,username:null});
                }}>Logout</button> : <button onClick={()=>[
                    router.push('/signup')
                ]}>Signup</button>
                }
            </div>
        </div>
    )
}