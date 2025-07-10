import { useEffect, useState } from "react";

interface Props {
  doi: string;
}

type Status = "loading" | "found" | "nofree" | "error";

export default function Doi({ doi }: Props) {
  const [status, setStatus] = useState<Status>("loading");
  const [pdfURL, setPdfURL] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const email = import.meta.env.VITE_UNPAYWALL_EMAIL;

    fetch(
      `https://api.unpaywall.org/v2/${encodeURIComponent(doi)}?email=${email}`
    )
      .then(async (r) => {
        if (!isMounted) return;
        if (!r.ok) throw new Error(String(r.status));
        const data = await r.json();

        const best = data.best_oa_location;
        if (data.is_oa && best?.url_for_pdf) {
          setPdfURL(best.url_for_pdf);
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
}
