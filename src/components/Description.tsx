// Description.tsx
import React from "react";

interface DescriptionProps {
  description: string;
  className?: string;
}

const Description = ({ description, className }: DescriptionProps) => {
  return (
    <span
      className={`text-sm px-2 lg:px-0 md:text-base text-center mt-4 ${className}`}
    >
      {description}
    </span>
  );
};

export default Description;
