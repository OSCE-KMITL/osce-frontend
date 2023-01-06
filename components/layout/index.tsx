import React from "react";
import NavigationBar from "./navigation_bar";
import { ScriptProps } from "next/script";
import { Noto_Sans_Thai } from "@next/font/google";

const font_setting = Noto_Sans_Thai({
  subsets: ["thai"],
});
const Layout: React.FC<ScriptProps> = ({ children }) => {
  return (
    <div className={font_setting.className}>
      <NavigationBar />
      {children}
    </div>
  );
};

export default Layout;
