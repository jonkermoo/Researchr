import { useEffect, useState } from "react";

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
    return <p className="">Loading...</p>;
  }

  if (status === "found" && pdfURL) {
    return (
      <div className="flex flex-col items-center gap-3 p-4">
        <p className="text-center break-all">{doi}</p>
        <a
          href={pdfURL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
        >
          {pdfURL.endsWith(".pdf") ? "Download Free PDF" : "View Free Version"}
        </a>
      </div>
    );
  }

  if (status === "nofree") {
    return <p className="">Sorry, no results</p>;
  }

  return <p className="">ERROR</p>;
}
