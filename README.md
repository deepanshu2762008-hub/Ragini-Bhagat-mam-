# The Teacher's Sketchbook — a long-form portfolio

A premium, scrolling personal portfolio for a teacher, built as **a digital
notebook documenting a professional journey**: warm paper, torn edges,
handwritten annotations, pinned documents, editorial typography and quiet
motion. Fifteen connected sections, one continuous narrative.

- **Stack:** React 18 + Vite + TypeScript, Lenis (smooth scroll),
  GSAP + ScrollTrigger (pinning, horizontal scroll, parallax),
  Framer Motion (dialogs, menu, UI transitions), IntersectionObserver
  (reveals + active-section tracking).
- **Design system:** plain CSS variables in `src/styles/tokens.css`.
  No UI component library, no Tailwind, no card grids.

---

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build to /dist
npm run preview    # serve the production build locally
```

Node 18+ is recommended.

---

## Project structure

```
src/
  components/
    layout/        SmoothScroll (Lenis+GSAP), Nav (desktop pill + mobile menu), ScrollProgress
    ui/            Reveal, Counter, TornDivider, Decorations (tape, clip, leaf…), Icons
    art/           SubjectArt, InterestArt — inline hand-drawn SVG illustrations
    SketchbookCover.tsx   ← marked slot for the real MengToSketchbookLandingPage
    Lightbox.tsx           (code-split)
    CertificateViewer.tsx  (code-split)
    ProjectDetail.tsx
  sections/        Cover … Signature (15 sections) + NotFound
  hooks/           useInView, useActiveSection, useDialog, usePrefersReducedMotion, useCopyToClipboard
  data/portfolio.ts        ← single source of truth for all content
  data/nav.ts              ← nav items ↔ section id mapping
  types/index.ts           ← content interfaces
  styles/          tokens.css · base.css · layout.css · dialogs.css · sections-a/b/c.css · print.css
  utils/seo.ts             ← head tags + Person JSON-LD driven from data
public/
  images/          generated SVG placeholder artwork (replace with your own)
  404.html         standalone static 404 page
```

---

## How to edit your content and replace images

**Everything personal lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).**
No component hardcodes a name, date, quote, number or image path — edit the
data file and the whole site updates.

1. **Identity** — `teacherName`, `designation`, `tagline`, `intro`, `bio[]`,
   `portraitImage`.
2. **Career** — `education[]`, `experience[]`, `journey[]` (the timeline),
   `subjects[]`, `skills[]`, `stats[]` (the animated counters), `achievements[]`.
3. **Work** — `projects[]` (name, year, role, description, images, details),
   `gallery[]` (image, caption, rotation, size, alt), `certificates[]`.
4. **Voice & future** — `testimonials[]`, `classroomMemories[]`, `futureVision`.
5. **Contact** — `contactInformation`, `socialLinks`, and `seoMeta`
   (title/description/OG image used by search engines and social cards).

### Replacing images

- Placeholder artwork lives in [`public/images/`](public/images) — original
  generated SVG compositions (paper textures, botanical line art, abstract
  classroom scenes). **No stock or copyrighted images are used.**
- Drop your own file into `public/images/` (or point at any URL) and update the
  matching path in the data file, e.g.

  ```ts
  export const portraitImage = '/images/my-portrait.jpg';
  export const gallery = [
    { image: '/images/my-classroom.jpg', caption: '…', rotation: -1.4,
      size: 'lg', alt: 'Describe the photo for screen readers' },
  ];
  ```

- Always write meaningful `alt` text; decorative artwork is already marked
  `aria-hidden` in the components.
- Certificates: set `downloadable: true` and, for a real PDF,
  `pdf: '/documents/your-file.pdf'`. Without `pdf`, the download falls back to
  the `fullImage`.
- Subject and interest illustrations are **keyed inline SVGs**
  (`src/components/art/SubjectArt.tsx`, `InterestArt.tsx`); the `illustration`
  field in the data file selects one by key (e.g. `'chalkboard'`).

### Editing SEO

`seoMeta` drives `<title>`, the meta description, Open Graph / Twitter tags and
the `Person` JSON-LD structured data (applied at runtime by
`src/utils/seo.ts`). The static tags in `index.html` are fallbacks for
no-JS crawlers — update both if you want them identical.

---

## Section & navigation mapping

| Nav item     | Sections (ids)                                          |
| ------------ | ------------------------------------------------------- |
| Home         | 1 Cover — `#home`                                       |
| About        | 2 About Me — `#about`                                   |
| Journey      | 3 My Journey — `#journey`                               |
| Philosophy   | 4 Teaching Philosophy — `#philosophy`                   |
| Experience   | 5 Subjects — `#subjects`, 6 Classroom — `#classroom`    |
| Achievements | 7 Achievements — `#achievements`                        |
| Projects     | 8 Selected Work — `#projects`                           |
| Impact       | 9 Beyond the Classroom — `#beyond-classroom`, 10 Skills — `#skills` |
| Certificates | 11 Certificates — `#certificates`                       |
| Contact      | 12 Beyond Teaching — `#beyond-teaching`, 13 Looking Ahead — `#looking-ahead`, 14 Let's Connect — `#connect`, 15 Signature — `#signature` |

The mapping lives in [`src/data/nav.ts`](src/data/nav.ts); the active item is
tracked with a thin IntersectionObserver band across the middle of the viewport.

---

## The SketchbookCover slot

The project was checked for an existing **`MengToSketchbookLandingPage`**
component before anything was written: **it does not exist here**, so nothing
was faked or approximated. The Cover section renders its own original
sketchbook opening and contains a clearly marked slot:

- [`src/components/SketchbookCover.tsx`](src/components/SketchbookCover.tsx)
  currently returns `null` and documents exactly how to drop the real component
  in (authored source, shaders, motion, interactions and asset paths preserved
  as-is).
- The ThreeUI documentation page is never embedded or recreated.

---

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`,
  `figure/figcaption`, `blockquote`, `address`), skip-to-content link.
- Every dialog (lightbox, certificate viewer, project detail, mobile menu) is
  `role="dialog" aria-modal="true"` with a focus trap, Esc to close and focus
  restoration.
- Visible focus rings everywhere; icon buttons carry `aria-label`s; gallery and
  certificate images have alt text; the animated counters expose only their
  final value to screen readers.
- Contrast follows WCAG AA; the handwriting font (Caveat) is used only for
  decoration — never for essential information.
- `prefers-reduced-motion`: Lenis is not started, GSAP pinning/parallax and
  counters are skipped, reveals resolve to their final state, and the signature
  and skill strokes render fully drawn.

## Performance notes

- Animations use transform/opacity only (plus one stroke-dash draw for the
  hand-drawn marks); `will-change` is applied to two scrub targets.
- Images are lazy-loaded with `decoding="async"` and explicit `width`/`height`
  (no layout shift).
- The gallery lightbox and certificate viewer are code-split with `React.lazy`.
- Fonts load with `display=swap`, preconnect and stylesheet preload.
- Decorative CSS animations pause when their section leaves the viewport; all
  ScrollTriggers/observers are reverted on unmount.
- A print stylesheet (`src/styles/print.css`) produces a clean paper version.

## Deployment

```bash
npm run build   # outputs static files to /dist
```

Serve `/dist` on any static host (Netlify, Vercel, GitHub Pages, Cloudflare
Pages). A standalone `public/404.html` covers static hosts; unknown paths also
render the in-app 404 route.

> **Placeholder content:** every name, date, quote and image in this project is
> invented sample content. Replace it with your own before publishing.
