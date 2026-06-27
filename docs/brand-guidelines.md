# FlowDockr Brand Guidelines

## Brand Keywords

- Calm Intelligence
- Flow
- Dock
- Workspace
- Automation
- Clean
- Reliable
- Fresh
- Premium SaaS

## Logo Usage

FlowDockr uses the Flow Ribbon F mark: a clear letter F built from soft rounded ribbon strokes. The mark should read as an F at first glance and must not be rotated, mirrored, stretched, or redrawn as an abstract symbol. The current SVG assets use layered purple, lavender, and cyan vector shapes to create a stable blue-purple ribbon effect across browsers, app icons, and build-time icon renderers.

- Use `public/logo.svg` for horizontal brand placement in headers, footers, and marketing surfaces.
- Use `public/logo-mark.svg` for compact UI such as sidebars, loading states, avatars, and small app surfaces.
- Use `public/favicon.svg` for browser icons where clarity at 16x16 and 32x32 matters.
- Use `public/app-icon.svg` for PWA, app, and file-icon contexts.
- Keep the SVG assets as native vector paths and shapes. Do not replace them with PNG exports, screenshots, base64 images, or font-dependent text.

## Color Tokens

CSS variables are defined in `src/config/style/theme.css`, and TypeScript constants are available in `src/lib/brand-colors.ts`.

```css
--brand-primary: #6c63ff;
--brand-purple-soft: #8a7bff;
--brand-lavender: #b39dff;
--brand-cyan: #57d0e6;
--brand-bg: #f3f4fa;
--brand-text: #0f172a;
```

Tailwind classes are available as `brand-primary`, `brand-purple-soft`, `brand-lavender`, `brand-cyan`, `brand-bg`, and `brand-text`.

## Buttons

Primary actions use a restrained blue-purple-to-cyan gradient, white text, 10-12px radius, and a soft brand-colored shadow. Secondary actions use a white or very light background, brand lavender borders, and brand-primary hover text.

## Cards

Cards should use white backgrounds, light lavender-tinted borders, 8-14px radius, and subtle neutral shadows. Avoid nested cards unless the inner card is a repeated item, modal, or functional tool surface.

## Backgrounds

Use `#F3F4FA`, white, and localized soft blue-purple gradients. Flow line decoration is preferred when motion or flow needs to be implied. Keep backgrounds light and spacious.

## Do Not

- Do not use PNG, screenshots, or AI-generated raster logos as brand assets.
- Do not make the mark look like an S, a 5, a lightning bolt, or an abstract glyph.
- Do not use neon glow, cyberpunk effects, game-style colors, or heavy bloom.
- Do not cover large sections in saturated purple.
- Do not introduce unrelated one-off accent palettes for core product surfaces.

## Keeping Pages Consistent

New pages should import the existing shared UI primitives, use the brand CSS variables or Tailwind `brand-*` classes, and reuse the SVG logo files from `public`. Primary CTAs should use the shared `Button` default variant. Repeated content cards should use white backgrounds, light brand-lavender borders, high-contrast `brand-text`, and restrained shadows.
