
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import styles from "./styles.module.scss";
import Title from "./index";

describe("Title", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <Title text="Test Title" />
    );

    expect(container).toMatchSnapshot();
  });

  it("should have secondary class when isSecondary is true", () => {
    render(
      <Title text="Test Title" isSecondary={true} />
    );

    const title = screen.getByRole("heading", {
      level: 1,
    });

    expect(title).toHaveClass(styles.secondary);
  });
});
