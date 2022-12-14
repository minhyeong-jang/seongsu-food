import "antd/dist/antd.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { NaverFoodPriceContainer } from "./containers";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <Routes>
          <Route path='/seongsu-food' element={<NaverFoodPriceContainer />} />
          <Route path='*' element={<Navigate replace to='/seongsu-food' />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
