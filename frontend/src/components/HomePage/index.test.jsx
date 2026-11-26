
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as QrReadModule from "../QrCodeRead";
import HomePage from "./index";

vi.spyOn(QrReadModule, "default").mockImplementation(
  () => <div>QrCode</div>
);

describe("HomePage", () => {
  it("should match snapshot", () => {
    const { container } = render(<HomePage />);

    expect(container).toMatchSnapshot();
  });

  it("should display Admin and User login forms", () => {
    render(<HomePage />);

    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
  });

  it("should display QR Code reader when button is clicked", () => {
    render(<HomePage />);

    fireEvent.click(
      screen.getByText("Login with Qr Code")
    );

    expect(screen.getByText("QrCode")).toBeInTheDocument();
  });
});
