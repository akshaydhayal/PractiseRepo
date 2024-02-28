import { useState, useEffect } from "react";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export default function imageSlider() {
  const [images, setImages] = useState([]);
  const [imageNo, setImageNo] = useState(0);
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=2&limit=10"
      );
      const data = await response.json();
      if (data) {
        let imagelinks = [];
        data.forEach((item) => {
          imagelinks.push(item.download_url);
        });
        setImages(imagelinks);
        // console.log("images : " + imagelinks);
        // console.log(imagelinks.length);
      }
    }
    getData();
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
        <h3>Image slider</h3>
      <div style={{ position: "relative", border: "1px solid red" }}>
        {images.length > 0 && (
          <img
            src={images[imageNo]}
            style={{ height: "250px", width: "450px" }}
          />
        )}

          <ArrowCircleLeftRoundedIcon
            style={{position:"absolute",left:"20px",top:"50%"}}
            onClick={() =>
                setImageNo(imageNo === 0 ? images.length - 1 : imageNo - 1)
            }
            />
          <ArrowCircleRightIcon
            style={{position:"absolute",right:"20px",top:"50%"}}
            onClick={() =>
                setImageNo(imageNo === images.length - 1 ? 0 : imageNo + 1)
            }
            />
            
        <div style={{position:"absolute",bottom:"10px",left:"35%"}}>
          <div style={{ display: "flex" }}>
            {images.map((item, ind) => {
                return images[imageNo] != item ? (
                    <div
                    style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        marginRight: "3px",
                        backgroundColor: "gray",
                    }}
                  onClick={() => setImageNo(ind)}
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
          </div>
      </div>
    </div>
  );
}
