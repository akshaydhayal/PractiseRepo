// import {useSession,signIn,signOut} from "next-auth/react";

// export default function loginNextAuthPage(){
//     const session=useSession();
//     console.log(session);
//     return(
//         <div>
//             {session.data && <div>
//                 <p>Signed in as : {session.data.user.email}</p>
//                 <button onClick={()=>{signOut()}}>SignOut</button>
//             </div>
//             }

//             {!session.data && <button onClick={()=>{signIn()}}>SignIm</button>}
//         </div>
//     )
// }


import {useSession,signIn,signOut} from "next-auth/react";
export default function loginpage(){
    const session=useSession();
    console.log(session);
    return<div>
        {session.data && <div>
            <p>Signed in as : {session.data.user.email}</p>
            <button onClick={()=>{signOut}}>signOut</button>
        </div>    
        }
        {!session.data && <button onClick={()=>{signIn}}>signIn</button>}
    </div>
}