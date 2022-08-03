import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Styles from "./Layout.module.scss";

function Layout({ children }) {
  return (
    <>
      <Navbar isFixed={true} color={"#f2f212"} />
      <main className={Styles.layout}> {children} </main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
