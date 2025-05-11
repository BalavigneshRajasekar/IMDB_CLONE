import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SinglePageView from "./pages/SinglePageView";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<SinglePageView />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
