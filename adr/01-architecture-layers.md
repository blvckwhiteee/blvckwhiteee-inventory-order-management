# 01: Clean Architecture & Fastify for API

## Status
Accepted

## Context
We need a robust, scalable backend for the Inventory & Order Management API. The system requires strict transaction handling and clear boundaries between inventory and order logic.

## Decision Drivers
* Need for high performance and low overhead.
* Strict separation of concerns (Fail-fast, Traceability).
* Native support for TypeScript.

## Considered Options
* **Express.js:** 
  * *Pros:* Huge ecosystem, familiar. 
  * *Cons:* Slow routing, poor native async error handling.
* **NestJS:** 
  * *Pros:* Out-of-the-box architecture. 
  * *Cons:* Heavy overhead, too much magic for a service focused on raw DB performance.
* **Fastify (Chosen):** 
  * *Pros:* Fastest Node.js web framework, built-in schema validation, excellent async support. 
  * *Cons:* Smaller ecosystem than Express.

## Decision
We will use Fastify with a 3-layer architecture (Routes, Services, Repositories). Inter-module communication (Orders -> Inventory) will happen exclusively at the Service layer.

## Consequences
### Positive
* Extremely high throughput.
* Clean, testable business logic isolated from HTTP transport.
### Negative
* Developers must learn Fastify's plugin and encapsulation system.