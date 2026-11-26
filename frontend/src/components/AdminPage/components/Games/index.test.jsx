
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import * as hookGet from "../../../../hooks/useGetData";
import * as hookPost from "../../hooks/usePostData";
import { TabContext } from "../../contexts/TabProvider";
import Games from "./index";

describe("Games", () => {
  let setGamesCountMock;
  let addDataMock;

  beforeEach(() => {
    vi.restoreAllMocks();

    vi.spyOn(hookGet, "useGetData").mockReturnValue({
      data: { data: [] },
      isLoading: false,
      isError: false,
    });

    addDataMock = vi.fn();
    setGamesCountMock = vi.fn();

    vi.spyOn(hookPost, "usePostData").mockReturnValue({
      addData: addDataMock,
      isLoading: false,
    });
  });

  const renderComponent = (component) => {
    return (
      <TabContext.Provider value={{ setTab: setGamesCountMock }}>
        {component}
      </TabContext.Provider>
    );
  };

  it("renders the component", () => {
    const { container } = render(renderComponent(<Games />));

    expect(container).toMatchSnapshot();
  });

  describe("when the data has games", () => {
    beforeEach(() => {
      vi.spyOn(hookGet, "useGetData").mockReturnValue({
        data: {
          data: [
            {
              id: 1,
              date: "22/10/2022",
              name: "Name",
              image: "url",
              team: {
                visitor: "visitor",
                home: "home",
              },
            },
          ],
        },
        isLoading: false,
        isError: false,
      });
    });

    it("should call setTab with the number of games", () => {
      render(renderComponent(<Games />));

      expect(setGamesCountMock).toHaveBeenCalledWith(1);
    });
  });

  describe("when is loading games", () => {
    beforeEach(() => {
      vi.spyOn(hookGet, "useGetData").mockReturnValue({
        data: { data: [] },
        isLoading: true,
        isError: false,
      });
    });

    it("renders the component with loading", () => {
      render(renderComponent(<Games />));

      expect(screen.getByText("Is Loading")).toBeInTheDocument();
    });
  });

  describe("when an error happens", () => {
    beforeEach(() => {
      vi.spyOn(hookGet, "useGetData").mockReturnValue({
        data: { data: [] },
        isLoading: false,
        isError: true,
      });
    });

    it("renders the component with error", () => {
      render(renderComponent(<Games />));

      expect(screen.getByText("UPPSSSS")).toBeInTheDocument();
    });
  });

  describe("when is posting", () => {
    beforeEach(() => {
      vi.spyOn(hookPost, "usePostData").mockReturnValue({
        addData: vi.fn(),
        isLoading: true,
      });
    });

    it("renders the component with loading", () => {
      render(renderComponent(<Games />));

      expect(screen.getByText("is Loading")).toBeInTheDocument();
    });
  });

  describe("when all inputs are filled", () => {
    it("renders the component with inputs filled", async () => {
      const user = userEvent.setup();

      render(renderComponent(<Games />));

      await user.type(
        screen.getByRole("textbox", { name: /name/i }),
        "Game Porto"
      );

      await user.type(screen.getByTestId("date"), "2020-01-02");

      await user.type(
        screen.getByRole("textbox", { name: /image/i }),
        "url"
      );

      await user.type(screen.getByLabelText(/visitor/i), "Porto");
      await user.type(screen.getByLabelText(/home/i), "home");

      expect(
        screen.getByRole("textbox", { name: /name/i })
      ).toHaveValue("Game Porto");

      expect(screen.getByTestId("date")).toHaveValue("2020-01-02");

      expect(
        screen.getByRole("textbox", { name: /image/i })
      ).toHaveValue("url");

      expect(screen.getByLabelText(/visitor/i)).toHaveValue("Porto");
      expect(screen.getByLabelText(/home/i)).toHaveValue("home");
    });

    it("should call addData with correct values", async () => {
      const user = userEvent.setup();

      render(renderComponent(<Games />));

      await user.type(
        screen.getByRole("textbox", { name: /name/i }),
        "Game Porto"
      );

      await user.type(screen.getByTestId("date"), "2020-01-02");

      await user.type(
        screen.getByRole("textbox", { name: /image/i }),
        "url"
      );

      await user.type(screen.getByLabelText(/visitor/i), "Porto");
      await user.type(screen.getByLabelText(/home/i), "home");

      await user.click(screen.getByTestId("submitButton"));

      await waitFor(() => {
        expect(addDataMock).toHaveBeenCalledWith(
          expect.objectContaining({
            date: "2020-01-02",
            name: "Game Porto",
            image: "url",
            team: {
              visitor: "Porto",
              home: "home",
            },
          }),
          expect.anything()
        );
      });
    });
  });
});
