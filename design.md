# Design System Specification: Smoked Jade & Whisper Glass (`design.md`)

## 1. Design Concept
**"Smoked Jade & Whisper Glass"** is an original, dark-only editorial design system that marries the airy, unboxed readability of modern micro-portfolios with **five signature architectural touches** so the design feels distinctly yours—never a 1:1 clone of `abrory.pages.dev` and never generic "AI slop".

### How It Differs from the Reference (`abrory.pages.dev`)
| Dimension | Reference (`abrory.pages.dev`) | Our Original Design ("Smoked Jade & Whisper Glass") |
| :--- | :--- | :--- |
| **Color Atmosphere** | Pure grayscale monochrome (`#080808` black & `#eeeeee` gray) | **Deep Obsidian-Jade (`#0C100E`)** canvas with **Sage-Emerald (`#34D399`)** whisper accents & ambient mist |
| **Top Header** | Starts immediately with Name | **Editorial Telemetry Rail** (`00 // PORTFOLIO` · Live local time `WIB / UTC+7` · Emerald availability dot) above the open Hero |
| **Section Headers** | Plain text `h2` | **Architectural Index Headers** (`01 // Experience`, `02 // Capabilities`, etc.) with monospace index numbers |
| **Experience Layout** | 4-column horizontal dots that vanish when clicking `See more` | **Interactive Timeline Rail**: Segmented category filter (`All`, `Professional`, `Organization`, `Freelance`) + individual expandable rows with a glowing left emerald indicator bar + `Expand all` toggle |
| **Projects Layout** | Single-column plain text list | **2-Column Editorial Bento Grid**: Compact 2-column whisper-glass cards with domain icon wells, metric descriptions, and a monospace tech-stack micro-footer (`Python · GRU · React`) |
| **Credentials Layout** | Single static Education line | **Dual-Mode Credential Ledger**: Segmented filter (`All`, `Education`, `Certifications`), inline emerald GPA pill for degrees, and `Verify ↗` pills + Credential IDs for certificates |

---

## 2. Visual Direction & Anti-"AI Slop" Rules
1. **Open Canvas Breathing Room**: The Hero bio, Skills matrix, and resting Experience/Credential rows sit cleanly on the `#0C100E` canvas without heavy neon boxes.
2. **Selective / Whisper Glassmorphism**: Frosted glass (`backdrop-filter: blur(14px)`) and specular `1px` borders are applied selectively to:
   - Tactile CTA buttons (`Book a call` & `Email`)
   - Segmented Filter Pill Bars (`All / Professional / Organization` and `All / Education / Certifications`)
   - The **2-Column Project Cards** (whisper-quiet `rgba(255,255,255,0.05)` hairline at rest, awakening with a smoked-jade radial spotlight and emerald glint on hover)
   - Expanded Experience rows (`rgba(20, 29, 25, 0.55)` with a `2px` `#34D399` left accent bar).
3. **Bespoke Stroke & Brand Iconography**: Every role, skill, project, and credential uses a crisp `1.75px` stroke SVG or official monochrome brand mark (`SimpleIcons`)—zero emojis or generic placeholder shapes.

---

## 3. Color Palette

### 3.1 Core Canvas & Glass Surface Tokens
| Token Name | CSS Variable | Value | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Base** | `--bg` | `#0C100E` | Primary page background (Deep Obsidian-Jade, not pitch black) |
| **Panel Surface** | `--panel` | `#121815` | Recessed segmented tab track & icon wells |
| **Panel Surface 2** | `--panel-2` | `#17201C` | Secondary surface / active press state |
| **Whisper Glass Rest** | `--glass-rest` | `rgba(18, 25, 22, 0.38)` | Subtle resting fill for 2-column project cards |
| **Whisper Glass Hover** | `--glass-hover` | `rgba(23, 33, 29, 0.68)` | Hover/expanded glass fill (`backdrop-filter: blur(14px)`) |
| **Top Ambient Mist** | `--ambient-mist` | `radial-gradient(640px circle at 50% 0%, rgba(52, 211, 153, 0.06), transparent 70%)` | Fixed top atmospheric lighting |
| **Cursor Aura** | `--aura` | `rgba(52, 211, 153, 0.05)` | Subtle `240px` radial ambient light following fine pointers |
| **Project Spotlight** | `--project-glow` | `rgba(52, 211, 153, 0.085)` | Radial spotlight inside hovered project/credential cards |

### 3.2 Typography & Line Hierarchy Tokens
| Token Name | CSS Variable | Value | Usage |
| :--- | :--- | :--- | :--- |
| **Text Primary** | `--text` | `#EDF2EF` | Name `h1`, section headings, item titles, active labels |
| **Text Body** | `--body` | `#C4CECA` | Intro bio paragraphs, skill item names |
| **Text Soft** | `--soft` | `#B2BFBA` | Expanded experience bullet points |
| **Text Muted** | `--muted` | `#8E9E98` | Role subtitle, company names, project descriptions, skill category labels |
| **Text Dim** | `--dim` | `#667771` | Dates, locations, project tech footers, section index numbers |
| **Hairline Border** | `--line` | `rgba(255, 255, 255, 0.065)` | Resting hairline border on project cards & timeline dividers |
| **Strong Line** | `--line-strong` | `rgba(255, 255, 255, 0.13)` | Specular top highlights & active timeline connectors |

### 3.3 Emerald Accent & Semantic Category Tokens
| Token Name | CSS Variable | Value | Usage |
| :--- | :--- | :--- | :--- |
| **Emerald Accent** | `--accent` | `#34D399` | Section indices (`01`), active tab text, expanded row indicator bar |
| **Emerald Deep** | `--accent-deep` | `#10B981` | Live telemetry availability dot & pulse |
| **Emerald Soft Fill** | `--accent-soft` | `rgba(52, 211, 153, 0.11)` | Active segmented pill fill, GPA pill fill, `Pro`/`Edu` badge background |
| **Emerald Border** | `--accent-border` | `rgba(52, 211, 153, 0.28)` | Active pill border & hovered card border glint |
| **Category: Pro / Edu** | `--cat-pro` | `#34D399` | Text/border tint for `Professional` & `Education` badges |
| **Category: Org / Cert** | `--cat-org` | `#5EEAD4` | Text/border tint (`rgba(94, 234, 212, 0.11)`) for `Organization` & `Certification` badges |
| **Category: Freelance** | `--cat-free` | `#CBD5E1` | Text/border tint (`rgba(203, 213, 225, 0.09)`) for `Freelance` badges |

---

## 4. Typography

### 4.1 Dual Font Stack
- **Primary Sans (`--font-sans`)**: `"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  - Clean, modern geometric sans-serif for headings, bio paragraphs, descriptions, and skills.
- **Technical Monospace (`--font-mono`)**: `"JetBrains Mono", "Fira Code", monospace`
  - Used for section index numbers (`01 //`), the top telemetry bar, date ranges, category badges (`PRO`, `ORG`), project tech-stack footers (`Python · SQL · Docker`), GPA pills, and Credential IDs. This sans + mono pairing creates a signature technical character distinct from the reference.

### 4.2 Type Scale
| Element | Font | Size (Desktop / Mobile) | Weight | Line Height | Color |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Telemetry Bar** | `--font-mono` | `10.5px` / `10px` | `500` | `1.2` | `--dim` / `--accent` |
| **Hero Name (`h1`)** | `--font-sans` | `18px` / `16px` | `700` | `1.25` | `--text` (`-0.02em`) |
| **Hero Role Subtitle** | `--font-sans` | `13.5px` / `13px` | `500` | `1.45` | `--muted` |
| **Hero Bio (`.intro`)** | `--font-sans` | `13.5px` / `13px` | `400` | `1.6` | `--body` |
| **Section Index (`01 //`)** | `--font-mono` | `11px` / `10.5px` | `600` | `1` | `--accent` |
| **Section Heading (`h2`)** | `--font-sans` | `14px` / `13.5px` | `700` | `1.3` | `--text` |
| **Segmented Filter Tab** | `--font-sans` | `11px` / `10.5px` | `600` | `1` | `--muted` (Active: `--accent`) |
| **Item Title (`h3`)** | `--font-sans` | `12.5px` / `12px` | `700` | `1.35` | `--text` |
| **Subtitle / Description** | `--font-sans` | `11.5px` / `11px` | `400` | `1.5` | `--muted` |
| **Dates / Badges / Tech Footer** | `--font-mono` | `10.5px` / `10px` | `500` | `1.35` | `--dim` (`tabular-nums`) |

---

## 5. Spacing & Layout Grid

- **Shell Container (`.shell`)**:
  - `width: min(600px, calc(100% - 40px))` on desktop (`calc(100% - 28px)` on mobile `<= 520px`).
  - `margin-inline: auto; padding: 36px 0 72px;`
- **Section Vertical Spacing**:
  - `margin-top: 40px` between major sections.
  - `margin-bottom: 14px` between `.section-head` and section content.
- **2-Column Project Grid (`.projects-grid`)**:
  - `display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px;` on desktop (`1` column on `<= 520px`).

---

## 6. Border Radius & 7. Shadows / Blur
- **Radii**:
  - `--radius-card: 10px` (Project cards, expanded Experience drawers, Credential hover rows)
  - `--radius-btn: 8px` (Primary & secondary CTA buttons, icon wells)
  - `--radius-pill: 9999px` (Segmented filter tabs, category badges, GPA & Verify pills)
- **Tactile Buttons**:
  - **Primary Button (`Book a call`)**: Mineral sage-white gradient (`linear-gradient(180deg, #F4FBF7 0%, #DCECE4 100%)`), dark text `#0C100E`, border `#B8D8C8`, physical bottom edge `0 1.5px 0 #7FA896, 0 6px 16px rgba(0, 0, 0, 0.35)`.
  - **Secondary Glass Button (`Email`)**: Smoked jade glass (`linear-gradient(180deg, rgba(28, 39, 34, 0.85), rgba(18, 25, 22, 0.92))`), `backdrop-filter: blur(10px)`, border `rgba(255, 255, 255, 0.1)`, top specular inset `inset 0 1px 0 rgba(255, 255, 255, 0.08)`.

---

## 8. Core Components & Signature Touches

### 8.1 Signature Touch #1: Top Telemetry & Availability Rail (`.telemetry-bar`)
- Sits above the Hero with a bottom `1px` hairline (`var(--line)`), `padding-bottom: 12px; margin-bottom: 22px`.
- Left: Monospace label `00 // PORTFOLIO` + live local clock (`SURABAYA · 11:27 WIB`).
- Right: Subtle availability indicator with a `6px` pulsing `#10B981` dot + `Available for select roles`.

### 8.2 Open Hero Header
- **Topline**: Left shows `h1` Name + `.role` subtitle; Right shows 4 borderless `30x30px` stroke icon links (`GitHub`, `LinkedIn`, `Email`, `Resume PDF`) that softly glow and lift (`translateY(-1px)`) on hover.
- **Bio Copy**: 2 concise paragraphs with underlined location link.
- **CTA Row**: `Book a call` + `Email` buttons.

### 8.3 Signature Touch #2: Interactive Experience Timeline Rail (`.experience-list`)
- **Section Header**:
  - Left: `<span class="sec-idx">01 //</span> <h2>Experience</h2>`
  - Right: **Segmented Glass Pill Bar** (`All`, `Professional`, `Organization`, `Freelance`) with subtle monospace count badges, plus a minimal `Expand all` toggle button.
- **Experience Row Anatomy (`.exp-item`)**:
  - Sits along a subtle left vertical timeline track (`border-bottom: 1px solid var(--line)`).
  - **Summary Row (Always Visible)**:
    - Left: `28x28px` recessed icon well (`--panel`) housing a `16px` bespoke role stroke SVG + **Role Title** + `· Company Name` + **Semantic Category Pill** (`Pro`, `Org`, `Freelance`).
    - Right: Monospace Date Range + subtle chevron icon (`▾`).
  - **Active / Expanded State (`[aria-expanded="true"]`)**:
    - Reveals a glowing `2px solid var(--accent)` left indicator bar and soft smoked-jade glass background (`var(--glass-hover)`).
    - Smoothly expands (`grid-template-rows: 0fr -> 1fr`) to show location metadata and 2–4 impact bullet points with emerald markers.

### 8.4 Signature Touch #3: Unboxed Capability Matrix with Row Illumination (`.skill-rows`)
- **Section Header**: `02 // Capabilities`.
- **2-Column Unboxed Layout**: `120px` category label on the left (`Language`, `Frontend`, `Backend`, `AI / ML`, `Data`, `Infrastructure`); inline flex list of `14px` monochrome brand/stroke icons + plain text on the right.
- **Row Illumination**: Each row has a `2px solid transparent` left accent border; hovering anywhere on a skill row transitions the left border to `var(--accent)`, brightens the category label to `--text`, and brings all icons in that row to `100%` opacity.

### 8.5 Signature Touch #4: 2-Column Editorial Project Bento Grid (`.projects-grid`)
- **Section Header**: `03 // Selected Projects` on left; `All repositories ↗` on right.
- **Card Anatomy (`.project-card`)**:
  - Compact 2-column cards (`padding: 14px; border-radius: 10px; background: var(--glass-rest); border: 1px solid var(--line)`).
  - **Top Row**: `28x28px` icon well with `16px` domain stroke SVG on the left; Monospace domain badge (`ML · Forecasting`) + animated diagonal arrow `↗` on the right.
  - **Middle**: Bold `.project-name` (`12.5px`) + 2-line metric-focused `.project-desc` (`11px`).
  - **Bottom Micro-Footer**: Hairline top divider + monospace tech stack list (`Python · GRU · React`).
  - **Hover State**: Awakens radial cursor spotlight (`--project-glow`), transitions border to `var(--accent-border)`, and translates the `↗` arrow `2px` up-right.

### 8.6 Signature Touch #5: Dual-Mode Credential Ledger (`.credentials-list`)
- **Section Header**: `04 // Credentials` on left; **Segmented Glass Pill Bar** (`All`, `Education`, `Certifications`) on right.
- **Row Anatomy (`.cred-item`)**:
  - **Education Row**: Mortarboard SVG in icon well | Institution Name + Degree + inline **Emerald GPA Pill** (`GPA 3.86 / 4.00`) | Right-aligned Monospace Year (`2022–2026`) & Location (`Surabaya`).
  - **Certification Row**: Verified Shield-Check SVG (tinted `--accent`) | Certification Title + Issuer & Monospace ID (`ID: TF-2025-8841`) | Right-aligned Issue Year & interactive **`Verify ↗`** pill badge.

---

## 9. Iconography Specification (Strict Anti-AI-Slop Rules)
All icons use crisp, uniform stroke geometry (`1.75px` stroke, `round` caps/joins) or official SimpleIcons brand SVGs:
- **Social & Action Icons**: `github`, `linkedin`, `mail`, `file-text` (Resume), `calendar` (Book a call), `arrow-up-right` (`↗`).
- **Experience Role Icons**: `monitor-check` (IT/Systems), `scatter-chart` (Data Science), `network-nodes` (AI/ML), `cpu` (Engineering/Community), `code-2` (Software/Web), `pen-tool` (Product Design).
- **Project Domain Icons**: `candlestick` (Forecasting/Finance), `scan-face` (Computer Vision), `leaf` (AgriTech/Bio), `shopping-bag` (Marketplace), `layers` (Design System), `activity` (Analytics).
- **Credential Icons**: `graduation-cap` (Formal Education), `shield-check` (Verified Certification).
- **Skills Icons**: Official monochrome SimpleIcons (`https://cdn.simpleicons.org/<slug>/8E9E98`) with inline SVG stroke fallbacks for domain concepts (`SQL`, `Seaborn`, `Tableau`, `UI/UX`, `Network Support`).

---

## 10. Animation, Responsiveness & Accessibility
- **Smooth CSS Grid Accordions**: `grid-template-rows: 0fr -> 1fr` over `280ms cubic-bezier(0.22, 1, 0.36, 1)`.
- **Category Filter Transition**: `180ms` fade + `translateY(5px -> 0)` stagger (`25ms` per item).
- **Responsive Breakpoint (`<= 520px`)**:
  - `.projects-grid` collapses from 2 columns to 1 column.
  - `.section-head` wraps cleanly so segmented filter pills sit full-width below the heading.
  - `.skill-row` narrows to `92px 1fr`.
- **Accessibility**: Full keyboard navigation (`Tab`, `Enter`, `Space`), `aria-expanded` / `aria-selected` states, WCAG AA/AAA contrast, and `@media (prefers-reduced-motion: reduce)` compliance.
