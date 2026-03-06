# AI Output Contract v0

必须返回 JSON，禁止自由文本。

## Fields
- `instant_reply`: `string`（20-80 字，能直接发客户，不承诺让价）
- `client_analysis`: `object`
- `client_analysis.intent`: one of `[budget_pressure, scope_push, timeline_pressure, comparison_shopping, unclear_requirements]`
- `client_analysis.signals`: `string[]`（模型看到的关键句）
- `client_analysis.leverage_level`: one of `[low, medium, high]`
- `price_plan`: `object`
- `price_plan.floor_price`: `number`
- `price_plan.anchor_price`: `number`
- `price_plan.negotiable_price`: `number`
- `price_plan.rationale`: `string`（简短解释：为什么这样定）
- `strategy`: `object`
- `strategy.approach`: one of `[value_reframe, scope_trade, deadline_trade, risk_reverse, walkaway_ready]`
- `strategy.concession_steps`: `string[]`（最多 3 步让步路径）
- `risk`: `object`
- `risk.deal_risk`: one of `[low, medium, high]`
- `risk.ghosting_probability`: `number`（0-1）
- `risk.red_flags`: `string[]`
- `next_move`: one of `[ask_clarifying, send_reply, offer_options, propose_call, walk_away]`

## Failure Fallback (Required)
- 如果输入不足：`next_move = "ask_clarifying"`，且 `instant_reply` 输出“先对齐需求/范围”的话术。
- 如果价格字段缺失：只输出策略，不输出报价数字，`rationale` 写明 `"缺少 floor/quote"`。

## JSON Shape Example
```json
{
  "instant_reply": "感谢你直说预算，我们先把目标和范围对齐，我再给你两个可执行方案。",
  "client_analysis": {
    "intent": "budget_pressure",
    "signals": ["预算只有一半", "希望不降范围直接降价"],
    "leverage_level": "medium"
  },
  "price_plan": {
    "floor_price": 900,
    "anchor_price": 1500,
    "negotiable_price": 1200,
    "rationale": "保留核心交付并控制风险"
  },
  "strategy": {
    "approach": "scope_trade",
    "concession_steps": [
      "先保留原价+拆解价值",
      "若压价，提供缩范围方案",
      "仍无法对齐则建议暂停"
    ]
  },
  "risk": {
    "deal_risk": "medium",
    "ghosting_probability": 0.35,
    "red_flags": ["多次对比低价", "回避交付范围确认"]
  },
  "next_move": "offer_options"
}
```

