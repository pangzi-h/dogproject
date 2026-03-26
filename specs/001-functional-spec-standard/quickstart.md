# Quickstart: 前后端功能规范标准化

**Feature**: `001-functional-spec-standard`  
**Date**: 2026-03-25  
**Audience**: 产品经理、前后端开发、测试工程师

---

## 30 秒概览

本功能定义了一套 **What/Why 导向的功能规范生成工作流**。产品方提供项目背景和业务目标，AI agent 自动产出七段式结构化规范文档，前后端与测试团队基于该文档进入技术方案设计和质量验证。

---

## 前置条件

| 条件 | 说明 |
|------|------|
| Speckit 0.4.1 已安装 | 检查 `.specify/scripts/bash/` 目录存在 |
| Git 仓库已初始化 | `git status` 无错误 |
| VS Code + GitHub Copilot 可用 | LLM agent 需要在 VS Code Chat 中运行 |
| 最小输入信息就绪 | 项目名称、业务背景、目标用户、核心流程（至少一句话） |

---

## 快速开始

### 步骤 1：生成功能规范

在 VS Code Chat 中输入（替换 `{}` 内容）：

```
/speckit.specify {功能名称}：{业务背景描述} 目标用户：{角色列表} 核心流程：{流程描述} 业务目标：{可量化目标}
```

**示例**:
```
/speckit.specify 宠物寄养预约系统：允许宠物主人在线预约寄养服务，管理宠物档案与健康记录 
目标用户：宠物主人、寄养机构工作人员 
核心流程：用户选择寄养日期和宠物信息提交预约，工作人员审核确认并通知用户 
业务目标：将预约确认时间从 2 小时缩短至 30 分钟
```

**输出位置**: `specs/{NNN}-{short-name}/spec.md`

---

### 步骤 2：评审规范文档

生成完成后，打开 `spec.md` 检查清单：

```
✅ 七段式章节结构完整（Section 1–5 齐全）
✅ 至少 1 个 P1 用户故事
✅ 每个 P1 故事包含 2+ 个验收场景（成功 + 异常）
✅ 至少 5 个 MUST 级别功能需求
✅ QR 涵盖性能、安全、可用性
✅ 无 NEEDS CLARIFICATION 标注（或 GapItem 已记录）
✅ 成功标准均含可量化阈值
```

如有不符合项，参考 [contracts/spec-output-contract.md](contracts/spec-output-contract.md) 修正。

---

### 步骤 3：补充缺失信息（如有 GapItem）

如果规范中包含 `⚠️ NEEDS CLARIFICATION` 或 `GapItem`：

1. 查看 GapItem 列表了解缺失信息和影响范围。
2. 补充对应信息后重新运行 `/speckit.specify`（会覆盖更新 spec.md）。
3. 确认所有 `GapItem.status` 变为 `Resolved` 或 `Waived`。

---

### 步骤 4：进入实施规划

规范通过评审后，运行：

```
/speckit.plan
```

这将基于 spec.md 生成：
- `plan.md` — 技术上下文与架构决策
- `research.md` — 技术选型调研结论
- `data-model.md` — 数据实体模型
- `contracts/` — 接口契约定义
- `quickstart.md` — 当前文档（已生成）

---

### 步骤 5：广播给协作团队

规划完成后，使用多智能体联动协议的 **MSG-001 任务启动模板** 通知前后端与测试智能体：

```
@前端开发智能体 @后端开发智能体 @测试智能体

【任务启动】
功能：{功能名称}
规范路径：specs/{branch}/spec.md
计划路径：specs/{branch}/plan.md
优先级：{P1/P2/P3}
期望提测时间：{日期}

请各方确认接收并反馈排期。
```

---

## 输入不足时的行为

| 缺失信息 | 系统行为 | 用户操作 |
|---------|---------|---------|
| 目标用户为空 | 输出草稿 + 创建 GAP-001 | 补充角色定义后重新生成 |
| 核心流程不足 | 输出规范骨架 + 列出补充问题 | 回答问题列表后重新生成 |
| 输入存在内部冲突 | 在规范中标注冲突项 + 创建 GAP | 裁决冲突后手动更新对应章节 |
| 输入混合多个功能 | 输出提示拆分建议 + 草稿 | 按建议拆分成多个 feature |

---

## 文件结构参考

```
specs/001-functional-spec-standard/
├── spec.md                         # 功能规范（speckit.specify 产出）
├── plan.md                         # 实施规划（speckit.plan 产出）
├── research.md                     # 技术调研（speckit.plan Phase 0 产出）
├── data-model.md                   # 数据模型（speckit.plan Phase 1 产出）
├── quickstart.md                   # 本文件（speckit.plan Phase 1 产出）
├── contracts/
│   ├── spec-input-schema.yaml     # 输入字段契约
│   └── spec-output-contract.md    # 输出结构契约
└── checklists/
    └── requirements.md             # 规范质量检查清单
```

---

## 常见问题

**Q: 生成的规范包含了技术实现细节怎么办？**  
A: 依据 FR-003 和 constitution 原则 III，删除实现词汇（如 `Redis`、`MySQL`、`REST`），改为描述行为意图。可重新运行 `/speckit.specify` 或手动编辑。

**Q: 如何验证规范符合宪法要求？**  
A: 对照 [contracts/spec-output-contract.md](contracts/spec-output-contract.md) 中的 Completeness Gate 逐项检查。

**Q: 同一功能可以有多个规范版本吗？**  
A: 不建议。使用 Git commit 历史追溯版本演进。重大范围变更应创建新的 feature 分支（新编号）。

**Q: 用户故事优先级如何决定？**  
A: P1 = 无此故事整个 feature 无价值；P2 = 重要但不阻塞核心路径；P3 = 增强体验。
