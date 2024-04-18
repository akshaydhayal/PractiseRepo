import { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userAtom";

export default function profilePage() {
  const router=useRouter();
  const username=router.query.username;
  console.log("username :"+username);
  
  const userDetails=useRecoilValue(userState);
  console.log("userDetails  from userState : "+JSON.stringify(userDetails));
  
  const [problemShow,setProblemShow]=useState(Array(100).fill(false));
  const [isloading,setIsloading]=useState(true);
  const [user,setUser]=useState(null);

  async function getUserData(){
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
          headers: { email: `${username}@gmail.com` },
        });
        console.log("getuserSata fn");
        const data=response.data;
        console.log(data);
        setIsloading(false);
        if(data.user){
           setUser(data.user); 
        }
    }catch(error){
        setIsloading(false);
        console.log(error);
    }
  }
  useEffect(()=>{
    if(username){
        getUserData();
    }
  },[username])
  
  function handleMouseEnter(ind){
    setProblemShow((old)=>{
        return old.map((o,i)=>{
            if(i===ind){
                return !o;
            }else{
                return o;
            }
        })
    })
  }
  if(isloading){
    return<div>Loading...please wait!!!</div>
  }
  if(!isloading && !user){
    return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <p className="text-2xl text-slate-400 font-medium">Invalid User Link</p>
        <p className="text-base text-slate-400 mt-6">User {username} does not exist!</p>
        <button className="text-sm font-light mt-2">View all users</button>
      </div>
    </div>
    );
  }
  return (
    <div className="flex justify-center">
    {user && <div className="w-4/5 flex  gap-8">
        <div className="w-3/12">
          <p className="text-slate-400 text-base">{user.username}</p>
          <img
            className="w-full p-2"
            src={user.avatar_img}
          />
          <p className="text-slate-400 text-xl font-semibold">{user.name}</p>
          <p className="text-slate-400 text-base">{user.college}</p>
          <div className="w-full md:flex ">
            <div className="border-2 border-white flex flex-col items-center">
              <p className="text-slate-400 text-2xl font-semibold hover:text-slate-200">
                {user.followers}
              </p>
              <p className="text-slate-400 text-base hover:text-slate-200">
                Followers
              </p>
            </div>
            <div className="border-2 border-white flex flex-col items-center ">
              <p className="text-slate-400 text-2xl font-semibold hover:text-slate-200">
                {user.following}
              </p>
              <p className="text-slate-400 text-base hover:text-slate-200">
                Following
              </p>
            </div>
            <div className="border-2 border-white flex flex-col items-center">
              <p className="text-slate-400 text-2xl font-semibold hover:text-slate-200">
                {user.solved_problems_count}
              </p>
              <p className="text-slate-400 text-base hover:text-slate-200">
                Solved
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="text-sm text-slate-400 p-1 px-2 hover:text-slate-100">Edit profile</button>
            {user.admin_status && 
            <button className="text-sm text-slate-400 p-1 px-2 hover:text-slate-100"
            onClick={()=>{router.push('/dashboard')}}>Manage Questions</button>
            }
            </div>
        </div>

        <div className="w-6/12">
          <p className="text-slate-400 text-2xl font-semibold">Problems</p>
          <div className="flex flex-wrap gap-1 mt-6">
            {Array(100).fill(1).map((p,ind) => {
                return (
                  <div className="text-slate-400 text-base p-2 border-0 border-white"
                
                    >
                    <p onMouseEnter={()=>handleMouseEnter(ind)}
                  onMouseLeave={()=>handleMouseEnter(ind)}>{p}</p>
                    {problemShow[ind] && <p className="relative bottom-12 text-xs text-slate-400">problem 1</p>}
                  </div>
                );
              })}
          </div>
        </div>

        <div>
          <div>
            <p className="text-slate-400 text-base">Ranks</p>
            <div className="flex gap-8">
              <p className="text-slate-400 text-xl">#{user.rank}</p>
              <p className="text-slate-400 text-base">Overall</p>
            </div>
          </div>
          <div>
            <div className="mt-16">
              <p className="text-slate-400 text-xl font-semibold">Progress</p>
              <p className="text-slate-400 text-base mt-3">
                What is not started today is never finished tomorrow.
              </p>
            </div>

            <div className="mt-16">
              <div className="w-full h-[5px] flex">
                <div className="bg-red-600 h-full w-1/2"></div>
                <div className="bg-green-500 h-full w-1/2"></div>
              </div>
              <div className="flex w-full">
                <div className="w-1/2 flex flex-col items-center">
                  <p className="text-slate-400 text-lg">unsolved</p>
                  <p className="text-slate-400 text-2xl font-medium">306</p>
                </div>
                <div className="w-1/2 flex flex-col items-center">
                  <p className="text-slate-400 text-lg">solved</p>
                  <p className="text-slate-400 text-2xl font-medium">{user.solved_problems_count}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  );
}
