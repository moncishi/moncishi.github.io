# 0002. 支持多套餐层级与双轨额度池架构

第三方 Provider 通常提供多个定位不同的套餐（如 Go、Goat、Lite、Pro），且各家采用的额度结算模式分化严重：一部分直接赠送法币额度（如 10 美元、60 美元），另一部分按积分点数（Credits）抵扣，同时各套餐伴随不同的时间窗口限额。我们决定将 Provider 的计费与配额结构下沉至 `plans` 列表，支持 `currency`（货币额度）与 `credits`（积分额度）双轨类型，并引入结构化的限额（5小时/周/月）描述。这一重构使系统能够如实表达真实订阅场景，并将性价比计算粒度精准细化到具体套餐。

## Status

Accepted

## Considered Options

- **单一套餐扁平结构（旧方案）**：假设一个 Provider 只有单一月费和单一额度。无法表达同一服务商下不同套餐的巨大性价比差异，也无法支持多套餐共存。
- **拆分为不同 Provider 记录**：将 Command Code Go 和 Command Code Goat 拆为两个独立 Provider。缺点是冗余重复定义相同的支持模型列表，割裂了服务商品牌实体。
- **Provider 下沉多 Plan 结构（选中）**：Provider 定义模型支持与标准扣费费率，下属 `plans` 数组定义具体购买方案、额度类型（credits/currency）、额度数额及限额规则。

## Consequences

- 价格对比与排行榜的最小度量单元从 `(Provider, Model)` 升级为 `(Provider, Plan, Model)`。
- 前端需要兼容两种额度展示心智（货币额度直接看面值，积分额度看点数）。
- 增加了限额状态（是/否/未知）与时间窗口描述展示，提升选型透明度。
