import { render, act } from "@testing-library/react";
import { WhatsAppContact } from "@components/WhatsAppContact";
import { minimalConfigTest } from "./configTest";
import { translations } from "@/translation";
import type { WhatsAppContactProps } from "@/types";

describe("Testing WhatsAppContact component", () => {
  let screen = render(<></>);

  async function renderScreen(config = minimalConfigTest) {
    await act(async () => {
      screen = render(<WhatsAppContact {...config} />);
    });
  }

  async function getElements(language: WhatsAppContactProps["language"]) {
    return {
      wacIcon: screen.queryByTitle(translations[language].openButtonAlt),
      wacCloseButton: screen.queryByTitle(translations[language].closeButtonAlt),
      wacTitle: screen.queryByTestId("wac-title"),
      wacBody: screen.queryByTestId("wac-body"),
    };
  }

  test("Should render the component with default values", async () => {
    await renderScreen();
    // screen.debug(undefined, Infinity)
    const { language } = minimalConfigTest;
    // const { waIcon } = await getElements(language);
    const { wacBody } = await getElements(language);
    console.log(wacBody?.className);
    console.log(getComputedStyle(wacBody as  HTMLElement));
  });
});
