import { useCallback, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TiTick } from "react-icons/ti";

const COUNTRIES = [
  {
    label: "India",
    value: "india",
  },
  {
    label: "USA",
    value: "usa",
  },
  {
    label: "Germany",
    value: "germany",
  },
  {
    label: "England",
    value: "england",
  },
  {
    label: "London",
    value: "london",
  },
];

interface CountryDropdownProps {
  selectedCountry: string;
  onSelectCountry: (country: string) => void;
  open: boolean;
  onOpen: () => void;
}

const CountryDropdown = ({
  selectedCountry,
  onSelectCountry,
  open,
  onOpen,
}: CountryDropdownProps) => {
  return (
    <div>
      <div
        className="w-1/2 h-10 border rounded-md flex items-center justify-between px-4 cursor-pointer"
        onClick={onOpen}
      >
        <span className="font-medium text-sm capitalize">
          {selectedCountry ? selectedCountry : "Select country"}
        </span>
        <IoIosArrowDown
          className={`transition-transform ${
            open ? "transform rotate-180" : ""
          }`}
        />
      </div>
      {open && (
        <div className="w-1/2 border rounded-md p-2 space-y-2 overflow-scroll scrollbar transition">
          {COUNTRIES.map((country) => (
            <div
              key={country.value}
              onClick={() => onSelectCountry(country.value)}
              className={`h-10 w-full ${
                selectedCountry === country.value ? "bg-black text-white" : ""
              } border rounded-md flex items-center justify-between px-4 cursor-pointer`}
            >
              <span>{country.label}</span>
              {selectedCountry === country.value && <TiTick size={20} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CountryDropdown;
