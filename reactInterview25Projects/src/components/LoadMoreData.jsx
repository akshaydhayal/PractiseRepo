import {useState,useEffect} from "react";

export default function LoadMoreData(){
    const [products,setProducts]=useState([]);
    const [pageNo,setPageNo]=useState(0);
    useEffect(()=>{
        async function getData(){
            const response = await fetch(
              "https://dummyjson.com/products?limit=20&skip="+pageNo*20
            );
            const data=await response.json();
            console.log("pageno: "+pageNo);
            if(data && pageNo<5){
                setProducts(data.products);
                console.log(data);
            }
        }
        getData();
    },[pageNo])
    return(
        <div>
            <h2>Load more Data Component</h2>
            <div style={{display:"flex",flexWrap:"wrap",gap:"10px",justifyContent:"center"}}>
                {products.map((p)=>{
                    return<div style={{display:"flex",flexDirection:"column",
                    alignItems:"center",border:"2px solid yellow",padding:"5px"}}>
                        <p>{p.title}</p>
                        <img src={p.images[0]} style={{height:"140px",width:"220px"}}/>
                    </div>
                })}
            </div>
            {pageNo<5? <button onClick={()=>{
                setPageNo((o)=>o+1);
            }}>Load More</button>:<button>You have reached to 100 Products</button>}
        </div>
    )
}