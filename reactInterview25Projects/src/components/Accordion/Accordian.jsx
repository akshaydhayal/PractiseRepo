import { useState } from "react";

export default function Accordian(){
    const [show,setShow]=useState([]);
    const [enableMultiSelection,setEnableMultiSelection]=useState(false);
    const [showIndex,setShowIndex]=useState(-1);
    let data = [
      {
        id:1,
        q: "How are you?",
        a: "I am good",
      },
      {
        id:2,
        q: "How are you?",
        a: "I am good",
      },
      {
        id:3,
        q: "How are you?",
        a: "I am good",
      },
    ];
    // console.log(show);

    function multiSelection(currentId){
        // console.log("inside multi fn");
        const ind=show.findIndex((item)=>{
            return item===currentId;
        });
        console.log(`ind : ${ind}`);
        if(ind===-1){
            setShow([...show,currentId]);
        }else{
            setShow(show.filter((item)=>item!=currentId));
        }
    }
    return(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <p>Accoridion</p>
            <button style={{padding:"5px 10px",backgroundColor:"black",fontWeight:"bold",
             fontSize:"20px",marginBottom:"5px",cursor:"pointer"}} onClick={()=>{
                setEnableMultiSelection((o)=>!o);
             }}>Enable multi selection</button>
             {/* {console.log(enableMultiSelection)} */}
            {data.map((i)=>{
                return (
                  <div
                    style={{
                      width: "400px",
                      marginBottom: "10px",
                      backgroundColor: "lightslategray",
                      padding: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h2
                        style={{ marginRight: "20px" }}
                        onClick={() =>{
                          enableMultiSelection===false? setShowIndex((old) => {
                            return old === i.id ? -1 : i.id;
                          }): multiSelection(i.id);
                        }}>{i.q}
                      </h2>
                      <button>+</button>
                    </div>
                    {enableMultiSelection===false? 
                    (showIndex === i.id && <h3>{i.a}</h3>):
                    (show.find((n)=>n===i.id)!=undefined && <h3>{i.a}</h3>)
                    }                    
                  </div>
                );
            })}
        </div>
    )
}













// {
//   data.map((item, kind) => {
//     return (
//       <div style={{ border: "2px solid white", width: "400px" }} key={kind}>
//         <span>{item.q}</span>
//         <button
//           onClick={() => {
//             setShow((old) => {
//               return old.map((i, ind) => {
//                 return ind === item.id - 1
//                   ? old.length === 0
//                     ? false
//                     : !i
//                   : false;
//               });
//             });
//           }}
//         >
//           +
//         </button>
//         {/* <button onClick={()=>{
//                         setShowIndex((old)=>{
//                             return showIndex===item.id-1? -1: item.id-1;
//                         });
//                     }}>+</button> */}
//         {show[item.id - 1] && <p>{item.a}</p>}
//         {/* {showIndex==item.id-1 && <p>{item.a}</p>} */}
//       </div>
//     );
//   });
// }