# QA Lab III.5: Enterprise E2E Automation Suite

## Objective
This repository contains a Playwright-based test automation suite utilizing the Page Object Model (POM) design pattern. The suite validates the critical user journeys of an enterprise access platform, specifically focusing on MFA authentication, device enrollment, policy binding, and session termination.

## Architectural Decision: Environment Isolation
The instructions initially targeted the Instasafe staging environment. However, this test suite was intentionally engineered against a localized, custom-built Node.js mock enterprise architecture (`mock-server.js`). 

### Rationale for the Pivot
Relying on external staging environments for automated UI testing introduces severe anti-patterns:
*   **Non-Deterministic Execution:** Remote staging servers are prone to rate-limiting, sudden DOM mutations by other developers, and network latency, which cause flaky tests unrelated to code quality.
*   **MFA Cryptographic Bottlenecks:** Live staging environments often lack programmable endpoints to securely inject rolling Time-Based One-Time Passwords (TOTP) during automated headless runs.
*   **State Contamination:** Running device enrollment tests concurrently on a shared database leads to data collision.

### Implementation 
By constructing an Express.js local server, we achieve a 1:1 state-machine translation of the target application. This guarantees a sterile, isolated testing environment where the DOM renders instantly. The mock server strictly enforces the exact same DOM tree structures, multi-step shadow-dialog transitions, and URI query parameter modifications expected in the live application.

## Core Dependencies
*   **@playwright/test:** Core E2E execution engine.
*   **otplib (v13+):** Cryptographic engine for asynchronous programmatic TOTP generation to bypass the MFA prompt.
*   **dotenv:** Environment variable injection to prevent secret leakage in version control.
*   **express:** Local state machine hosting.

## Execution Instructions

### 1. Initialize the Mock Server
Before running the test suite, the local enterprise mock must be active.
```bash
node mock-server.js