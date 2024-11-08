import { RiLoader4Fill } from "react-icons/ri";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-[33rem] flex items-center justify-center">
      <RiLoader4Fill
        style={{ transform: "translateZ(0)" }}
        size={30}
        className="animate-spin-smooth text-zinc-500"
      />
    </div>
  );
};

export default Loader;
