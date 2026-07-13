# Lab III.2 Findings: Auth0 IAM Integration vs. InstaSafe Internal Environment

## Core Artifacts
* [Execution Summary Report](./execution-summary.pdf)
* [Test Execution Matrix](./Test-Cases-Lab-III-2.xlsx)
* [Online Excel](https://1drv.ms/x/c/98464f9de698be77/IQBf6UULLZ3sQrYW_FUIxJiYAdZHkNpfUIXXTbkmMWNBHB0?e=4CaaBJ)

## Architectural Context
The original parameters for this lab mandated the use of the InstaSafe internal environment to execute a standard Identity and Access Management (IAM) QA matrix. Due to environment unavailability and access constraints, a pivot was required to complete the testing cycle. 

Instead of stalling the execution pipeline, an isolated Auth0 Developer Tenant was provisioned. This allowed for the full execution of the IAM testing matrix against an enterprise-grade identity gateway, maintaining the integrity of the core security testing objectives while demonstrating adaptability in infrastructure deployment.

## Environment Setup & Replication
For anyone referencing this lab to replicate the testing methodology, the Auth0 environment was configured with the following baseline:
* **Tenant Type:** Developer (Free Tier)
* **Target Callback URI:** Routed to `https://jwt.io` to capture and inspect the JSON Web Tokens (JWT) upon successful authentication.
* **MFA Configuration:** TOTP (Time-Based One-Time Password) and SMS enforced via global tenant policies.
* **Twilio SMS Integration:** Because Auth0 requires an external provider for SMS delivery, we provisioned a Twilio Programmable SMS account. We integrated the Twilio API credentials into Auth0's custom SMS gateway, allowing us to successfully route, deliver, and validate text-based OTPs in real-time during the testing phase.

## Execution Deviations
While Auth0 provided a robust testing ground, swapping the environment meant some standard lab procedures had to be modified:
    
1. **Backend Manipulation over UI Testing:** Auth0 developer tenants lack manual UI toggles for granular user states like "Expire Password Now" or specific device revocation. Testing these states required interacting directly with the Auth0 Management API or utilizing the dashboard's backend session controls rather than front-end client simulation.
2. **Default Permissiveness:** By default, Auth0 prioritizes frictionless entry. It does not actively block concurrent sessions or halt logins for unverified emails out-of-the-box. Discovering these architectural gaps required understanding that Auth0 expects developers to write and deploy custom Node.js Post-Login Actions to enforce these specific security boundaries.
3. **Brute-Force Shields:** Triggering account lockouts required intentionally exceeding the brute-force protection thresholds configured in the Auth0 Attack Protection dashboard, which behaves differently than InstaSafe's native lockout timers.

## Key Vulnerabilities Documented
Despite being a highly secure commercial product, testing the baseline configuration yielded legitimate, documentable defects that require remediation:
* **DF-MFA-01:** High time-drift tolerance accepted recently expired TOTP codes.
* **DF-AS-03:** Missing backend enforcement allowed unverified email identities to establish sessions.
* **TC-SB-02:** Lack of single-session constraints permitted concurrent logins across isolated browsers.
