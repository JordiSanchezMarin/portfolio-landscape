# Interactive CV Landscape

A responsive, accessible portfolio built with Vite, React, and TypeScript. The experience uses an original cinematic CSS/SVG lunar landscape with a galactic port, starship, Earth, sun, and clickable landmarks for About, Experience, Education, Skills, and Contact content. No stock imagery or third-party illustration assets are required.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite. To create a production build:

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run preview
```

## Customize the CV

All portfolio copy lives in one file:

```text
src/data/cv.ts
```

Replace every bracketed placeholder with your real details. The file contains:

- Header profile details and short biography
- About highlights
- Work and education timelines
- Skill groups
- Contact links

Keep each section's `id` unchanged because it connects the content to its landscape landmark. You can add, remove, or reorder timeline entries, highlights, and skills without changing the UI components.

## Visual customization

- **Colors, typography, spacing, and responsive behavior:** `src/styles.css`
- **Landscape illustration and landmark positions:** `src/App.tsx`
- **Browser title and metadata:** `index.html`

The project uses carefully chosen system-font stacks and has no external font or image requests.

## Accessibility

Landmarks are native buttons with visible focus states and descriptive labels. Section content opens in a keyboard-trapped dialog, closes with Escape, restores focus to its trigger, and can be dismissed by selecting the backdrop. Mobile users receive a persistent section navigation bar. Animation is disabled when the operating system requests reduced motion.
