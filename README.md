## Researchr

Researchr is a lightweight Chrome extension that helps you find free, open-access versions of academic articles. It detects DOIs (Digital Object Identifiers) on any webpage and uses the [Unpaywall API](https://unpaywall.org) to locate legally available PDFs.

## Features:

- Automatically scans the entire active tab for DOIs
- Provides a free PDF or site if an open-access version of the source is available
- Handles paywalled articles
- Works across most publisher websites and academic repositories
- Clean, minimal popup UI with a modern design

## Development:

- React + TypeScript
- Tailwind CSS
- Unpaywall API

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to chrome://extensions
3. Load unpacked

# Run in development:

    npm install
    npm run dev

# Run for production:

    npm run build

## Test it yourself!

# Welcome Page: https://www.google.com

# Free URL: https://academic.oup.com/transactionslinnean/article-abstract/os-9/1/174/2333768

# Free PDF: https://essd.copernicus.org/articles/5/165/2013/

# No Free Alternatives: https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/j.0022-0477.2004.00874.x

# No DOI Found: https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/j.0022-0477.2004.00874.x
