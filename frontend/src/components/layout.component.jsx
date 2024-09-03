import React from "react";
import Header from "./header.component";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;
