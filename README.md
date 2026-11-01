# health-plan-subscription-api

A personal TypeScript and Express REST API for modeling health-plan subscription workflows, including patients, plans, partners, holder/dependent relationships, deactivation, and partner-origin derivation.

## Stack and current scope

Node.js, TypeScript, Express, Zod, Vitest; in-memory repositories.

## Running locally

```bash
npm ci
npm test
npm run build
npm run dev
```

These are development commands, not a guarantee that the project runs without environment configuration.

## Current limitations

Uses simulated domain data; not a clinical records system. No production authorization or database is implemented.

## Planned development

See [ROADMAP.md](ROADMAP.md). Planned features are not implemented features.

## Original project description

# Health Plan Subscription API

Small TypeScript/Express API for health-plan subscription workflows. It is intentionally lightweight but structured like a maintainable backend, with routes, services, repositories, domain models, and tests.

## Domain

The API models:

- Partners
- Plans
- Patients
- Subscriptions
- Holder/dependent relationships
- Soft-delete behavior
- Partner-origin derivation based on subscription history

## Commands

```bash
npm install
npm test
npm run build
npm run dev
```

## Endpoints

```text
GET  /health
GET  /patients
GET  /patients/active
POST /patients
POST /patients/:id/deactivate
GET  /subscriptions
POST /subscriptions
GET  /partners/:patientId/origin
```

## Good task areas

This repo is suitable for realistic engineering tasks around:

- Filtering active/inactive patients
- Holder/dependent relationship rules
- Subscription status changes
- Freemium vs premium partner-origin logic
- Refactoring duplicated validation
- Adding tests for edge cases
- API behavior changes with backward compatibility
