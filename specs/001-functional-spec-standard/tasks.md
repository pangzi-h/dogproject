# Tasks: 前后端功能规范标准化

**Input**: 设计文档来自 `/specs/001-functional-spec-standard/`  
**Prerequisites**: plan.md（必需）, spec.md（必需）, research.md, data-model.md, contracts/  
**Tests**: 按宪法要求为必选，包含模板校验、契约校验、回归验证任务

## Phase 1: Setup（共享初始化）

**Purpose**: 准备规范生成能力所需的模板与目录基线

- [x] T001 对齐功能目录文档索引，在 specs/001-functional-spec-standard/quickstart.md 中补充产物入口与执行顺序
- [x] T002 在 .specify/templates/spec-template.md 增加七段式章节锚点与 What/Why 编写提示
- [x] T003 [P] 在 .specify/templates/plan-template.md 增加七原则门禁占位与证据填写提示
- [x] T004 [P] 在 .specify/templates/tasks-template.md 固化任务清单格式规则（Txxx、[P]、[USx]、文件路径）

---

## Phase 2: Foundational（阻塞前置）

**Purpose**: 建立所有用户故事共享的输入/输出契约与自动校验骨架  
**⚠️ CRITICAL**: 本阶段完成前不得开始任一用户故事实现

- [x] T005 创建输入契约版本声明与字段约束于 specs/001-functional-spec-standard/contracts/spec-input-schema.yaml
- [x] T006 创建输出契约章节与完整性门禁于 specs/001-functional-spec-standard/contracts/spec-output-contract.md
- [x] T007 [P] 新增输入契约校验脚本于 .specify/scripts/bash/validate-spec-input.sh（读取 spec-input-schema.yaml 规则）
- [x] T008 [P] 新增输出结构校验脚本于 .specify/scripts/bash/validate-spec-output.sh（检查七段式与编号约束）
- [x] T009 在 .specify/scripts/bash/check-prerequisites.sh 增加 tasks 流程所需文档存在性检查（research/data-model/contracts/quickstart）
- [x] T010 [P] 新增契约校验样例（通过/失败）到 specs/001-functional-spec-standard/contracts/examples.md
- [x] T011 在 .specify/scripts/bash/common.sh 注册契约校验脚本的公共调用函数

**Checkpoint**: Foundation ready - 用户故事实现可并行启动

---

## Phase 3: User Story 1 - 业务方快速产出可执行功能规范 (Priority: P1) 🎯 MVP

**Goal**: 输入最小业务信息后，稳定生成完整七段式规范且保持技术中立  
**Independent Test**: 用最小输入触发一次规范生成，输出具备七段式结构且不含技术实现词汇

### Tests for User Story 1（REQUIRED）

- [x] T012 [P] [US1] 添加七段式结构回归测试用例到 tests/specs/us1-structure-pass.md
- [x] T013 [P] [US1] 添加技术词禁用回归测试用例到 tests/specs/us1-no-impl-terms.md
- [x] T014 [US1] 在 tests/specs/run-us1-checks.sh 编排 US1 用例执行并输出结果摘要

### Implementation for User Story 1

- [x] T015 [US1] 在 .github/prompts/speckit.specify.prompt.md 增加最小输入映射规则（项目名/背景/目标用户/核心流程）
- [x] T016 [US1] 在 .specify/templates/spec-template.md 实现 User Story 与 Acceptance Scenarios 的固定输出骨架
- [x] T017 [US1] 在 .specify/templates/spec-template.md 实现 Functional Requirements 与 Quality Requirements 的编号规则说明
- [x] T018 [US1] 在 .specify/templates/spec-template.md 增加“禁止实现细节”校验提示（FR-003 对齐）
- [x] T019 [US1] 在 .specify/scripts/bash/validate-spec-output.sh 增加禁用词扫描与失败退出码
- [x] T020 [US1] 在 specs/001-functional-spec-standard/quickstart.md 补充 US1 最小输入示例与通过标准

**Checkpoint**: User Story 1 可独立生成并验证规范（MVP）

---

## Phase 4: User Story 2 - 团队可评审与可追溯的需求表达 (Priority: P2)

**Goal**: 让评审团队可快速定位需求编号、验收条件、质量指标与成功标准  
**Independent Test**: 对任意规范执行追溯检查，可输出 FR/QR/SC 覆盖关系与缺口报告

### Tests for User Story 2（REQUIRED）

- [ ] T021 [P] [US2] 添加编号连续性测试用例到 tests/specs/us2-id-sequence.md
- [ ] T022 [P] [US2] 添加 FR-AC 追溯覆盖测试用例到 tests/specs/us2-traceability.md
- [ ] T023 [US2] 在 tests/specs/run-us2-checks.sh 编排 US2 用例执行并输出覆盖率摘要

### Implementation for User Story 2

- [ ] T024 [US2] 在 .specify/templates/spec-template.md 增加 FR/QR/SC 编号与可测性描述约束
- [ ] T025 [US2] 在 specs/001-functional-spec-standard/data-model.md 对齐 FR、QR、AC 的关系映射规则
- [ ] T026 [US2] 在 .specify/scripts/bash/validate-spec-output.sh 增加 FR-AC 关联完整性校验
- [ ] T027 [US2] 在 .specify/scripts/bash/validate-spec-output.sh 增加 SC 可量化阈值校验
- [ ] T028 [US2] 在 .specify/templates/plan-template.md 增加“从 QR/SC 提取门禁指标”的填写说明
- [ ] T029 [US2] 在 specs/001-functional-spec-standard/quickstart.md 增加评审追溯检查步骤

**Checkpoint**: User Story 2 可独立完成“评审可追溯”验证

---

## Phase 5: User Story 3 - 信息不足时给出补充清单 (Priority: P3)

**Goal**: 输入不完整时输出可执行草案并明确缺失项与影响范围  
**Independent Test**: 提交缺少关键字段输入，系统产出规范草案并附带 GapItem；补齐后 GapItem 消失或转为 Resolved

### Tests for User Story 3（REQUIRED）

- [ ] T030 [P] [US3] 添加缺失字段触发测试用例到 tests/specs/us3-gap-missing-fields.md
- [ ] T031 [P] [US3] 添加冲突输入触发测试用例到 tests/specs/us3-gap-conflict.md
- [ ] T032 [US3] 在 tests/specs/run-us3-checks.sh 编排 US3 用例执行并输出 Gap 状态摘要

### Implementation for User Story 3

- [ ] T033 [US3] 在 specs/001-functional-spec-standard/contracts/spec-input-schema.yaml 实现 gap_detection 规则与输出定义
- [ ] T034 [US3] 在 .specify/scripts/bash/validate-spec-input.sh 增加缺失字段检测与 GapItem 输出
- [ ] T035 [US3] 在 .specify/templates/spec-template.md 增加 `⚠️ NEEDS CLARIFICATION` 标记写入规范
- [ ] T036 [US3] 在 specs/001-functional-spec-standard/data-model.md 对齐 GapItem 状态流转规则（Open/Resolved/Waived）
- [ ] T037 [US3] 在 specs/001-functional-spec-standard/quickstart.md 增加缺失信息补齐与再生成流程

**Checkpoint**: User Story 3 可独立完成“信息不足可治理”验证

---

## Phase 6: Polish & Cross-Cutting

**Purpose**: 跨故事一致性、文档完整性和发布前回归

- [ ] T038 [P] 汇总文档一致性检查并修订 specs/001-functional-spec-standard/research.md 的决策映射
- [ ] T039 [P] 运行并记录全量测试入口 tests/specs/run-all-spec-checks.sh（聚合 US1/US2/US3）
- [ ] T040 在 specs/001-functional-spec-standard/quickstart.md 补充端到端验证与故障排查说明
- [ ] T041 在 .github/agents/copilot-instructions.md 同步本功能的契约与校验脚本使用说明
- [ ] T042 在 specs/001-functional-spec-standard/plan.md 更新最终门禁证据链接（contract/test/quickstart）

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup（Phase 1）: 无依赖，可立即开始
- Foundational（Phase 2）: 依赖 Phase 1 完成；阻塞全部用户故事
- User Stories（Phase 3+）: 依赖 Phase 2 完成后可并行
- Polish（Phase 6）: 依赖所有目标用户故事完成

### User Story Dependencies

- US1（P1）: 仅依赖 Foundational，可先行交付 MVP
- US2（P2）: 依赖 Foundational；可与 US3 并行，不依赖 US3
- US3（P3）: 依赖 Foundational；与 US2 解耦，可独立验证

### Within Each User Story

- 先测试任务，再实现任务
- 先模板/契约更新，再脚本校验逻辑
- 完成故事后先独立验证再进入下一优先级

---

## Parallel Opportunities

- Phase 1: T003 与 T004 可并行
- Phase 2: T007、T008、T010 可并行
- US1: T012、T013 可并行；模板任务（T016/T017）可并行
- US2: T021、T022 可并行
- US3: T030、T031 可并行
- Polish: T038 与 T039 可并行

---

## Parallel Example: User Story 1

```bash
Task: T012 [US1] tests/specs/us1-structure-pass.md
Task: T013 [US1] tests/specs/us1-no-impl-terms.md

Task: T016 [US1] .specify/templates/spec-template.md
Task: T017 [US1] .specify/templates/spec-template.md
```

## Parallel Example: User Story 2

```bash
Task: T021 [US2] tests/specs/us2-id-sequence.md
Task: T022 [US2] tests/specs/us2-traceability.md

Task: T026 [US2] .specify/scripts/bash/validate-spec-output.sh
Task: T027 [US2] .specify/scripts/bash/validate-spec-output.sh
```

## Parallel Example: User Story 3

```bash
Task: T030 [US3] tests/specs/us3-gap-missing-fields.md
Task: T031 [US3] tests/specs/us3-gap-conflict.md

Task: T033 [US3] specs/001-functional-spec-standard/contracts/spec-input-schema.yaml
Task: T036 [US3] specs/001-functional-spec-standard/data-model.md
```

---

## Implementation Strategy

### MVP First（仅交付 User Story 1）

1. 完成 Phase 1（Setup）
2. 完成 Phase 2（Foundational）
3. 完成 Phase 3（US1）
4. 执行 US1 独立验证（T012-T014）
5. 通过后作为 MVP 发布与演示

### Incremental Delivery

1. Setup + Foundational 完成后建立稳定基线
2. 交付 US1（生成能力）并验证
3. 交付 US2（可追溯能力）并验证
4. 交付 US3（缺失治理能力）并验证
5. 最后执行 Polish 全量回归

### Suggested MVP Scope

- 建议 MVP 范围：**User Story 1（Phase 3）**
- 原因：在最小成本下先闭环“输入 -> 结构化规范输出 -> 独立验证”主链路
