import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contect from "./pages/Contect";
import Blog from "./pages/Blog";
import Kurti from "./pages/Kurti";
import ProductView from "./pages/ProductView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contect" element={<Contect />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/Kurti" element={<Kurti />} />
            <Route path="/ProductView" element={<ProductView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
