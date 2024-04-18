import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { User } from "@/db";
import axios from "axios";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/userAtom";

const provider = new GoogleAuthProvider();

export default function signinPage() {
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [userAvatarImage, setUserAvatarImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUserNew, setIsUserNew] = useState(false);

  function removeDomain(email) {
    const atIndex = email.indexOf("@"); // Find the index of the "@" symbol
    if (atIndex !== -1) {
      return email.substring(0, atIndex); // Extract the substring before the "@" symbol
    } else {
      return email; // Return the original email if "@" is not found
    }
  }

  async function userExists(userEmail) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
      headers: {
        email: userEmail,
      },
    });
    if (response.data.user === null) {
      setIsUserNew(true);
    } else {
      setUser(response.data.user);
      router.push(`/users/${response.data.user.username}`);
    }
    console.log("userStatus: " + response.data);
    console.log("userStatus: " + JSON.stringify(response.data));
    console.log(response.data.user);
    // const user=await User.find({email:userEmail});
    // return user?true:false;
  }

  function handleSignin() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user.email) {
          setEmail(user.email);
          setName(user.displayName);
          setUserAvatarImage(user.photoURL);
          setUserName(removeDomain(user.email));
          // let newUserStatus=userExists(user.email);
          userExists(user.email);
          //user.email and user.displayName
        }
        setLoading(false);
        console.log("logged in: " + JSON.stringify(user));
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        setLoading(false);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <div className="">
      <div className="w-screen h-[90vh] flex justify-center items-center">
        <div className="w-1/2 h-1/4 bg-gray-800 flex flex-col items-center gap-4">
          <p className="text-3xl font-medium text-white">Sign in</p>
          {loading && (
            <button
              onClick={handleSignin}
              className="bg-white p-2 px-4 font-medium rounded-md text-lg"
            >
              Signin with Google
            </button>
          )}
          <p className="text-sm text-slate-300">
            By signing in, you agree to Neetcode's terms of service and privacy
            policy.
          </p>
          {/* {!loading && <p>Hello, you are logged in as : {email}</p>} */}
          {isUserNew && (
            <RegisterUser
              displayName={name}
              email={email}
              username={username}
              userAvatarImage={userAvatarImage}
              setUser={setUser}
            />
          )}
          {/* <RegisterUser userAvatarImage="https://i.ndtvimg.com/i/2016-04/a_640x480_51459535529.jpg" /> */}
        </div>
      </div>
    </div>
  );
}

function RegisterUser({
  displayName,
  email,
  username,
  userAvatarImage,
  setUser,
}) {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState(email);
  const [name, setName] = useState(displayName);
  const [college, setCollege] = useState("");

  async function handleRegisterUser() {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
        name,
        username,
        email: userEmail,
        followers: 0,
        following: 0,
        avatar_img: userAvatarImage,
        college,
        solved_problems_count: 0,
        rank: 1000,
        points_scored: 0,
        admin_status:false,
      });
      setUser(response.data);

      console.log(response);
      console.log(response.data);
      router.push(`/users/${username}`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-1/2">
      <div className="flex flex-col">
        <p className="text-slate-400 text-2xl font-semibold mb-4">Register</p>
        <img className="w-28 h-28 mb-4" src={userAvatarImage} />

        <input
          className="p-1 px-3 mb-3 rounded-md placeholder-slate-100"
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="p-1 px-3 mb-3 rounded-md placeholder-slate-100"
          type="text"
          value={userEmail}
          placeholder="Enter Email"
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <input
          className="p-1 px-3 mb-5 rounded-md placeholder-slate-100"
          type="text"
          placeholder="College"
          onChange={(e) => {
            setCollege(e.target.value);
          }}
        />
        <button
          className="bg-blue-400 w-fit p-1 px-2 rounded-sm"
          onClick={handleRegisterUser}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
