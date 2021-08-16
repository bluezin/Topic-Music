import React from "react";
import App from "../App";
import { create } from "react-test-renderer";

describe("<App />", () => {
  const component = create(<App />);

  test("Renderisando App", () => {
    expect(component).toBeDefined();
  });
});
