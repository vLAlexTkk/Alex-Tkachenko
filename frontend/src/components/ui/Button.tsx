import Image from "next/image";
import { DetailedHTMLProps, ButtonHTMLAttributes, useState } from "react";

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string;
  iconPath?: string | any;
}

const Button = ({ text, iconPath }: IButtonProps) => {
  const [hoveredEffect, setHoveredEffect] = useState<boolean>(false);
  return (
    <button
      onMouseEnter={() => setHoveredEffect(true)}
      onMouseLeave={() => setHoveredEffect(false)}
      className="px-[10px] flex border bg-white hover:border-blue-500 text-gray-400  hover:text-blue-500 transition-colors shadow-sm rounded-[10px] flex-row items-center gap-[10px] py-[5px]"
    >
      <Image
        src={iconPath}
        width={12}
        className={`${hoveredEffect && "rotate-90 z-10"} text-blue-500 transition-all hover:rotate-90 z-10`}
        height={12}
        alt="icon"
      />
      <p className="uppercase text-[12px]">{text}</p>
    </button>
  );
};

export default Button;
