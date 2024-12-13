"use client";
import { Tabs, Tab } from "@nextui-org/react";
import React from "react";
import ChartFilters from "./chart-filters";

const Menu = () => {
  return (
    <Tabs
      classNames={{
        tabList: "gap-6 w-full relative rounded-none p-0 border-divider px-20",
        cursor: "bg-[#4B40EE]",
        tab: "max-w-fit px-0 h-12 text-left",
        tabContent: "group-data-[selected=true]:text-[#06b6d4] text-lg mx-20",
        base: "w-full border-b border-[#eff1f3]",
      }}
      color="primary"
      variant="underlined"
    >
      <Tab
        key="photos"
        title={
          <div className="flex items-center space-x-2 text-[#6f7177]">
            Summary
          </div>
        }
      ></Tab>
      <Tab
        key="music"
        title={
          <div className="flex items-center space-x-2 text-[#6f7177]">
            Chart
          </div>
        }
      >
        <ChartFilters />
      </Tab>
      <Tab
        key="Statistics"
        title={
          <div className="flex items-center space-x-2 text-[#6f7177]">
            Statistics
          </div>
        }
      ></Tab>
      <Tab
        key="Analysis"
        title={
          <div className="flex items-center space-x-2 text-[#6f7177]">
            Analysis
          </div>
        }
      ></Tab>
      <Tab
        key="Settings"
        title={
          <div className="flex items-center space-x-2 text-[#6f7177]">
            Settings
          </div>
        }
      ></Tab>
    </Tabs>
  );
};

export default Menu;
