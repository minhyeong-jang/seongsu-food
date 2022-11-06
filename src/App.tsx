import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { NaverFoodPriceCollectionContainer } from "./containers";

const App = () => {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <Routes>
        <Route path='/' element={<NaverFoodPriceCollectionContainer />} />
      </Routes>
    </Suspense>
  );
};

export default App;
