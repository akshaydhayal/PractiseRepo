import QRCode from "qrcode";
import { useState } from "react";

export default function QRcode(){
    const [QRlink,setQRlink]=useState(null);
    const [QRtext,setQRtext]=useState("");
    // let qrD=document.getElementsByClassName('qrDiv');
    // console.log(qrD);
    // console.log(qrD[0]);
    function generateQR(){
        QRCode.toDataURL(QRtext).then((url)=>{
            setQRlink(url);
            console.log(url);
        })
    }
    return(
        <div>
            <input type="text" placeholder="enter text" onChange={(e)=>{
                setQRtext(e.target.value);
            }}/>
            <button onClick={generateQR}>Generate QR</button>
            {QRlink && <img src={QRlink}/>}
        </div>
    )
}