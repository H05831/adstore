import { IconType } from "react-icons";
import { RiLoader4Fill } from "react-icons/ri";

interface ButtonProps {
  large?: boolean;
  medium?: boolean;
  outline?: boolean;
  label: string;
  icon?: IconType;
  onClick?: () => void;
  disabled?: boolean | undefined;
  type?: "submit" | "reset" | undefined;
}

const Button = ({
  large,
  medium,
  outline,
  label,
  onClick,
  icon: Icon,
  disabled,
  type,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`flex items-center justify-center gap-2 rounded-md ${
        large
          ? "bg-black h-12 text-white text-sm"
          : "px-5 py-2.5 bg-black text-white text-sm"
      } ${
        medium
          ? "bg-black text-white text-sm w-fit px-4 py-2 m-2"
          : "px-5 py-2.5 bg-black text-white text-sm"
      } ${
        outline
          ? "border-2 h-12 w-[320px] bg-white text-zinc-800 text-sm"
          : "px-5 py-2.5 bg-black text-white text-sm"
      }`}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      {disabled ? (
        <RiLoader4Fill className="w-6 h-6 text-zinc-400 animate-spin" />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
