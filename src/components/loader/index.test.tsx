import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, Mock, vi } from "vitest";
import { Loader } from ".";
import { useLoadingStore } from "../../stores/loading";

vi.mock("../../stores/loading");

describe("Loader Component", () => {
  it("should render the Backdrop and CircularProgress when isLoading is true", () => {
    (useLoadingStore as unknown as Mock).mockReturnValue({ isLoading: true });

    render(<Loader />);

    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toBeInTheDocument();

    const circularProgress = screen.getByTestId("circular-progress");
    expect(circularProgress).toBeInTheDocument();
  });
});
