/*import { useEffect, useState } from "react";
import detectDOI from "./utils/detectDOI";*/

import Header from "./components/screens/Header";

function App() {
  /*  const [screen, setScreen] = useState("loading");


  useEffect(() => {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    const searchEngines = [
      "google.com",
      "bing.com",
      "yahoo.com",
      "duckduckgo.com",
    ];
    const isHomepage = pathname === "/" || pathname === "";
    const isSearchEngine = searchEngines.some((engine) =>
      hostname.includes(engine)
    );

    if (isSearchEngine && isHomepage) {
      setScreen("welcome");
    } else if (detectDOI()) {
      setScreen("doi");
    } else {
      setScreen("nodoi");
    }
  }, []);*/

  return (
    <div className="grid grid-rows-[2fr_11fr_1.2fr] h-full">
      {/*header*/}
      <div className="border-b-1 border-[#CDCDCD]">
        <Header />
      </div>

      {/*body*/}
      <div className="border-b-1 border-[#CDCDCD]">
        <div className="text-black">Test</div>
      </div>

      {/*footnote*/}
      <div className="flex justify-center items-center">
        <div className="text-[#494949]">© 2025 Researchr</div>
      </div>
    </div>
  );
}

export default App;
