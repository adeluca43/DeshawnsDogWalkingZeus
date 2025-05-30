import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { DogDetails } from "./dogs/DogDetails";
import { AddDogForm } from "./dogs/AddDogForm";
import { Walkers } from "./walkers/Walkers";
import { Cities } from "./cities/Cities";
import { EditWalker } from "./walkers/EditWalker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/dogs" element={<Home />} />
        <Route path="dogs/:dogId" element={<DogDetails/>} />
        <Route path="dogs/adddog" element={<AddDogForm />} />
        <Route path="/walkers" element={<Walkers/>} />
        <Route path="walkers/:walkerId" element={<EditWalker />} />
        <Route path="/cities" element={<Cities/>} />
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
