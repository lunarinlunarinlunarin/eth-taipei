import Image from "next/image";
import React from "react";

export const Network = ({ title, value }) => {
  return (
    <div className="flex flex-row justify-between" style={{ padding: "2rem", background: "#fff", marginBottom: "1rem", borderRadius: "10px" }}>
      <div className="flex flex-row items-center space-x-2">
        <span className="text-lg">{title}</span>
        <span className="flex flex-row items-center space-x-2">
          <span>
            <Image height={25} width={25} src="/gnosis.png" alt="Brand Logo" className="hover:cursor-pointer" />
          </span>
          <span className="text"> {value}</span>
        </span>
      </div>
    </div>
  );
};
