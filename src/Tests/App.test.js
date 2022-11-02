import { render, screen } from "@testing-library/react";
import DnDFlow from "../App/App";

test("renders learn react link", () => {
  render(<DnDFlow />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
