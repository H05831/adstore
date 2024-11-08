import React from "react";

interface ActionLabelProps {
  label: string;
  secondaryLabel: string;
  onClick: () => void;
}

const ActionLabel = ({ label, secondaryLabel, onClick }: ActionLabelProps) => {
  return (
    <div className="text-sm text-neutral-500 text-center my-2">
      {label}
      <span
        className="underline cursor-pointer hover:text-black transition ml-1"
        onClick={onClick}
      >
        {secondaryLabel}
      </span>
    </div>
  );
};

export default ActionLabel;
