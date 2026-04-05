# 🔸Frontend Design

---

## 🔹Overview

The frontend is responsible for:

- Capturing user interaction (focus sessions)
- Visualizing metrics and indicators
- Displaying feedback and recommendations
- Managing session flow
- Providing an intuitive user experience

The application is built using:

- **Next.js (React framework)**
- **Tailwind CSS (UI styling)**
- **Client-side event tracking**

---

## 🔹Core Responsibilities

- UI rendering
- Event capture
- State management
- Data visualization
- Communication with backend API

---

## 🔹High-Level Structure

The frontend is organized into:

```
/app
/components
/modules
/services
/hooks
/store
/types
/utils
/styles

```

---

## 🔹Application Flow

```
User Interaction → Event Capture → API → Response → UI Update
```

---

## 🔹Routing (Next.js App Router)

Main routes:

* `/` → Dashboard
* `/session` → Active session
* `/results` → Session results
* `/history` → Previous sessions

---

## 🔹Modules

---

### 🔸Session Module

Handles focus session lifecycle.

#### Responsibilities:

* Start session
* Track activity
* Detect inactivity
* End session

#### Components:

* `SessionScreen`
* `SessionTimer`
* `ActivityTracker`

---

### 🔸Events Module

Captures user behavior.

#### Events:

* mouse movement
* keyboard activity
* tab visibility
* inactivity periods

#### Files:

* `useEventTracker.ts`
* `event.service.ts`

---

### 🔸Dashboard Module

Displays metrics and insights.

#### Components:

* `MetricsCard`
* `Charts`
* `SessionSummary`

---

### 🔸Results Module

Displays evaluation of a session.

#### Includes:

* Metrics
* Indicators
* AI Feedback

#### Components:

* `ResultsSummary`
* `FeedbackCard`
* `RecommendationsList`

---

### 🔸History Module

Displays past sessions.

* Session list
* Comparisons
* Trends

---

### 🔸Feedback Module

Handles AI-generated feedback rendering.

* Summary
* Detailed explanation
* Recommendations

---

## 🔹State Management

Options:

* React Context (MVP)
* Zustand (recommended for scaling)

---

## 🔹API Layer

Handles communication with backend.

#### Files:

* `/services/api.ts`
* `/services/session.service.ts`
* `/services/events.service.ts`

---

## 🔹Data Flow

```
UI → Event Capture → Backend → Metrics → Indicators → Feedback → UI
```

---

## 🔹Visualization Strategy

Use charts for:

* Active vs inactive time
* Session timeline
* Focus score

Suggested libraries:

* Recharts
* Chart.js

---

## 🔹UI/UX Principles

* Minimal distractions
* Clear feedback
* Visual clarity
* Real-time responsiveness

---

## 🔹Styling

* Tailwind CSS
* Component-based styling
* Dark/light mode support (future)

---

## 🔹Performance Considerations

* Debounce event tracking
* Batch API calls
* Avoid excessive re-renders

---

## 🔹Future Improvements

* Real-time updates (WebSockets)
* Advanced charts
* Gamification
* Notifications

---

## 🔹Design Decisions

* Next.js for scalability
* Modular architecture
* Clear separation of UI and logic
* Backend-driven data

---

## 🔹MVP Scope

* Session tracking working
* Events captured correctly
* Dashboard basic metrics
* Feedback displayed

```

