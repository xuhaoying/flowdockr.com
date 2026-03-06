# Codex Prompts

## Prompt A: 创建 docs 结构
```text
Task: Create /docs folder and add the following files with the provided templates:
00-context.md, 01-prd.md, 02-ia.md, 03-ai-contract.md, 04-landing-copy.md, 05-seo-plan.md, 06-qa-checklist.md, 07-codex-prompts.md

Constraints:
- Do not change app code yet.
- Only create docs files.
```

## Prompt B: 把 AI 输出改成 JSON 并前端卡片渲染
```text
Context:
Read /docs/03-ai-contract.md and treat it as a strict contract.

Task:
1) Update the AI generation endpoint to return JSON strictly matching the contract.
2) Update the UI to render result cards:
   - Instant Reply
   - Client Analysis
   - Price Plan
   - Strategy
   - Risk
   - Next Move
3) Add robust error handling: if parsing fails, show a friendly error and fallback instructions.

Constraints:
- Keep existing styling style.
- No major refactor.
- Add types/interfaces for the JSON.
```

## Prompt C: Landing page 按文案重做结构（不重写全站）
```text
Context:
Use /docs/04-landing-copy.md.

Task:
Update landing page sections:
- Hero + CTA
- Demo section (input + output cards)
- Use cases
- FAQ

Constraints:
- Keep minimal and clean UI.
- Do not add external UI libraries.
```

