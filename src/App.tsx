import Header from "./components/Header";
import Doi from "./components/screens/Doi";
import Welcome from "./components/screens/Welcome";
import detectDOI from "./utils/detectDOI";
import { useEffect, useState } from "react";

type Screen = "loading" | "welcome" | "doi" | "nodoi";

export default function App() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [_foundDoi, setFoundDoi] = useState<string | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs.length) return setScreen("nodoi");

      const tab = tabs[0];
      const url = new URL(tab.url ?? "about:blank");
      const { hostname, pathname } = url;

      const searchEngines = [
        "google.com",
        "bing.com",
        "duckduckgo.com",
        "yahoo.com",
      ];
      const isSearchHome =
        (pathname === "/" || pathname === "") &&
        searchEngines.some((e) => hostname.includes(e));

      if (isSearchHome) {
        setScreen("welcome");
        return;
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id!, allFrames: false },
          func: () => document.body.innerText,
        },
        (results) => {
          const pageText = results?.[0]?.result as string;
          const found = detectDOI(pageText);

          if (found) {
            const cleanDoi = found.replace(/[.,;]+$/, "");
            setFoundDoi(cleanDoi);
            setScreen("doi");
          } else {
            setScreen("nodoi");
          }
        }
      );
    });
  }, []);

  return (
    <div className="grid grid-rows-[2fr_11fr_1.2fr] h-full">
      {/*header*/}
      <div className="border-b-1 border-[#CDCDCD]">
        <Header />
      </div>

      {/*body*/}
      <div className="border-b-1 border-[#CDCDCD]">
        {screen === "welcome" && <Welcome />}
        {screen === "doi" && <Doi doi={_foundDoi} />}
      </div>

      {/*footnote*/}
      <div className="flex justify-center items-center">
        <div className="text-[#494949]">© 2025 Researchr</div>
      </div>
    </div>
  );
}
