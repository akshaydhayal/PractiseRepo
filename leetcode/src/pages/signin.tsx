import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";

const provider = new GoogleAuthProvider();

export default function signinPage() {
  const [user,setUser]=useState("");
  const [loading,setLoading]=useState(true);
  function handleSignin() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if(user.email){
            setUser(user.email);
        }
        setLoading(false);
        console.log("logged in: "+JSON.stringify(user));
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
    <div>
      {loading && <button onClick={handleSignin}>Signin with Google</button>}
      {!loading && <p>Hello, you are logged in as : {user}</p>}
    </div>
  );
}
