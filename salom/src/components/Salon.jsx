import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export default function Salon() {
  const [rating, setRating] = useState(3);
  return (
    <div className="flex justify-between gap-12  w-screen h-screen bg-black">
      <div className="w-2/3 p-4 px-8">
        <div className="flex flex-col gap-6">
          <p className="text-5xl font-semibold text-white">Select Services</p>
          <div className="flex gap-2">
            <button className="p-0 px-3 rounded-2xl bg-white text-black font-semibold text-lg">
              Featured
            </button>
            <button className="p-0 px-3 rounded-2xl border border-slate-500 font-semibold text-lg text-white">
              Hair therapy Experience
            </button>
            <button className="p-0 px-3 rounded-2xl border border-slate-500 font-semibold text-lg text-white">
              Hair therapy Experience
            </button>
          </div>
        </div>
        <div className="w-full mt-5">
          <p className="text-3xl font-semibold text-white mb-3">Featured</p>
          <div className="flex flex-col gap-3">
            <ServiceCard
              name="Haircut"
              time="20 mins"
              desc="Achieve your ideal style with our classic cut, wash and dry"
              price="AED 95"
              selected={true}
            />
            <ServiceCard
              name="Junior Haircut(Up to 12 years)"
              time="20 mins"
              desc="You will the experience the classic shaving procedure, including application of a hot"
              price="AED 70"
              selected={false}
            />
            <ServiceCard
              name="Traditional Shave"
              time="20 mins"
              desc="You will the experience the classic shaving procedure, including application of a hot"
              price="AED 65"
              selected={false}
            />
          </div>
        </div>
      </div>

      <div
        className="flex flex-col gap-4 border rounded-lg border-slate-500 p-4 px-6 h-[96vh]
       max-w-[380px] justify-between mt-4 mr-6"
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <img
              src="https://www.designersarch.in/wp-content/uploads/2023/07/Low-Budget-Beauty-Salon-Interior-Design-2.jpg"
              className="h-16 w-16 rounded-md"
            />
            <div className="flex flex-col items-start">
              <p className="text-lg font-medium text-start text-white">
                Portofino Gentlemen Lounge - Dubai Mall
              </p>
              <div className="flex gap-1 items-center">
                <p className="text-sm text-slate-300">4.9</p>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
                <p className="text-sm text-slate-300">(584)</p>
              </div>
              <p className="text-base text-slate-200">
                {" "}
                Dubai Hills Mall, shop 201, Dubai
              </p>
            </div>
          </div>

          <div className="divide-y flex flex-col gap-5">
            <div className="flex justify-between">
              <div>
                <p className="text-base font-medium text-white">Haircut</p>
                <p className="text-sm text-slate-200">20 mins</p>
              </div>
              <p className="text-base text-white">AED 95</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-medium mt-2 text-white">Total</p>
              <p className="text-lg font-medium mt-2 text-white">AED 95</p>
            </div>
          </div>
        </div>
        <button className="p-1 bg-white text-black font-semibold">
          Continue
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ name, time, desc, price, selected }) {
  return (
    <div
      className={`border w-full ${
        selected ? "border-yellow-400" : "border-slate-500"
      }  flex p-3 px-4 rounded-xl items-center gap-3 justify-between`}
    >
      <div className="flex flex-col items-start">
        <p className="text-lg font-medium text-white">{name}</p>
        <p className="text-base text-slate-400">{time}</p>
        <p className="text-base text-slate-400"> {desc} </p>
        <p className="text-lg font-medium text-white">{price}</p>
      </div>
      {selected ? (
        <button className="p-1 px-3 font-semibold text-lg bg-yellow-400 text-black rounded-md">
          &#10003;
        </button>
      ) : (
        <button className="p-1 px-3 font-semibold text-lg bg-slate-700 text-white rounded-md">
          +
        </button>
      )}
    </div>
  );
}
