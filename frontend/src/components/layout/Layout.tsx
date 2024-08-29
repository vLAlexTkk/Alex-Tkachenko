import { ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <section className="bg-white h-[100hv]">
      <header className="shadow-xl border-b text-blue-500 flex flex-row items-center justify-between p-[20px] bg-white/80">
        <div>Logo</div>
        <div>Registration</div>
      </header>
      <main className="">{children}</main>
    </section>
  );
};

export default Layout;
