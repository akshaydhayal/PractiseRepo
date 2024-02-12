import { useState,useContext, createContext } from 'react'
import './App.css'
import {RecoilRoot,useRecoilValue,useSetRecoilState,atom} from "recoil";

const countContext=createContext();
function App() {
  const [count,setCount]=useState(0);
  return (
    <RecoilRoot>
      <countContext.Provider value={{count,setCount}}>
      <div>
        <h4>Welcome to Counter game</h4>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <ButtonComponent/>
          <CountComponent/>
        </div>
      </div>
      </countContext.Provider>
      </RecoilRoot>
  )
}
function ButtonComponent(){
  return(<div style={{display:"flex"}}>
    <Increase/>
    <Decrease/>
  </div>)
};

function Increase(){
  // const setCount=useSetRecoilState(counterState);
  const {count,setCount}=useContext(countContext);
  return(<div>
    <button onClick={()=>{
      setCount(count=>count+1);
    }}>Increase Counter</button>
  </div>)
};

function Decrease(){
  // const setCount=useSetRecoilState(counterState);
  const {setCount}=useContext(countContext);
  return(<div>
    <button onClick={()=>{
      setCount(count=>count-1);
    }}>Decrease Counter</button>
  </div>)
};

function CountComponent(){
  // const count=useRecoilValue(counterState);
  const {count}=useContext(countContext);
  return(<div>
    <h2>{count}</h2>
  </div>)
}

export default App

const counterState=atom({
  key:"counterState",
  default:0
})

















// const countContext=createContext();
// function App() {
//   const [count,setCount]=useState(0);
//   return (
//     <countContext.Provider value={{count,setCount}}>
//       <div>
//         <h4>Welcome to Counter game</h4>
//         <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
//           <ButtonComponent/>
//           <CountComponent/>
//         </div>
//       </div>
//     </countContext.Provider>
//   )
// }
// function ButtonComponent(){
//   return(<div style={{display:"flex"}}>
//     <Increase/>
//     <Decrease/>
//   </div>)
// };

// function Increase(){
//   const {count,setCount}=useContext(countContext);
//   return(<div>
//     <button onClick={()=>{
//       setCount(count+1);
//     }}>Increase Counter</button>
//   </div>)
// };

// function Decrease(){
//   const {count,setCount}=useContext(countContext);
//   return(<div>
//     <button onClick={()=>{
//       setCount(count-1);
//     }}>Decrease Counter</button>
//   </div>)
// };

// function CountComponent(){
//   const {count}=useContext(countContext);
//   return(<div>
//     <h2>{count}</h2>
//   </div>)
// }
// export default App


















// function App() {
//   const [count,setCount]=useState(0);
//   return (
//       <div>
//         <h4>Welcome to Counter game</h4>
//         <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
//           <ButtonComponent count={count} setCount={setCount}/>
//           <CountComponent count={count}/>
//         </div>

//       </div>
//   )
// }
// function ButtonComponent({count,setCount}){
//   return(<div style={{display:"flex"}}>
//     <Increase count={count} setCount={setCount}/>
//     <Decrease count={count} setCount={setCount}/>
//   </div>)
// };

// function Increase({count,setCount}){
//   return(<div>
//     <button onClick={()=>{
//       setCount(count+1);
//     }}>Increase Counter</button>
//   </div>)
// };

// function Decrease({count,setCount}){
//   return(<div>
//     <button onClick={()=>{
//       setCount(count-1);
//     }}>Decrease Counter</button>
//   </div>)
// };

// function CountComponent({count}){
//   return(<div>
//     <h2>{count}</h2>
//   </div>)
// }
// export default App
