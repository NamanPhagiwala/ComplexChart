"use client";

import Price from "@/components/price";
import Menu from "@/components/tab-list";

export default function Home() {
  return (
    <div className="font-circular mx-20">
      <Price />
      <Menu />
    </div>
  );
}
