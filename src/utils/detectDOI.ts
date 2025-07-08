export default function detectDOI(): string | null {
      const regex = /\b10\.\d{4,9}\/[-._;()/:A-Z0-9]+\b/i;
      const text = document.body.innerText;
      const match = text.match(regex);
      return match ? match[0] : null;
    }