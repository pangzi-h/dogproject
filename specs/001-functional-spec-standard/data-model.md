# Data Model: 前后端功能规范标准化

**Feature**: `001-functional-spec-standard`  
**Date**: 2026-03-25  
**Source**: spec.md → Key Entities + Requirements

---

## 实体关系概览

```
FeatureBrief ──(1:N)──> UserStory
FeatureBrief ──(1:N)──> FunctionalRequirement
FeatureBrief ──(1:N)──> QualityRequirement
FeatureBrief ──(0:N)──> GapItem

UserStory ──(1:N)──> AcceptanceCriterion
FunctionalRequirement ──(N:M)──> AcceptanceCriterion

UserRole ──(被引用)──> UserStory
UserRole ──(被引用)──> FunctionalRequirement
```

---

## 实体定义

### FeatureBrief（需求输入摘要）

规范生成的顶层输入容器，承载一次功能规范请求的全部元数据。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 格式 `{三位编号}-{short-name}`，如 `001-functional-spec-standard` |
| `projectName` | string | ✅ | 项目或功能名称 |
| `background` | string | ✅ | 业务背景描述 |
| `targetUsers` | string[] | ✅ | 目标用户角色列表 |
| `coreFlows` | string[] | ✅ | 核心业务流程，至少 1 个 |
| `businessGoal` | string | ✅ | 可量化业务目标 |
| `createdAt` | date | ✅ | 规范创建日期 |
| `status` | enum | ✅ | `Draft` \| `In Review` \| `Approved` \| `Superseded` |
| `branch` | string | ✅ | Git 分支标识符 |

**Validation Rules**:
- `id` 必须与 Git branch 命名一致，格式为 `{NNN}-{kebab-name}`。
- `coreFlows` 至少包含 1 个条目；若为空则创建对应 `GapItem`。
- `status` 初始值为 `Draft`，由评审流程驱动状态转换。

**State Transitions**:
```
Draft ──[团队评审通过]──> In Review
In Review ──[产品负责人批准]──> Approved
Approved ──[新版本替代]──> Superseded
Draft | In Review ──[信息补齐后重推]──> Draft（重置）
```

---

### UserRole（用户角色）

描述与功能交互的角色边界，非系统用户账号。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `roleId` | string | ✅ | 如 `R-001` |
| `name` | string | ✅ | 角色名称，如"产品经理" |
| `primaryGoal` | string | ✅ | 角色使用该功能的核心诉求 |
| `operationBoundary` | string | ✅ | 可执行操作的边界描述 |
| `featureBriefId` | string | ✅ | 关联的 FeatureBrief |

**Validation Rules**:
- 同一 FeatureBrief 内 `name` 不可重复。
- `operationBoundary` 不可留空，必须明确权限范围。

---

### UserStory（用户故事）

以角色视角描述功能价值，是前后端任务拆解的输入单元。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `storyId` | string | ✅ | 如 `US-001` |
| `title` | string | ✅ | 故事标题 |
| `roleId` | string | ✅ | 关联的 UserRole |
| `featureBriefId` | string | ✅ | 关联的 FeatureBrief |
| `priority` | enum | ✅ | `P1` \| `P2` \| `P3` |
| `businessValue` | string | ✅ | Why：业务价值描述 |
| `independentTest` | string | ✅ | 独立可验证测试说明 |
| `acceptanceCriteria` | AcceptanceCriterion[] | ✅ | 至少 1 个上线场景，1 个异常场景 |

**Validation Rules**:
- `priority` 为 `P1` 的故事至少需要 2 个验收场景（成功 + 失败或边界）。
- `businessValue` 必须以 Why 视角陈述，不包含具体实现描述。
- `acceptanceCriteria` 不可为空。

---

### FunctionalRequirement（功能需求）

原子可测试的系统行为声明，驱动后端接口和前端交互设计。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `frId` | string | ✅ | 格式 `FR-{NNN}`，如 `FR-001` |
| `featureBriefId` | string | ✅ | 关联的 FeatureBrief |
| `description` | string | ✅ | MUST/SHOULD/MAY 语气的行为描述 |
| `module` | string | ✅ | 所属功能模块 |
| `priority` | enum | ✅ | `MUST` \| `SHOULD` \| `MAY` |
| `linkedCriteria` | string[] | ❌ | 关联的 AcceptanceCriterion ID 列表 |

**Validation Rules**:
- `description` 必须包含主语（系统）+ 动词 + 宾语结构。
- `MUST` 类需求必须至少关联 1 个 AcceptanceCriterion。
- 不允许包含具体技术实现词汇（如"数据库"、"Redis"、"API 接口"）。

---

### QualityRequirement（质量需求）

可量化的非功能属性，是计划阶段门禁和验收阶段检查的直接输入。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `qrId` | string | ✅ | 格式 `QR-{NNN}`，如 `QR-001` |
| `featureBriefId` | string | ✅ | 关联的 FeatureBrief |
| `category` | enum | ✅ | `Performance` \| `Availability` \| `Security` \| `Scalability` \| `Consistency` |
| `target` | string | ✅ | 可量化目标，如"p95 < 200ms" |
| `measureMethod` | string | ✅ | 度量/验证方式 |

**Validation Rules**:
- `target` 必须包含可量化阈值（数字 + 单位）。
- 生成完整规范时，`Performance`、`Security`、`Availability` 三类必须各有至少 1 个 QR 条目。

---

### AcceptanceCriterion（验收标准）

Given-When-Then 格式的可执行验收条件，驱动测试用例设计。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `acId` | string | ✅ | 格式 `AC-{NNN}`，如 `AC-001` |
| `storyId` | string | ✅ | 关联的 UserStory（或 FunctionalRequirement） |
| `given` | string | ✅ | 前置条件 |
| `when` | string | ✅ | 触发动作 |
| `then` | string | ✅ | 预期结果（可量化） |
| `scenarioType` | enum | ✅ | `Success` \| `Failure` \| `EdgeCase` |

**Validation Rules**:
- 三段（given/when/then）均不可为空。
- `then` 描述必须包含可观测的结果，不可以"正常运行"等模糊表述结尾。

---

### GapItem（信息缺失项）

追踪输入不完整时的缺失字段、影响和补充建议。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `gapId` | string | ✅ | 格式 `GAP-{NNN}` |
| `featureBriefId` | string | ✅ | 关联的 FeatureBrief |
| `missingField` | string | ✅ | 缺失的字段名或信息类别 |
| `impact` | string | ✅ | 对规范质量或后续阶段的影响 |
| `suggestion` | string | ✅ | 如何补充的具体建议 |
| `status` | enum | ✅ | `Open` \| `Resolved` \| `Waived` |

**Validation Rules**:
- `status: Open` 的 GapItem 在规范中必须以醒目方式标注（如 `⚠️ NEEDS CLARIFICATION`）。
- 当所有 GapItem 状态变为 `Resolved` 或 `Waived` 时，FeatureBrief.status 可推进到 `In Review`。

---

## 关键业务规则

1. **完整性优先于完美**：允许 GapItem 存在的草稿规范，不允许无 GapItem 但内容模糊的规范。
2. **结构固定**：七段式章节顺序不可调整，缺章视为规范不合格（QR-001）。
3. **技术中立**：FunctionalRequirement 和 UserStory 不允许出现实现语言、框架或数据库名称。
4. **量化目标强制**：QualityRequirement 的 `target` 字段必须数值化，分支规划阶段才能消费。
5. **追溯链路完整**：每条 FunctionalRequirement (MUST) 必须可追溯到至少一条 AcceptanceCriterion。
