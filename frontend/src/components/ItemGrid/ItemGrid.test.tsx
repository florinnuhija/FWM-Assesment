import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemGrid from "./ItemGrid";

describe("ItemGrid Component", () => {
  test("renders a list of items and calls onCardClick when an item is clicked", () => {
    const mockItems = [
      { id: 1, title: "Test Item 1", description: "Desc 1" },
      { id: 2, title: "Test Item 2", description: "Desc 2" },
    ];

    const handleCardClick = jest.fn();

    render(<ItemGrid items={mockItems} onCardClick={handleCardClick} />);

    // Check that item titles are rendered
    expect(screen.getByText(/Test Item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Item 2/i)).toBeInTheDocument();

    // Click the first item's title
    fireEvent.click(screen.getByText(/Test Item 1/i));
    expect(handleCardClick).toHaveBeenCalledTimes(1);
    expect(handleCardClick).toHaveBeenCalledWith(mockItems[0]);

    // Click the second item's title
    fireEvent.click(screen.getByText(/Test Item 2/i));
    expect(handleCardClick).toHaveBeenCalledTimes(2);
    expect(handleCardClick).toHaveBeenCalledWith(mockItems[1]);
  });
});
