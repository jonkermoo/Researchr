export default function detectDOI(text: string): string | null {
      const regex = /\b10\.\d{4,9}\/[-._;()/:A-Z0-9]+\b/i;
      const match = text.match(regex);
      return match ? match[0] : null;
    }