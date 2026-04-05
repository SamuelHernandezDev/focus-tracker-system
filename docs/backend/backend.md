# ⚙️ Backend Design 

---

## 🔹Overview

The backend is responsible for:

- Receiving user interaction events
- Persisting structured data
- Computing metrics and indicators
- Generating session-level evaluations
- Providing data for visualization
- Integrating AI for feedback generation

The system follows a **modular architecture using NestJS**, with clear separation between ingestion, processing, and evaluation layers.

It is designed to support both:

- **Synchronous processing (MVP)**
- **Asynchronous processing via workers (future)**

---

## 🔹Core Responsibilities

- Event ingestion
- Session management
- Metrics calculation
- Indicator generation
- AI-based feedback (interpretation layer)
- Data persistence

---

## 🔹High-Level Structure

The backend is divided into modules:

```
/events
/sessions
/metrics
/indicators
/feedback
/users
/common
/config
```

---

## 🔹Main Flow

### 🔸MVP (Synchronous)

```txt
HTTP → Events → Metrics → Indicators → AI Feedback → Response
```

---

### 🔸Future (Asynchronous)

```txt
HTTP → Events → Metrics → Indicators → Queue → Worker (AI) → DB → Response (polling)
```

---

## 🔹Modules

---

### 🔸Events Module

Handles raw data ingestion.

* Receives interaction events from frontend
* Validates structure
* Stores events

#### Files:

* `events.controller.ts`
* `events.service.ts`
* `/dto/create-event.dto.ts`

---

### 🔸Sessions Module

Manages session lifecycle.

* Start session
* End session
* Aggregate session data

#### Files:

* `sessions.controller.ts`
* `sessions.service.ts`
* `session.entity.ts`

---

### 🔸Metrics Module

Responsible for deterministic calculations.

#### Calculates:

* Active time (Ta)
* Inactive time (Ti)
* Pause count (Np)

#### Files:

* `metrics.service.ts`

---

### 🔸Indicators Module

Transforms metrics into meaningful indicators.

#### Examples:

* Continuity Index (IC)
* Fragmentation Index (IF)
* Stability Index (IGE)

#### Files:

* `indicators.service.ts`

---

### 🔸Feedback Module (Scalable Design)

This module is designed to support both synchronous and asynchronous AI execution.

---

## 🔹Feedback Architecture

The module is divided into 3 layers:

### 1. Orchestrator (Domain Logic)

* Decides execution strategy
* Prepares data for AI
* Coordinates response

```ts
feedback.service.ts
```

---

### 2. Provider (AI Integration)

* Handles OpenAI (or other providers)
* Stateless
* Replaceable

```ts
feedback.provider.ts
```

---

### 3. Transport Layer (Execution Mode)

Defines HOW feedback is executed:

#### 🔹Sync (MVP)

* Direct call to AI provider

```txt
Service → AI Provider → Response
```

---

#### 🔹Async (Future)

* Publish job to queue
* Worker processes AI
* Store result in DB

```txt
Service → Queue → Worker → DB
```

---

## 🔹Feedback Flow

### Sync (Current)

```txt
Metrics + Indicators → Prompt → AI → Feedback → Response
```

---

### Async (Future)

```txt
Metrics + Indicators → Queue → Worker → AI → Store → Fetch Result
```

---

## 🔹Example Prompt

```txt
You are analyzing a focus session.

Metrics:
- Active Time: 1800s
- Inactive Time: 600s
- Pauses: 5

Indicators:
- Continuity: 0.72
- Fragmentation: 0.3

Generate:
1. Short summary
2. Detailed explanation
3. Actionable recommendations
```

---

## 🔹Output

```json
{
  "summary": "...",
  "details": "...",
  "recommendations": ["...", "..."]
}
```

---

## 🔹Files

* `feedback.service.ts`
* `feedback.provider.ts`
* `feedback.queue.ts` (future)
* `/dto/feedback-request.dto.ts`

---

### 🔸Users Module

* User management
* Session ownership

---

### 🔸Common

Shared:

* entities
* interfaces
* enums
* utils

---

### 🔸Config

* Database config
* AI provider config
* Queue config (future)
* Environment variables

---

## 🔹Database Model (Conceptual)

Main entities:

* User
* Session
* Event
* Metrics
* Indicators
* Feedback

---

## 🔹Processing Strategy

The backend uses a **deterministic pipeline**:

1. Events are stored
2. Metrics are computed
3. Indicators are derived
4. Feedback is generated (sync or async)

---

## 🔹AI Integration Strategy

### AI is NOT used for:

* Calculations
* Metrics
* Business logic

### AI is used for:

* Interpretation
* Natural language feedback
* Recommendations

---

## 🔹Execution Strategy (Key Design)

The system supports two execution modes:

| Mode  | Description               |
| ----- | ------------------------- |
| Sync  | Direct AI call (MVP)      |
| Async | Queue + Worker (scalable) |

The strategy can be switched without changing business logic.

---

## 🔹Scalability Considerations

Future improvements:

* Move Feedback to async worker
* Queue system (RabbitMQ / Kafka)
* Batch processing
* Caching AI responses
* Retry strategies (failed AI calls)

---

## 🔹Design Decisions

* Modular NestJS architecture
* Deterministic core logic
* AI as optional interpretation layer
* Feedback execution abstracted (sync/async)
* Clear separation of concerns

---

## 🔹MVP Scope

* Event ingestion working
* Metrics correctly calculated
* Indicators generated
* Basic AI feedback implemented (sync mode)

```

