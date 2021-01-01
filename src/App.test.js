import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);
it("renders without crashing", ()=> {
    const div = document.createElement("div");
    ReactDOM.render(<App></App>, div);
}) 

it("renders app component correctly", ()=>{
  const {getByTestId} = render(<App></App>);
  const heading = getByTestId("heading")
  expect(getByTestId("app-component")).toContainElement(heading);
})