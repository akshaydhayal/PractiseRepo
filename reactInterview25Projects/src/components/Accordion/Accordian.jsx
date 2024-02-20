import { useState } from "react";

export default function Accordian(){
    const [show,setShow]=useState([]);
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
    console.log(show);
    return(
        <div>
            Accoridion
            {data.map((item,kind)=>{
                return <div style={{border:"2px solid white",width:"400px"}} key={kind}>
                    <span>{item.q}</span>
                    <button onClick={()=>{
                        setShow((old)=>{
                            return old.map((i,ind)=>{
                                return (ind===item.id-1)?(old.length===0?false:!i):false; 
                            });
                        });
                    }}>+</button>
                    {/* <button onClick={()=>{
                        setShowIndex((old)=>{
                            return showIndex===item.id-1? -1: item.id-1;
                        });
                    }}>+</button> */}
                    {show[item.id-1] && <p>{item.a}</p>}
                    {/* {showIndex==item.id-1 && <p>{item.a}</p>} */}
                </div>
            })}
        </div>
    )
}