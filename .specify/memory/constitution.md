# VolleyCentral Constitution

## Preamble

VolleyCentral is a TypeScript web application that centralizes information for NCAA Women's Volleyball Division I, Division II, Division III, LOVB, and MLV. This constitution defines the standards that govern its design, implementation, testing, operation, and review.

## Principles

### I. Verified Quality

All production code MUST include unit tests for its meaningful behavior. The project MUST maintain greater than 80% test coverage, measured with the repository's configured coverage tool. A change that lowers coverage below this threshold MUST NOT be merged without an explicit, documented exception and a follow-up remediation plan.

### II. Documented APIs

Every API exposed or consumed by VolleyCentral MUST be documented using an OpenAPI specification. The specification MUST describe routes, parameters, request and response schemas, authentication requirements, and relevant error responses. API changes MUST update the specification and corresponding tests in the same change.

### III. Security and Authentication

Secrets, credentials, private keys, tokens, and other sensitive configuration MUST NEVER be committed to Git. Secrets MUST be supplied through the approved environment or secret-management mechanism, and example configuration MUST use clearly fake placeholders.

All functionality that accesses, changes, or reveals authenticated or user-specific data MUST require authentication and enforce authorization on the server side. Client-side checks MAY improve user experience but MUST NOT be treated as a security boundary.

All user inputs MUST be validated at the system boundary using allowlisted, type-safe schemas. Validation errors MUST be handled without exposing secrets, stack traces, or unnecessary internal details.

### IV. Simple Architecture

VolleyCentral MUST use the simplest architecture that satisfies its requirements. Teams MUST prefer clear modules, direct data flow, and existing project conventions over unnecessary abstractions, premature generalization, or speculative infrastructure. New abstractions MUST remove meaningful duplication or clarify an established boundary.

### V. Mobile-First, Findable Experience

The interface MUST be designed mobile-first and remain usable across supported screen sizes, with responsive layouts, readable content, accessible controls, and touch-friendly interactions.

Important information and primary actions SHOULD be reachable within three clicks or fewer from the relevant entry point. Navigation, labels, loading states, errors, and empty states MUST make the user's next action clear.

### VI. Responsible Data Use

Public data sources MUST be attributed appropriately, including the source name and a link where practical. Integrations MUST respect the applicable terms of service, robots or access policies, licensing conditions, and rate limits of NCAA, LOVB, and MLV. The application MUST use caching, backoff, and bounded request frequency where appropriate and MUST NOT attempt to evade access controls or rate limits.

Original news articles MUST NOT be republished in full. VolleyCentral MAY display an original summary and a link to the source, with attribution. Summaries MUST not misrepresent the source or imply that VolleyCentral owns the original reporting.

## Development and Review Requirements

Every feature MUST include acceptance criteria, input-validation cases, and tests appropriate to its risk. Reviewers MUST verify test coverage, OpenAPI updates, authentication and authorization behavior, secret handling, responsive behavior, data attribution, and source-policy compliance when applicable.

A change MUST be rejected when it violates a principle in this constitution unless the exception is documented in the change record, approved by the project owner, and assigned a time-bound remediation task.

## Governance

This constitution is the highest-level project guidance for VolleyCentral. It applies to application code, infrastructure, documentation, tests, and data integrations. Changes to this constitution require a pull request, an explanation of the proposed change, and approval from the project owner. The document's version and ratification metadata MUST be updated whenever its principles or governance rules change.

**Version**: 1.0.0  
**Status**: Ratified  
**Ratified**: 2026-09-21  
**Last Amended**: 2026-09-21
