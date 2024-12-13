/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Tabs, Tab } from "@nextui-org/react";
import React, { useState } from "react";
import ChartFilters from "./chart-filters";

const Menu = () => {
  const [selected, setSelected] = useState("chart");
  return (
    <Tabs
      classNames={{
        tabList: "gap-6 relative rounded-none p-0 border-divider",
        cursor: "bg-[#4B40EE] w-full",
        tab: "max-w-fit px-0 h-12 text-left",
        tabContent: "group-data-[selected=true]:text-[#06b6d4] px-2 text-lg",
        base: "w-full border-b border-[#eff1f3]",
      }}
      selectedKey={selected}
      onSelectionChange={(option) => setSelected(option as any)}
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
        key="chart"
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
