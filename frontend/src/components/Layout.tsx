import React from "react";
import NavTabs from "./NavTabs";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <NavTabs />
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
};

export default Layout;
