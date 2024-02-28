import { useState } from "react";

export default function RandomColour(){
    const [hex,setHex]=useState("#a281d3");
    const [rgb,setRgb]=useState("");
    const [typeColour,setTypeColour]=useState("hex");
    function getHexDigit(n){
        let c=n;
        if (n === 10) {
          c = "a";
        } else if (n === 11) {
          c = "b";
        } else if (n == 12) {
          c = "c";
        } else if (n === 13) {
          c = "d";
        } else if (n === 14) {
          c = "e";
        } else if (n == 15) {
          c = "f";
        }
        return c;
    }
    function generateHex(){
        let hexs=[];
        for(let i=0; i<6; i++){
            let r=Math.floor(Math.random()*16);
            let d=getHexDigit(r);
            hexs.push(d);
        }
        
        let f = `#${hexs[0]}${hexs[1]}${hexs[2]}${hexs[3]}${hexs[4]}${hexs[5]}`;
        setHex(f);
        // console.log("hex : "+hex+" f : "+f);
    }
    function generateRgb(){
        const digits=[];
        for(let i=0; i<3; i++){
            digits.push(Math.floor(Math.random()*256));
        }
        setRgb(`rgb(${digits[0]},${digits[1]},${digits[2]})`);
        // console.log(`rgb(${digits[0]},${digits[1]},${digits[2]})`);
    }

    return(
        <div style={{backgroundColor:(typeColour==="hex")?hex:rgb,height:"100vh",
        width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:"250px"}}>
            <h2>Random Colour generator</h2>
            <div>
                <button onClick={()=>{
                    setTypeColour("hex");
                    generateHex();
                }}>Generate HEX colour</button>

                <button onClick={()=>{
                    setTypeColour("rgb");
                    generateRgb();
                }}>Generate RGB colour</button>
            </div>
            <h1>{typeColour==="rgb"?("RGB: "+rgb):"Hex : "+hex}</h1>
        </div>
    )
}