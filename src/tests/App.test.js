import { render, screen } from "@testing-library/react";
import App from "../App.js";

test("renders create/join game on start", () => {
  render(<App />);
  const createGame = screen.getByText(/Create Game/i);
  const joinGame = screen.getByText(/Join Game/);
  expect(createGame).toBeInTheDocument();
  expect(joinGame).toBeInTheDocument();
});
