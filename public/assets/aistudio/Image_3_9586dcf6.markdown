---
name: Market Precision
colors:
  surface: '#faf9ff'
  surface-dim: '#d7d9e6'
  surface-bright: '#faf9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#ebedfa'
  surface-container-high: '#e5e8f4'
  surface-container-highest: '#e0e2ee'
  on-surface: '#181b24'
  on-surface-variant: '#434656'
  inverse-surface: '#2d303a'
  inverse-on-surface: '#eef0fd'
  outline: '#737687'
  outline-variant: '#c3c5d8'
  surface-tint: '#004ee8'
  primary: '#0049db'
  on-primary: '#ffffff'
  primary-container: '#2962ff'
  on-primary-container: '#f7f5ff'
  inverse-primary: '#b6c4ff'
  secondary: '#5a5e6b'
  on-secondary: '#ffffff'
  secondary-container: '#dfe2f2'
  on-secondary-container: '#606471'
  tertiary: '#9e3500'
  on-tertiary: '#ffffff'
  tertiary-container: '#c74500'
  on-tertiary-container: '#fff4f1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001550'
  on-primary-fixed-variant: '#003ab3'
  secondary-fixed: '#dfe2f2'
  secondary-fixed-dim: '#c3c6d5'
  on-secondary-fixed: '#171b26'
  on-secondary-fixed-variant: '#434653'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#802a00'
  background: '#faf9ff'
  on-background: '#181b24'
  surface-variant: '#e0e2ee'
  market-up: '#089981'
  market-down: '#F23645'
  badge-red: '#F23645'
  badge-blue: '#0089FF'
  badge-cyan: '#00BCD4'
  surface-bg: '#FFFFFF'
  surface-subtle: '#F0F3FA'
  border-subtle: '#E0E3EB'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
  numeric-quote:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2.5rem
  space-3xl: 4rem
---

## Brand & Style

This design system embodies high-frequency clarity, institutional rigor, and analytical poise tailored for modern financial market intelligence, traders, and quantitative observers. Drawing from contemporary Swiss typography and utilitarian financial terminals, the visual style prioritizes information density, scanning efficiency, and typographic authority over decorative ornamentation. 

The aesthetic is characterized by a stark, crisp canvas with neutral slate foundations, punctuated by vibrant electric blue interactive states, distinct ticker badge accents, and high-visibility financial status indicators (bullish green and bearish red). Visual hierarchy is driven by crisp borders, proportional pill badges, and disciplined alignment rather than heavy shadows or decorative blurs.

## Colors

The palette balances stark, functional neutrals with purposeful operational accents:

- **Primary (`#2962FF`):** The signature vibrant brand blue, utilized for focused states, active navigation indicators, key interactive links, and primary CTA triggers.
- **Secondary (`#131722`):** A deep charcoal black providing ultra-sharp contrast for prominent headlines, active segmented control pills, and primary text.
- **Neutral (`#787B86`):** Balanced mid-tone slate used for secondary labels, table headers, inactive shortcuts, and metadata.
- **Market Dynamics:**
  - **Market Up (`#089981`):** Calibrated emerald green signifying gains, positive deltas, and bullish quotes.
  - **Market Down (`#F23645`):** High-alert crimson indicating losses, negative deltas, and bearish quotes.
- **Badge Accents:** High-saturation identifier pigments (`badge-red` `#F23645`, `badge-blue` `#0089FF`, `badge-cyan` `#00BCD4`) designate key index numbers (e.g., S&P 500, Nasdaq 100, Dow 30) within round ticker avatars.
- **Surfaces & Dividers:** Stark pure white (`#FFFFFF`) serves as the base viewport, accented with `#F0F3FA` for input fields, hovered card tiers, and pill tracks, bound by `#E0E3EB` hairline dividers.

## Typography

Inter serves across all tiers to deliver geometric precision, high legibility at micro sizes, and tabular alignment vital for financial figures.

- **Tabular Figures:** All numeric displays (pricing, market percentage changes, volume, market caps) must activate the `tnum` (tabular numbers) and `cv05` OpenType features to ensure columns remain strictly aligned during live updates.
- **Headings:** Set tightly with negative tracking to convey density and journalistic presence.
- **Body & Captions:** Tuned for rapid scannability, utilizing standardized weights (400 for structural text, 500/600 for column headers, active tabs, and navigation anchors).

## Layout & Spacing

The layout adopts a disciplined fluid container system engineered for large-format displays while reflowing seamlessly to dense mobile dashboards.

- **Grid Architecture:** Desktop views utilize a max-width container (1400px) centered with fluid margins (`margin-desktop: 2.5rem`). Responsive cards and market watchlists distribute evenly across a 12-column grid or fluid auto-fill grid tracks with minimum widths of 280px.
- **Density Scaling:** Vertical padding between section modules relies on `space-2xl` and `space-3xl`, creating airy breaks between dense data collections. Within data modules (tables, ticker bars, indices lists), spacing contracts to `space-xs` and `space-sm` to maintain high data density above the fold.
- **Responsive Adaptations:**
  - **Mobile (< 768px):** Outer margins contract to `margin: 1rem`. Segmented pill navigation bars convert to horizontally scrollable rails with hidden scrollbars. Multi-column market tables prioritize Ticker and Last Price while truncating lower-priority volume metrics.

## Elevation & Depth

Visual depth follows a restrained, flat architectural approach governed by contrast borders and structural backgrounds rather than drop shadows:

- **Base Surfaces:** Flat `#FFFFFF` canvas with zero default shadow.
- **Dividers & Outlines:** Low-contrast hairline borders (`1px solid #E0E3EB`) separate rows, card boundaries, table headers, and pill clusters.
- **Interactive Planes (Cards & Dropdowns):** Subtle hover states rely on background shifts to `#F0F3FA` or `#F8F9FD` instead of elevation lifting. For modal search overlays and flying menus, a crisp ambient shadow is used: `0 4px 20px rgba(19, 23, 34, 0.08)` paired with a `1px solid #E0E3EB` perimeter outline.

## Shapes

The interface balances sharp, analytical rectangular frames for content structures with full pill geometry for interactive and categorizing controls:

- **Segmented Tabs & Buttons:** Utilize full pill radius (`9999px` / `rounded-full`) for navigation containers, search inputs, active indicator pills, and primary CTAs.
- **Ticker Identity Badges:** Circular avatars (`rounded-full`) house index numerical values (e.g., `500`, `100`, `30`), creating visual focal anchors against clean white canvas space.
- **Containers & Tables:** Modular panels, cards, and data groupings adopt soft `rounded-lg` (8px) corners to frame information cleanly without distracting from data alignment.

## Components

### Global Search Input
- **Container:** Pill-shaped (`rounded-full`) background filled with `#F0F3FA`, no border in default state, transitioning to a `1px solid #2962FF` outline on focus.
- **Elements:** Magnifying glass icon on the leading edge (16px, `#787B86`), placeholder text `"Search (Ctrl+K)"`, and a subtle inline keyboard shortcut badge styled with rounded corners and `#787B86` typography.

### Segmented Navigation Pill Rail
- **Track:** Pill-shaped outer container outlined with `1px solid #E0E3EB`, padded with `space-xs`.
- **Items:** Horizontal list of category tabs (`US stocks`, `World stocks`, `Crypto`, `Futures`, `Forex`).
- **Active State:** Solid `#131722` pill background with pure white `#FFFFFF` text.
- **Inactive State:** Transparent background, `#131722` or `#787B86` text, transitioning on hover to a `#F0F3FA` fill.

### Ticker Badges & Market Cards
- **Ticker Card:** Minimalist rounded surface featuring a circular indicator badge (32px diameter) with saturated color fill (`#F23645` for S&P 500, `#0089FF` for Nasdaq 100, `#00BCD4` for Dow 30) displaying white centered bold index numbers.
- **Labeling:** Accompanied by prominent bold index titles (`headline-sm`) followed by live price values and pill percentage changes.

### Market Data Tables & Quotes
- **Header:** Sticky table header with `#787B86` medium-weight micro-labels, hairline border-bottom (`#E0E3EB`).
- **Rows:** Minimum height of 48px, interactive background highlight (`#F8F9FD`) on hover. Numeric fields right-aligned with `tabular-nums`.
- **Delta Indicator:** Positive values rendered in `#089981` with leading `+`, negative values rendered in `#F23645` with leading `−`. Optional colored pill tags with 10% opacity backgrounds for high-emphasis screeners.

### Buttons & Action Controls
- **Primary CTA ("Get started"):** Solid `#131722` fill, `#FFFFFF` text, pill radius, `px-5 py-2.5`, scaling down slightly on active click.
- **Ghost/Icon Navigation:** Transparent background, `#131722` icon with globe/user glyphs, soft `#F0F3FA` circular hover wash.