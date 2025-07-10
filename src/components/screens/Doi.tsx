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

        if (data.is_oa && best?.url_for_pdf) {
          if (isMounted) {
            setPdfURL(best.url_for_pdf);
            setStatus("found");
          }
        } else {
          if (isMounted) setStatus("nofree");
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
        <a href={pdfURL} target="_blank" rel="noopener noreferrer" className="">
          Download
        </a>
      </div>
    );
  }

  if (status === "nofree") {
    return <p className="">Sorry, no results</p>;
  }

  return <p className="">ERROR</p>;
}
