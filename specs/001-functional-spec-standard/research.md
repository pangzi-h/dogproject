# Phase 0 Research: 前后端功能规范标准化

**Feature**: `001-functional-spec-standard`  
**Date**: 2026-03-25  
**Status**: Complete

---

## 研究问题

Phase 0 需要解决以下三类未知项：

| # | 未知项 | 研究状态 |
|---|--------|----------|
| R1 | 规范生成系统的核心架构模式 | ✅ 已解决 |
| R2 | AI 辅助文档生成的结构化输出最佳实践 | ✅ 已解决 |
| R3 | 规范文档的契约定义格式（输入/输出 schema） | ✅ 已解决 |
| R4 | 与多智能体协作协议的集成点 | ✅ 已解决 |
| R5 | 版本控制与追溯机制在文档系统中的实现方式 | ✅ 已解决 |

---

## R1: 规范生成系统的核心架构模式

### Decision
采用 **AI Agent 工作流 + Markdown 模板驱动** 的架构，运行于 Speckit 0.4.1 平台之上。系统不引入独立后端服务，所有"生成逻辑"由 LLM agent（GitHub Copilot）在 VS Code 环境中执行，产物以 Markdown 文件形式持久化到 Git 仓库。

### Rationale
- Speckit 框架已提供脚本基础（`setup-plan.sh`、`create-new-feature.sh`、`update-agent-context.sh`）和模板体系，无需重复造轮子。
- 功能范围是"规范生成工作流"，而非一个独立可部署服务；零基础设施开销是正确的取舍。
- Markdown + Git 提供天然的版本追溯能力（符合 constitution 原则 VII）。

### Alternatives Considered
- **Web 应用（前后端分离）**: 过度工程化，超出当前 "speckit 工具链增强" 边界。
- **CLI 工具（独立 Node.js/Python package）**: 增加了依赖管理和发布流程复杂度，收益不匹配。

---

## R2: AI 辅助文档生成的结构化输出最佳实践

### Decision
使用 **结构化 Prompt 模板 + 强制字段校验** 模式：
1. 输入通过 `FeatureBrief` schema 收集（项目名称、背景、目标用户、核心流程）。
2. Agent 使用 Speckit 内置 spec-template.md 作为输出结构约束。
3. 缺失字段通过 `GapItem` 清单机制显式标注，不静默跳过。

### Rationale
- 固定模板结构保证输出可预期，使评审方能够快速定位七段式内容（符合 QR-005）。
- 显式 Gap 机制确保规范质量下限，避免"幻觉填充"掩盖真实信息空缺（符合 FR-008、SC-006）。
- 与 constitution 原则 II（统一标准）一致，消除写法漂移。

### Alternatives Considered
- **自由格式输出后 AI 再整理**: 两步骤引入更多不确定性且难以追溯。
- **JSON 结构化输出再渲染为 Markdown**: 工具链复杂度增加，对当前场景无必要收益。

---

## R3: 规范文档的契约定义格式

### Decision
采用 **YAML Schema 定义输入契约 + Markdown 模板定义输出契约**：
- 输入契约：定义在 `contracts/spec-input-schema.yaml`，描述 `FeatureBrief` 的字段、类型、必填性。
- 输出契约：定义在 `contracts/spec-output-contract.md`，描述七段式功能规范的章节结构和字段约束。

### Rationale
- YAML schema 可被 CI 工具或 agent 验证工具消费（符合宪法原则 I：契约优先）。
- 分离输入契约与输出契约，允许不同版本的 agent（Copilot、GPT、本地模型）独立消费同一契约。
- 符合 const spec-template.md 中新增 QR-001（结构完整性）的验收要求。

### Alternatives Considered
- **仅用 Markdown 描述 schema**: 人类可读但机器不可验证，违背 constitution 原则 I 的"自动化可执行契约"精神。
- **OpenAPI spec**: 适合 HTTP API，对文档生成工作流语义过重。

---

## R4: 与多智能体协作协议的集成点

### Decision
功能规范生成是**产品智能体**的职责起点。生成完成后，产品智能体通过 `多智能体联动协议.md` 中定义的标准消息模板（MSG-001 任务启动模板）广播给前后端与测试智能体。

集成点：
- 规范文档路径遵循 `specs/{branch}/spec.md` 约定，可被所有智能体直接引用。
- 数据模型实体（`UserStory`、`FunctionalRequirement` 等）作为跨 agent 共享的信息边界。
- `GapItem` 状态变更触发智能体间的"信息不足通知"流程。

### Rationale
- 复用已有的多智能体协议避免重复定义通信规范（DRY 原则）。
- 标准消息模板保证跨 agent 信息传递的格式一致性（constitution 原则 II）。

### Alternatives Considered
- **独立通知机制**: 与现有协议体系割裂，增加维护负担。

---

## R5: 版本控制与追溯机制

### Decision
采用 **Git 分支 + 文件内版本字段** 双轨追溯：
- 每个 feature 独立分支（`001-functional-spec-standard`），commit 历史即变更历史。
- spec.md 头部保留 `Created` 和 `Status` 字段；plan.md 保留日期和 branch 标识。
- 不引入独立版本数据库，Git log 是单一事实来源。

### Rationale
- 零额外基础设施，与 Speckit 现有 sequential 分支编号策略一致（constitution 原则 VII）。
- Git 提供强可追溯性，满足 SC-004（任务返工率可追踪）和 FR-010 的追溯需求。

### Alternatives Considered
- **独立 changelog 文件**: 需手动维护且易与 Git 历史产生分歧。
- **数据库记录版本**: 超出当前工具系统边界，违背最小复杂度原则。

---

## 关键决策汇总

| 决策 | 选定方案 | 核心理由 |
|------|----------|----------|
| 运行环境 | AI Agent + Markdown + Git（无独立服务） | 零基础设施开销，复用 Speckit 框架 |
| 结构约束 | spec-template.md 强制模板 + Gap 机制 | 保证输出可预期，避免质量静默降级 |
| 契约格式 | YAML 输入 schema + Markdown 输出契约 | 可机器验证，符合契约优先原则 |
| Agent 集成 | 复用多智能体联动协议现有模板 | 无重复协议，保持一致性 |
| 版本追溯 | Git 分支 + 文件头字段 | 天然追溯，零额外工具 |

---

## 技术上下文（已解决）

**Language/Version**: Markdown + YAML（文档定义层）；Bash（Speckit 脚本层）  
**Primary Dependencies**: Speckit 0.4.1、GitHub Copilot（LLM agent）、Git  
**Storage**: Git 仓库文件系统（`specs/` 目录）  
**Testing**: Speckit checklist 机制 + agent 自检（结构完整性断言）  
**Target Platform**: VS Code + macOS（本地开发环境）  
**Project Type**: AI 工作流工具 / 规范生成系统  
**Performance Goals**: 单次规范生成 < 3 分钟端到端；门禁检查 < 30 秒  
**Constraints**: 不依赖外部 API 调用；规范文档 < 2000 行；离线可用（Git + local Markdown）  
**Scale/Scope**: 单项目 10–50 个 feature 规范；团队 2–6 人
