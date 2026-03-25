# Codex Prompt: Payment Cluster Phase 1

Use this prompt when working on Flowdockr's first focused SEO cluster.

```text
Context:
Read:
- product/seo/payment-cluster-phase1-execution-spec.md
- product/seo/payment-cluster-phase1.manifest.json

Task:
Restructure Flowdockr's phase-1 SEO/content system around the payment communication cluster inside freelance client communication.

Strategic goal:
Do not optimize for broad coverage.
Build the first clear Hub -> Guide -> Template -> Scenario system so Google can understand Flowdockr's authority in payment communication and users can move naturally from search entry into product execution.

Repo route ownership:
- /payment = hub
- /guides/* = guide
- /templates/* = template
- /scenario/* = scenario

Strict phase-1 boundary:
Only work inside payment communication.
Do not expand scope / boundary or discount / negotiation content yet.
Do not expand generic professional email or unrelated communication topics.

Current repo facts:
- /payment exists but is a salvageable module landing page, not a true topic hub.
- /guides/client-not-paying exists but is too broad to own the whole cluster.
- /templates/payment-reminder exists but is thin.
- /scenario/ask-for-payment-politely
- /scenario/payment-extension-request
- /scenario/deposit-not-paid-yet
- /scenario/overdue-invoice-no-response
  are the best existing seed nodes.
- /pricing and /pricing/* are out of phase-1 scope. Preserve them but do not expand them.

Allowed page types:
1. Hub
2. Guide
3. Template
4. Scenario

Execution order:
1. Audit the current payment-adjacent assets against the manifest.
2. Rebuild /payment into a payment cluster hub.
3. Strengthen the existing payment seed scenarios first.
4. Create the missing payment guides.
5. Rebuild payment templates as true bridge pages.
6. Finish the internal links so the cluster works as a network.

Guide structure:
- problem framing
- why this is hard / common mistake
- decision or communication principles
- situation branches
- example wording
- what to do next
- natural transition to template or scenario

Template structure:
- single-task framing
- at least 3 strategically distinct examples
- explanation of when each one fits
- short usage guidance
- natural CTA to scenario

Scenario structure:
- clear scenario definition
- communication risks / stakes
- strategy branches
- example output or output framing
- recommended next step
- links back to related guide/template

Internal-linking rules:
- follow Hub -> Guide -> Template -> Scenario
- keep high-density links within the payment cluster
- keep low-density links across clusters
- use the owner mappings in the manifest

Acceptance output:
1. Summary of changes
2. Page inventory by type
3. Internal linking map
4. Cannibalization risks avoided
5. Why the structure supports both ranking and product handoff

Important:
Do not create many new scenario pages unless there is a clear gap.
Prefer improving the existing payment scenarios and expanding outward from them.
```
