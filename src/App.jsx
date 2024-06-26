import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import Layout from "./components/layout/Layout";
import Products from "./pages/Products/Products";
import Contact from "./pages/Contact/Contact";
import Admin from "./pages/Admin/Admin";
import About from "./pages/About/About";
import Auth from "./pages/Admin/Components/Auth";

import useScrollToTop from "./utils/hooks/useScrollToTop";

function App() {
  useScrollToTop();
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Layout>
  );
}

export default App;
