import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollPercent,setScrollPercent]=useState(0);
  useEffect(() => {
    try {
      fetch("https://dummyjson.com/products?limit=100").then((response) => {
        response.json().then((data) => {
        //   console.log(data.products);
          if (data.products) {
            setProducts(data.products);
          }
          setIsLoading(false);
        });
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, []);

  function handleScrollPercentage(){
    console.log("body scroll top : "+document.body.scrollTop);
    console.log("body scroll heieght : "+document.body.scrollHeight);
    console.log("html scroll top : "+document.documentElement.scrollTop);
    console.log("html SCOLL HEIGHT  "+document.documentElement.scrollHeight);
    console.log("client height : "+document.documentElement.clientHeight);
    let scollP=document.documentElement.scrollTop/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100;
    setScrollPercent(scollP);
  }
  useEffect(()=>{
    window.addEventListener("scroll",handleScrollPercentage);
  })
  return (
    <div>
        <h3 className="text-green-500 text-xl">Custom scoll bar</h3>
        <div style={{backgroundColor:"yellow"}}>
        
            <div style={{height:"10px",position:"sticky",top:"0",backgroundColor:"red",width:scrollPercent+"%"}}></div>
        
            {!isLoading && (
                <div>
                {products.map((item) => {
                    return <p>{item.title}</p>;
                    })}
                </div>
            )}
      </div>
    </div>
  );
}
