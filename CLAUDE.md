# CLAUDE.md

## Commands

- Install dependencies: `npm install`
- Run tests: `npm test`
- Type-check/build: `npm run build`
- Lint/type-check: `npm run lint`
- Start dev server: `npm run dev`

## Workflow Rules

- Do not push changes unless explicitly asked.
- Do not use `--no-verify` or bypass failing checks.
- Do not run destructive git commands such as `git reset --hard`, `git clean -fd`, deleting branches, or force-pushing without explicit confirmation.
- Keep diffs focused on the requested task.
- Prefer existing module/service/repository patterns before introducing new abstractions.
- Add or update tests for behavior changes.
- Before finishing, report exactly which commands were run and their results.

## Architecture

- Routes/controllers should only parse HTTP input and return HTTP output.
- Services contain business rules.
- Repositories own persistence access. This greenfield repo uses in-memory repositories for fast evaluation tasks.
- Shared error handling should use `AppError` from `src/shared/errors.ts`.
- Status filtering rules should be centralized in services, not duplicated in routes.

## Domain Notes

- A patient can be a `HOLDER` or `DEPENDENT`.
- Dependents are linked to a holder via `holderId`.
- Soft-deleted records should generally be hidden from active business flows.
- Freemium subscriptions may exist, but premium subscription history is important when deriving partner origin.
