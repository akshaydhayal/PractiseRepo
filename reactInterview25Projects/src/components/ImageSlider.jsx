import { useState, useEffect } from "react";
export default function imageSlider() {
  const [images, setImages] = useState([]);
  const [imageNo, setImageNo] = useState(0);
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=2&limit=10"
      );
      const data = await response.json();
      // console.log(data);
      if (data) {
        let imagelinks = [];
        data.forEach((item) => {
          imagelinks.push(item.download_url);
        });
        setImages(imagelinks);
        console.log("images : " + imagelinks);
        console.log(imagelinks.length);
      }
    }
    getData();
  }, []);
  return (
    <div>
      {images.length > 0 && (
        <img
          src={images[imageNo]}
          style={{ height: "250px", width: "450px" }}
        />
      )}
      <div style={{display:"flex"}}>
      {images.map((item) => {
          return images[imageNo] != item ? (
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                marginRight: "3px",
                backgroundColor: "gray",
              }}
            ></div>
          ) : (
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                marginRight: "3px",
                backgroundColor: "white",
              }}
            ></div>
          );
            })}
        </div>
      <button onClick={() => setImageNo(imageNo + 1)}>{`-->`}</button>
      <button onClick={() => setImageNo(imageNo - 1)}>{`<--`}</button>
    </div>
  );
}
