import React from "react";
import { Outlet, ScrollRestoration } from "react-router";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Layout = () => {
  return (
    <section className="bg-[#f2f2f2]">
      <Header />
      <div className="lg:flex gap-10">
        <SideBar />
        <div className="flex-1 mt-4 p-4 md:p-8">
          <Outlet />
        </div>
      </div>
      <ScrollRestoration />
    </section>
  );
};
export default Layout;
