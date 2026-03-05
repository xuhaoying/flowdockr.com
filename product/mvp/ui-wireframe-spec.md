# FlowDockr MVP Complete UI Wireframe Spec

Generated: 2026-03-04
Status: Ready for designer handoff and AI implementation
Goal: Minimal, elegant, and task-first UX that solves one client problem in 30 seconds.

## 1. Design System

### Visual Direction
- Style: Minimal SaaS
- References: Linear, Stripe, Notion, Raycast
- Keywords: minimal, fast, professional, calm

### Color Tokens
- Primary text/button: `#111827`
- Background: `#F9FAFB`
- Accent/focus: `#6366F1`
- Success: `#10B981`
- Border: `#E5E7EB`

### Typography
- Primary font: Inter
- H1: 32px / 600
- Body: 16px / 400
- Button: 14px / 500

## 2. Information Architecture (MVP)

### Live routes
- `/`
- `/scope`
- `/guides`

### Future (hidden in MVP navigation)
- `/payment`
- `/pricing`
- `/deal`

## 3. Home Wireframe

## Layout
```text
Header
Hero
Common situations
Built for freelancers
Footer
```

## Hero
- Title: `Stop client chaos.`
- Subtitle: `Handle scope creep in minutes.`
- Primary CTA: `Generate revision policy`
- CTA target: `/scope`

## Problem section
- Title: `Common situations`
- Cards:
  - `Client keeps asking for revisions`
  - `Client wants extra work`
  - `Client changes project scope`
- Card click target: `/scope`

## Trust section
- Title: `Built for freelancers`
- Labels:
  - Design
  - Video editing
  - Copywriting
  - Consulting
  - Marketing

## 4. Scope Tool Wireframe (`/scope`)

## Layout
```text
Hero
Form
Generate button
Result cards
```

## Hero
- Title: `Stop unlimited revisions.`
- Subtitle: `Create a clear revision policy for your client project.`

## Form fields
- Project type (dropdown)
  - Logo design
  - Website design
  - Video editing
  - Copywriting
  - Marketing
  - Other
- Project price (`$` input)
- Revision rounds included (1-5)
- Client type (dropdown)
  - Startup
  - Small business
  - Agency
  - Enterprise

## Primary action
- Button label: `Generate your revision policy`

## 5. Result Wireframe

## Section title
- `Your revision policy`

## Result cards
- Revision policy
- Scope rule
- Client message
- Contract clause

Each card includes:
- Copy button
- Copy feedback state: `Copied`

## 6. SEO Guide Page Wireframe

Example: `/guides/client-keeps-asking-for-revisions`

## Structure
```text
Title
Problem explanation
Why it happens
How to prevent it
CTA block
```

## CTA block
- Label: `Generate your revision policy`
- Button target: `/scope`

## 7. UI Kit Spec

## Button
- Background: `#111827`
- Text: white
- Radius: 12px
- Padding: `14px 20px`
- Hover: opacity 0.9

## Input
- Border: `#E5E7EB`
- Radius: 10px
- Padding: 12px
- Focus border/ring: `#6366F1`

## Card
- Background: white
- Radius: 14px
- Shadow: small
- Padding: 20px

## Copy button
- Border: `#E5E7EB`
- Radius: 8px
- Padding: `8px 12px`
- Success state: `Copied` with green style (`#10B981`)

## 8. Microinteractions

- Generate loading:
  - Text: `Generating policy...`
  - Spinner + disabled submit state
- Copy feedback:
  - Button turns success green with check icon
- Auto-scroll:
  - After generation, smooth scroll to results
- Input persistence:
  - Restore unfinished form on refresh

## 9. Mobile Wireframe

## Flow
```text
Hero
Form (single column)
Generate button (full width)
Results (stacked cards)
```

## Rules
- Inputs stack vertically
- Main action width = 100%
- No horizontal scroll

## 10. Figma Frame Structure

## Home frame
```text
Header
Hero
ProblemSection
TrustSection
Footer
```

## Scope frame
```text
Hero
ScopeForm
ResultCards
```

## Reusable components
```text
Button
Input
Dropdown
Card
CopyButton
```

## 11. Experience KPI

First-run user path:
- Google -> Guide -> Scope Tool -> Generate -> Copy

Target:
- Complete value moment within 30 seconds.
