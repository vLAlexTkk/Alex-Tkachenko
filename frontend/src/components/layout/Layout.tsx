"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

import Button from "@/components/ui/Button";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <section className="bg-white dark:bg-black h-[100vh]">
      <header className="shadow-xl border-b dark:bg-black dark:text-white text-blue-500 flex flex-row items-center justify-between p-[20px] bg-white/80">
        <div className="w-[40px] h-[40px]">
          <Image src={darkMode ? "/icons/logo-light.svg" : "/icons/logo-dark.svg"} width={40} height={40} alt="" />
        </div>
        <div className="flex flex-row gap-[10px]">
          <Button text="Sign In" />
          <Button text="Sign Up" />
          <Button onClick={() => setDarkMode(!darkMode)} text={!darkMode ? "Dark mode" : "Light mode"} />
        </div>
      </header>
      <main>{children}</main>
    </section>
  );
};

export default Layout;
