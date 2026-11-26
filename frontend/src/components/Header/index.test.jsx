
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UsersContext } from "../../contexts/UsersProvider";
import Header from "./index";

describe("Header", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <UsersContext.Provider value={{ countUsers: 0 }}>
        <Header />
      </UsersContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should display the number of users", () => {
    render(
      <UsersContext.Provider value={{ countUsers: 5 }}>
        <Header />
      </UsersContext.Provider>
    );

    expect(screen.getByText("Users: 5")).toBeInTheDocument();
  });
});
