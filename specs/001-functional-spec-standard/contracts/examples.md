# Contract Validation Examples

## Input Contract Examples

### PASS Example (FeatureBrief)

```yaml
id: 001-functional-spec-standard
projectName: 前后端功能规范标准化
background: 团队希望将功能规范生成流程标准化，减少评审反复并提升需求表达一致性。
targetUsers:
  - 产品经理
  - 前端开发
coreFlows:
  - 用户输入业务背景和目标后，系统生成结构化规范文档
businessGoal: 将需求评审返工率降低 30%
```

### FAIL Example 1 (Missing Required Field)

```yaml
id: 001-functional-spec-standard
projectName: 前后端功能规范标准化
background: 仅有背景
coreFlows:
  - 生成规范
businessGoal: 提升效率
```

Expected failure:
- Missing `targetUsers`
- `businessGoal` likely fails quantified goal warning

### FAIL Example 2 (Forbidden Implementation Terms)

```yaml
id: 001-functional-spec-standard
projectName: 前后端功能规范标准化
background: 使用 Java 和 REST API 生成规范
 targetUsers:
  - 产品经理
coreFlows:
  - 通过 endpoint 请求生成规范
businessGoal: 3 分钟内完成
```

Expected failure:
- `no_impl_language` gate hit by Java/REST/API/endpoint terms

## Output Contract Examples

### PASS Markers in spec.md

- Includes all required sections in fixed order
- Includes at least one `(Priority: P1)` user story
- FR IDs start at `FR-001` and are sequential
- Contains non-happy-path acceptance scenarios
- Contains measurable `SC-xxx` entries

### FAIL Markers in spec.md

- Missing `## Assumptions`
- FR IDs skip from `FR-001` to `FR-003`
- Contains implementation terms (e.g., `Vue`, `API`, `Redis`)
- SC entries with no numeric thresholds
