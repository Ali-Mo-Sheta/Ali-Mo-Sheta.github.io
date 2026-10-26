# Ali Sheta — Portfolio Website

A responsive, static portfolio website built with plain HTML, CSS, and JavaScript. It includes project case studies, categorized skills, an expandable certificates collection, education, and a dark contact form. The contact form uses FormSubmit as a hosted email endpoint, with a mailto fallback; it has no custom backend or framework.

## Theme

The site uses a fixed, dark-only color palette with stronger text contrast and larger body copy for readability. There is no light-mode toggle or automatic light-mode variant.

## Preview locally

1. Extract the ZIP file.
2. Open `index.html` in a modern browser.

For local development, you can also run a simple static server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Customize

- Update copy, education, project descriptions, and links in `index.html`.
- Add certificates by copying an existing linked `.certificate-card` block inside `.certificate-grid`. Use URL-encoded spaces and special characters in the relative PDF path.
- Add or remove skills by editing the grouped `.toolkit-group` rows in the Skills section.
- Contact form submissions are routed through FormSubmit to `alisheta550@gmail.com`. On first use, submit a test message from a hosted site and click the activation email FormSubmit sends to your inbox. A static `file://` preview may use the mail app fallback instead.
- Change colors and responsive layout in `styles.css` under `:root` and the media queries.
- Edit the project detail dialog content in `script.js`.
- The site uses inline SVG/CSS illustrations, so no image assets need to be downloaded.

## Publish

Upload the contents of this folder to a static hosting service such as GitHub Pages, Netlify, or Vercel. No build step is required.

## Accuracy notes

- The stock-market project makes the user's contribution (data preparation) explicit and labels model work as collaborative.
- The heart-attack project is described as a learning classification project, not a validated medical tool.
- Skills still being learned are separated from tools used in projects.
