import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders calendar link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Calendar/i);
  expect(linkElement).toBeInTheDocument();
});
