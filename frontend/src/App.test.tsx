import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import { fetchItems } from "./lib/api/items";

jest.mock("./lib/api/items");

describe("App Component (Home Page)", () => {
  test("shows loading skeleton then displays items after fetch", async () => {
    (fetchItems as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: [
                { id: 1, title: "Item 1", description: "Description 1" },
                { id: 2, title: "Item 2", description: "Description 2" },
              ],
              pagination: { total: 2 },
            });
          }, 100);
        })
    );

    render(
      <ThemeProvider theme={createTheme()}>
        <App />
      </ThemeProvider>
    );

    expect(screen.getAllByTestId("loading-skeleton")).toHaveLength(24);

    expect(await screen.findByText("Item 1")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("loading-skeleton")).toBeNull();
    });
  });
});
