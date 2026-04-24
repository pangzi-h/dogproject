# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **pet boarding business management system** (宠物寄养管理系统) organized as a monorepo with three independent applications:

| Directory | Technology | Purpose |
|-----------|------------|---------|
| `backend/` | Spring Boot (Java 11, Maven) | REST API server |
| `frontend/` | uni-app (Vue 2) | WeChat mini-program & H5 client |
| `web/` | React 19 + Vite + TypeScript | Admin/management web interface |

## Development Commands

### Backend (Spring Boot)
```bash
cd backend
docker-compose up -d        # Start MySQL + Redis
mvn clean install           # Build
mvn spring-boot:run         # Run dev (with --spring.profiles.active=dev)
```

### Frontend (uni-app)
```bash
cd frontend
npm install
npm run dev:mp-weixin       # Dev WeChat mini-program
npm run build:mp-weixin     # Build WeChat mini-program
npm run dev:h5              # Dev H5
npm run build:h5            # Build H5
npm run lint                # ESLint
```

### Web (React)
```bash
cd web
npm install
npm run dev                 # Dev server
npm run build               # Production build
npm run lint                # ESLint
npm run preview             # Preview production build
```

## Architecture

### Backend (Java/Spring Boot)
- **Package**: `com.petboarding`
- **Structure**: `common/`, `user/`, `order/`, `payment/`, `feedback/`, `points/`, `service/`, `shop/` modules
- **Auth**: JWT tokens via `JwtTokenProvider`, Spring Security
- **Database**: MySQL with JPA/Hibernate
- **Cache**: Redis (Jedis client)
- **Config**: `src/main/resources/application.yml` with dev/prod profiles

### Frontend (uni-app/Vue 2)
- **Pages**: Configured in `src/app.json` (TabBar with 4 tabs: 首页, 订单, 商城, 我的)
- **State**: Vuex store modules (`store/modules/user.js`, etc.)
- **API**: Axios-based (`src/api/base.js`, `src/api/user.js`, etc.)
- **Platforms**: mp-weixin (WeChat), h5

### Web (React/TypeScript)
- **Routing**: React Router v7 with two layouts:
  - `AuthLayout` — no bottom nav (login only)
  - `MainLayout` — includes bottom TabBar navigation
- **State**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form + Zod validation
- **UI**: shadcn/ui components + TailwindCSS
- **Styling**: TailwindCSS v4 with CSS variables

## Business Modules

The system implements 7 PRD modules documented in `docs/`:
- **MOD-001**: Authentication & Profile
- **MOD-002**: Booking (宠物预订)
- **MOD-003**: Daily Feedback (每日反馈)
- **MOD-004**: Order Management
- **MOD-005**: Membership Points
- **MOD-006**: Service Management
- **MOD-007**: Shop (商城)

Route structure in `web/src/router/index.tsx` follows these modules.

## Key Files

| File | Purpose |
|------|---------|
| `backend/pom.xml` | Maven dependencies (Spring Boot 2.7.14) |
| `backend/sql/000-init-database.sql` | DB initialization |
| `frontend/src/app.json` | uni-app page & TabBar config |
| `frontend/src/store/index.js` | Vuex root store |
| `web/src/router/index.tsx` | React Router configuration |
| `web/src/lib/utils.ts` | Utility functions (cn, etc.) |
| `docs/PRD-*.md` | Product requirement documents |

## Database

MySQL is required for local development (see `docker-compose.yml`). Redis is used for caching and session management.

# 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```
