# Open Graph Image Guidelines

## Current Status
The `og-image.svg` is a **placeholder template** for development.

## For Production Launch

Convert the SVG to a **1200x630 PNG** for optimal social media compatibility:

### Method 1: Online Converter
1. Go to https://cloudconvert.com/svg-to-png
2. Upload `og-image.svg`
3. Set dimensions: 1200x630
4. Download as `og-image.png`
5. Replace the SVG reference in `index.html`

### Method 2: Design Tool (Recommended)
Use Figma, Canva, or Photoshop to create a custom design:

**Specifications:**
- Size: 1200x630 px
- Format: PNG or JPG
- Max file size: < 1 MB (ideally < 300 KB)
- Safe zone: Keep important content 100px from edges

**Design Elements:**
- Background: #0A0E1A (dark space)
- Primary text: #FFFFFF (white)
- Accent: #00F5FF (cyan)
- Logo: Lightning bolt (⚡)
- Text: "Sparkfined - Professional Crypto Trading Analytics"
- Tagline: "Transform from reactive to data-driven trading"
- URL: sparkfined.xyz

### Testing
Test your OG image:
- https://www.opengraph.xyz/
- https://cards-dev.twitter.com/validator
- https://developers.facebook.com/tools/debug/

### File Naming
- Production file: `og-image.png` or `og-image.jpg`
- Update path in `index.html`: `<meta property="og:image" content="https://sparkfined.xyz/og-image.png" />`
