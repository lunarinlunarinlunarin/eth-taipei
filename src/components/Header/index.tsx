import React, { useState } from "react";

import dynamic from "next/dynamic";

export default function Header({ text, subtitle }) {
  return (
    <div className="flex h-[100px] flex-col px-8 py-8">
      <div className=" text-4xl font-medium">{text}</div>
      <div className="text-sm">{subtitle}</div>
    </div>
  );
}
