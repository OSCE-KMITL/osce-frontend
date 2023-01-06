import React from "react";
import NavigationBar from "./navigation_bar";
import { ScriptProps } from "next/script";
import { Noto_Sans_Thai } from "@next/font/google";

const font_setting = Noto_Sans_Thai({
  subsets: ["thai"],
});
const Layout: React.FC<ScriptProps> = ({ children }) => {
  return (
    <div className="w-full h-screen">
      <NavigationBar />
      <div className="w-full h-screen"> {children}</div>
    </div>
  );
};

export default Layout;
