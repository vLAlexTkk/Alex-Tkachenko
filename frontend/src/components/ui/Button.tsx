import Image from "next/image";
import { DetailedHTMLProps, ButtonHTMLAttributes, useState } from "react";

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string;
  iconPath?: string | any;
}

const Button = ({ text, iconPath, ...props }: IButtonProps) => {
  const [hoverEffect, setHoverEffect] = useState<boolean>(false);
  return (
    <button
      {...props}
      onMouseEnter={() => setHoverEffect(true)}
      onMouseLeave={() => setHoverEffect(false)}
      className="px-[10px] flex border dark:bg-black bg-white dark:hover:text-blue-500  hover:border-blue-500 dark:text-white text-gray-400 hover:text-blue-500 transition-colors shadow-sm rounded-[10px] flex-row items-center gap-[10px] py-[5px]"
    >
      {iconPath && (
        <Image
          src={iconPath}
          width={12}
          className={`${hoverEffect && "rotate-90 z-10"} bg-white rounded-[5px] transition-all hover:rotate-90 z-10`}
          height={12}
          alt="icon"
        />
      )}
      <p className="uppercase text-[12px]">{text}</p>
    </button>
  );
};

export default Button;
