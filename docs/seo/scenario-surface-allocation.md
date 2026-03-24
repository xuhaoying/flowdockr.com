# Scenario Surface Allocation

This document defines which canonical scenario pages should appear on each real scenario-exposure surface in Flowdockr.

## Real surfaces in the codebase

### Homepage

- `HomepageScenarioGrid`
- Role: front-door attack surface

### Scenario hub

- `scenarioHubData.popularScenarios`
- `scenarioHubData.clusters`
- Role: attack index plus cluster exploration

### Tools

- `/tools` card-level `Linked situations`
- `/tools` "Need scenario context first?"
- `/tools/[slug]` `RelatedScenarios`
- Role: high-intent tool-entry bridge to canonical scenarios

### Individual scenario pages

- `Similar scenarios`
- `Next-step scenarios`
- fallback related block when no grouped data exists
- Role: sibling discovery plus escalation path

### Other existing scenario exposure surfaces

- `RecommendedScenarios` on guide pages exists
- Current status: static legacy surface, not changed in this pass

## Surface roles

### Homepage

- Show only primary attack pages
- Bias toward pricing, payment, and scope boundaries
- Do not lead with ghosting pages

### Hub popular

- Show primary attack pages with `clusterCore`
- Treat this as the main internal index of pages worth promoting externally

### Hub clusters

- Show primary pages first
- Pull one representative secondary page into the early visible slice
- Keep the rest of the cluster live so support pages still reinforce coverage

### Tools index

- Show a narrow set of primary pages that are close to immediate tool use
- Keep the mix money-first, with one boundary page
- Do not mirror hub popular exactly

### Tool detail pages

- Show scenario links that fit the tool's usage intent
- Keep primary pages dominant
- Leave room for one support page so the tool surface still acts as a bridge, not only a mirror of attack pages

### Scenario similar

- Prefer sibling or nearby-intent pages
- Support pages are useful here and should stay visible

### Scenario next-step

- Prefer higher-value or higher-risk escalation pages
- Primary pages should win when the next decision gets more expensive or more urgent

## Current allocation rules

- Homepage groups: pricing pushback, payment pressure, scope boundaries
- Hub popular: primary + `clusterCore`
- Hub cluster sections: first two strongest pages, then one representative support page, then the rest by exposure
- Tools index: `quote-too-high`, `discount-request`, `ask-for-payment-politely`, `out-of-scope-professionally`
- `reply-generator`: pricing + payment + boundary mix with one support bridge
- `price-negotiation-email-generator`: pricing-heavy mix with one support bridge

## Rule for future surfaces

- Ask whether the surface is an attack surface, a cluster exploration surface, or a path surface
- Attack surfaces should prefer primary pages
- Cluster exploration surfaces should blend primary pages with representative support pages
- Path surfaces should allow support pages to carry sibling discovery
- Do not let every new surface default to the same top 8 pages
