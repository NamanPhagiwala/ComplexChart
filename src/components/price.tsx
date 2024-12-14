/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";

const Price = () => {
  const [price, setPrice] = useState<number>(63179.71);
  const [margin, setMargin] = useState<string>("+ 2,161.42 (3.54%)");
  return (
    <div className="grid gap-3">
      <div className="flex items-start gap-2">
        <div className="text-7xl leading-none">{price.toLocaleString()}</div>
        <div className="text-2xl text-[#BDBEBF]">USD</div>
      </div>
      <div className="text-green-500 text-lg"> {margin} </div>
    </div>
  );
};

export default Price;
