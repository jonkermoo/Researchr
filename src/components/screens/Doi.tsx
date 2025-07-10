import { useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";

interface Props {
  doi: string | null;
}

type Status = "loading" | "found" | "nofree" | "error";

export default function Doi({ doi }: Props) {
  const [status, setStatus] = useState<Status>("loading");
  const [pdfURL, setPdfURL] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const email = import.meta.env.VITE_UNPAYWALL_EMAIL;

    if (!doi) {
      console.error("DOI is null or undefined");
      return;
    }
    fetch(
      `https://api.unpaywall.org/v2/${encodeURIComponent(doi)}?email=${email}`
    )
      .then(async (r) => {
        if (r.status === 404) {
          if (isMounted) setStatus("nofree");
          return;
        }
        if (!r.ok) throw new Error(String(r.status));

        const data = await r.json();
        const best = data.best_oa_location;

        if (data.is_oa && best && (best.url_for_pdf || best.url)) {
          setPdfURL(best.url_for_pdf ?? best.url);
          setStatus("found");
        } else {
          setStatus("nofree");
        }
      })
      .catch(() => isMounted && setStatus("error"));

    return () => {
      isMounted = false;
    };
  }, [doi]);

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center gap-[25px] h-full">
        <div className="text-[16px]" style={{ fontFamily: "Hind, sans-serif" }}>
          Loading...
        </div>
        <div>
          <img src={Logo} alt="Researchr Logo" className="w-[75px] h-auto" />
        </div>
      </div>
    );
  }

  if (status === "found" && pdfURL) {
    return (
      <div className="h-full flex flex-col justify-center items-center gap-[15px]">
        <p
          className="text-center text-[16px] font-bold"
          style={{ fontFamily: "Hind, sans-serif" }}
        >
          We found something!
        </p>
        <a
          href={pdfURL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-[#7F95C3] hover:bg-[#647EB6] text-white text-sm font-medium"
          style={{ fontFamily: "Hind, sans-serif" }}
        >
          {pdfURL.endsWith(".pdf") ? "Download Free PDF" : "View Free Version"}
        </a>
      </div>
    );
  }

  if (status === "nofree") {
    return (
      <div className="flex flex-col justify-center items-center gap-[25px] h-full">
        <div className="text-[16px]" style={{ fontFamily: "Hind, sans-serif" }}>
          We found no matches
        </div>
        <div>
          <img src={Logo} alt="Researchr Logo" className="w-[75px] h-auto" />
        </div>
        <div className="text-[16px]" style={{ fontFamily: "Hind, sans-serif" }}>
          {"Sorry :("}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-[25px] h-full">
      <div className="text-[16px] " style={{ fontFamily: "Hind, sans-serif" }}>
        ERROR
      </div>
      <div>
        <img src={Logo} alt="Researchr Logo" className="w-[75px] h-auto" />
      </div>
      <div className="text-[14px]" style={{ fontFamily: "Hind, sans-serif" }}>
        Please contact us with issues!
      </div>
    </div>
  );
}
