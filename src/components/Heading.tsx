import React from "react";

interface HeadingProps {
  title: string;
  start?: boolean;
  className?: string;
}

const Heading = ({ title, start, className }: HeadingProps) => {
  return (
    <h2
      className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold ${
        start ? "text-start" : "text-center"
      } ${className}`}
    >
      {title}
    </h2>
  );
};

export default Heading;
