import axios from "axios";
import dayjs from "dayjs";
import { Check, Star, SquareArrowOutUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import duration from "dayjs/plugin/duration";
import {Circles } from 'react-loader-spinner'


dayjs.extend(duration);

const Banner = () => {
  const [bannerData, setBannerData] = useState({});
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const now = dayjs().toISOString();
    const fetchEvent = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/current-event`,
          { now },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data);
        setBannerData(response.data?.data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);
  useEffect(() => {
    const calculateRemainingTime = async () => {
      const now = dayjs();
      const end = dayjs(bannerData?.endTimer);
      const difference = end.diff(now);
      if (difference <= 0) {
        setRemainingTime("Event has ended");
      } else {
        const timeDuration = dayjs.duration(difference);
        const formattedTime = `${timeDuration.days()}d : ${timeDuration.hours()}h : ${timeDuration.minutes()}m : ${timeDuration.seconds()}s`;
        setRemainingTime({
          days: timeDuration.days() ? timeDuration.days() : 0,
          hours: timeDuration.hours() ? timeDuration.hours() : 0,
          minutes: timeDuration.minutes() ? timeDuration.minutes() : 0,
          seconds: timeDuration.seconds() ? timeDuration.seconds() : 0,
        });
      }
    };
    calculateRemainingTime();
    const intervalId = setInterval(calculateRemainingTime, 1000);
    return () => clearInterval(intervalId);
  }, [bannerData?.endTimer]);
 
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles color="#4fa94d" height={80} width={80} />
      </div>
    );
  }
  return (
    <div className="bg-slate-50 ">
      <section>
        {/* container */}
        <div className="h-full bg-slate-200 rounded-b-3xl space-y-5  mx-auto max-w-screen-xl px-2.5 md:px-20 pb-24 pt-10 lg:grid lg:grid-cols-5 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          {remainingTime !== "Event has ended" ? (
            <>
              <div className="  h-full flex flex-col col-span-3 justify-center  space-y-5 lg:justify-start ">
                <h2 className="text-5xl md:text-6xl text-green-600 font-semibold">
                  {bannerData?.description}
                </h2>
                <h3
                  onClick={() => {
                    const url = bannerData.link.startsWith("http")
                      ? bannerData?.link
                      : `https://${bannerData.link}`;
                    window.open(url, "_blank", "noopener noreferrer");
                  }}
                  className="text-xl flex items-center gap-1 w-fit cursor-pointer hover:text-zinc-800 text-zinc-600 underline font-semibold "
                >
                  Click to land in Your Dream <SquareArrowOutUpRight />
                </h3>
              </div>
              <div className=" flex flex-col  col-span-2 gap-5 justify-center w-full h-full">
                <h1 className="text-4xl text-green-600 font-semibold">
                  Count Down is begin..
                </h1>
                <div className="text-6xl flex justify-start   items-start">
                  <span className="flex justify-center  items-center flex-col">
                    <p>{remainingTime && remainingTime?.days}</p>
                    <p className="text-sm">Days</p>
                  </span>
                  :
                  <span className="flex justify-center  items-center flex-col">
                    <p>{remainingTime && remainingTime?.hours}</p>
                    <p className="text-sm">HOURS</p>
                  </span>
                  :
                  <span className="flex justify-center items-center flex-col">
                    <p>{remainingTime && remainingTime?.minutes}</p>
                    <p className="text-sm">MINUTES</p>
                  </span>
                  :
                  <span className="flex justify-center  items-center flex-col">
                    <p>{remainingTime && remainingTime?.seconds}</p>
                    <p className="text-sm">SECONDS</p>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="  h-full flex justify-center items-center flex-col col-span-5  space-y-5 lg:justify-start ">
              <h1 className="text-5xl">Add New Events</h1>
            </div>
          )}
        </div>
      </section>
      <section className="bg-slate-100 py-24">
        <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20 flex flex-col justify-center items-center gap-16">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <h2 className="relative w-fit text-center tracking-tight items-center justify-center font-bold text-5xl md:text-6xl text-gray-900 !leading-tight order-1  mt-2">
              What Our{" "}
              <span className="relative px-2">
                Customer
                {/* <Icons.underline className="hidden sm:block pointer-events-none text-green-500 absolute -bottom-6 inset-x-0"/> */}
              </span>{" "}
              Says
            </h2>
          </div>
          <div className="mx-auto grid grid-cols-1 px-4 max-w-2xl lg:max-w-none lg:grid-cols-2 lg:mx-0 gap-y-16 ">
            <div className="flex flex-col col-span-1 gap-5 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5">
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "The bag is spacious and incredibly well-made. I’ve received
                  multiple compliments on the color and style.{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    After three months of daily use
                  </span>
                  ,the stitching is still intact, and the material hasn't worn
                  out. My previous bag showed signs of wear within a few weeks.
                  Highly recommend this one!"
                </p>
              </div>
              <div className="flex space-x-3">
                <img
                  className="w-19 h-10 rounded-full"
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.47776910.1722433886&semt=ais_hybrid"
                  alt=""
                />
                <div>
                  <p className="font-semibold">Jack</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified User</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col col-span-1 gap-5 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5">
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "The watchband fits perfectly and is super comfortable. I've
                  had it for almost three months, and the material still looks
                  brand new.{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    With my last band
                  </span>
                  , the color started to fade within a month. I’ve gotten
                  several compliments on the sleek design. Very pleased with
                  this purchase!"
                </p>
              </div>
              <div className="flex space-x-3">
                <img
                  className="w-19 h-10 rounded-full"
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.47776910.1722433886&semt=ais_hybrid"
                  alt=""
                />
                <div>
                  <p className="font-semibold">Jonathan</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
