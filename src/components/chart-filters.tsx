"use client";
import React, { useState } from "react";
import Chart from "./chart";
import Image from "next/image";

const ChartFilters = () => {
  const [active, setactive] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [width, setWidth] = useState(840);
  const [height, setHeight] = useState(380);
  const updateChart = (type: number) => {
    setactive(type);
  };
  const toggleFullscreen = () => {
    const chartElement = document.getElementById("chart");
    if (chartElement) {
      if (!isFullscreen) {
        setWidth(1300);
        setHeight(800);
        chartElement.style.width = "100%";
        chartElement.style.height = "100%";
        chartElement.style.position = "fixed";
        chartElement.style.top = "0";
        chartElement.style.left = "0";
        chartElement.style.zIndex = "100";
        chartElement.style.backgroundColor = "white";
      } else {
        setWidth(840);
        setHeight(380);
        chartElement.style.width = "100%";
        chartElement.style.height = "100%";
        chartElement.style.position = "relative";
        chartElement.style.top = "auto";
        chartElement.style.left = "auto";
        chartElement.style.zIndex = "0";
        chartElement.style.backgroundColor = "transparent";
      }
    }
    setIsFullscreen(!isFullscreen);
  };
  return (
    <div className="">
      <div className="grid grid-cols-12 justify-between items-center text-lg text-[#6f7177]">
        <div className="flex col-span-3 gap-8 p-4">
          <div
            className="flex gap-2 justify-center items-center cursor-pointer"
            onClick={toggleFullscreen}
          >
            <Image
              src={"/assets/screen.svg"}
              width={24}
              height={24}
              alt="icon"
            />
            <div>Fullscreen</div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <Image
              src={"/assets/compare.svg"}
              width={24}
              height={24}
              alt="icon"
            />
            <div>Compare</div>
          </div>
        </div>
        <div className="flex">
          <div
            onClick={() => updateChart(1)}
            className={`text-lg text-[#6f7177] px-4 py-1 cursor-pointer ${
              active === 1 && "bg-[#4B40EE] !text-white  rounded-lg"
            }`}
          >
            1d
          </div>

          <div
            className={`text-lg text-[#6f7177] px-4 py-1 cursor-pointer ${
              active === 2 && "bg-[#4B40EE] !text-white  rounded-lg"
            }`}
            onClick={() => updateChart(2)}
          >
            3d
          </div>
          <div
            className={`text-lg text-[#6f7177] px-4 py-1 cursor-pointer ${
              active === 3 && "bg-[#4B40EE] !text-white  rounded-lg"
            }`}
            onClick={() => updateChart(3)}
          >
            1w
          </div>

          <div
            className={`text-lg text-[#6f7177] px-4 py-1 cursor-pointer ${
              active === 4 && "bg-[#4B40EE] !text-white  rounded-lg"
            }`}
            onClick={() => updateChart(4)}
          >
            1m
          </div>
          <div
            className={`text-lg text-[#6f7177] px-4 py-1 cursor-pointer ${
              active === 5 && "bg-[#4B40EE] !text-white  rounded-lg"
            }`}
            onClick={() => updateChart(5)}
          >
            1y
          </div>

          <div
            className={`text-lg text-[#6f7177] px-4 py-1 cursor-pointer ${
              active === 6 && "bg-[#4B40EE] !text-white  rounded-lg"
            }`}
            onClick={() => updateChart(6)}
          >
            max
          </div>
        </div>
      </div>
      <Chart type={active} widthParent={width} hParent={height} />

      {isFullscreen && (
        <div
          className="cursor-pointer z-[1000]"
          onClick={toggleFullscreen}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "transparent",
          }}
        >
          <Image
            src="/assets/close.svg"
            width={24}
            height={24}
            alt="close-icon"
          />
        </div>
      )}
    </div>
  );
};

export default ChartFilters;
