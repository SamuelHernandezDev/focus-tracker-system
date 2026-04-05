# 🔸Frontend Design

---

## 🔹Overview

The frontend is responsible for:

* Managing authentication flow (login, logout, persistence)
* Capturing user interaction (focus sessions)
* Visualizing metrics and indicators
* Displaying feedback and recommendations
* Managing session lifecycle
* Providing a clean and intuitive UI

The application is built using:

* **Next.js (App Router)**
* **React (Client Components where needed)**
* **Tailwind CSS**
* **Context API (Auth state)**

---

## 🔹Core Responsibilities

* UI rendering
* Authentication state management
* Route protection
* Event capture (future)
* Data visualization
* Communication with backend API

---

## 🔹High-Level Structure

```
/app
  layout.tsx
  page.tsx
  /login
  /(protected)
    /dashboard
    /session

/modules
  /auth
    /components
    /context
    /hooks
    /types

/services
/hooks
/utils
/styles
```

---

## 🔹Application Flow

```
User → Login → AuthContext → Protected Routes → Features → API → UI Update
```

---

## 🔹Routing (Next.js App Router)

### 🔸Public Routes

* `/` → Landing (Home)
* `/login` → Authentication

### 🔸Protected Routes

* `/dashboard` → Metrics overview
* `/session` → Active session

### 🔐 Protection Strategy

* Route grouping using `(protected)`
* `ProtectedRoute` component
* Redirect unauthenticated users → `/login`

---

## 🔹Authentication Architecture

### 🔸AuthContext

Handles:

* `user` state
* `loading` state
* `login()`
* `logout()`

### 🔸Persistence

* Stored in `localStorage`
* Restored on app load

### 🔸Flow

```
Login → setUser → localStorage → ProtectedRoute → Access granted
Logout → clearUser → redirect → Access denied
```

---

## 🔹Modules

---

### 🔸Auth Module

Handles authentication logic.

#### Includes:

* `AuthContext`
* `useAuth`
* `ProtectedRoute`
* `LoginForm`

---

### 🔸Dashboard Module

Displays user overview.

#### Current Features:

* Metrics cards (mock)
* Recent sessions (mock)
* Quick actions

#### Future:

* Real metrics
* Charts
* Historical trends

---

### 🔸Session Module

Handles focus sessions.

#### Current:

* UI structure
* Session controls (mock)

#### Future:

* Timer logic
* Event tracking
* Session lifecycle

---

### 🔸Events Module (Planned)

Captures user behavior.

#### Events:

* Mouse activity
* Keyboard input
* Tab visibility
* Inactivity

---

### 🔸Feedback Module (Planned)

Displays AI-generated insights.

* Summary
* Detailed explanation
* Recommendations

---

## 🔹State Management

Current:

* React Context (Auth)

Future:

* Zustand (recommended for scaling)
* Separation of UI vs domain state

---

## 🔹API Layer

Handles communication with backend.

#### Planned Services:

```
/services/api.ts
/services/auth.service.ts
/services/session.service.ts
/services/events.service.ts
```

---

## 🔹Data Flow

```
Session → Events → Backend → Metrics → Indicators → Feedback → UI
```

---

## 🔹UI/UX Principles

* Clean and minimal interface
* Clear navigation
* Immediate feedback
* Progressive enhancement
* No unnecessary friction

---

## 🔹Styling

* Tailwind CSS
* CSS variables for theming
* Component-based styling
* Light/Dark mode ready

---

## 🔹Performance Considerations

* Avoid unnecessary re-renders
* Lazy load components when needed
* Batch future event requests
* Optimize client-side logic

---

## 🔹Security Considerations

* Route protection via client guards
* No sensitive data stored in frontend
* LocalStorage used only for session persistence

---

## 🔹Future Improvements

* Global layout with sidebar (SaaS style)
* Real-time session tracking
* Charts and analytics
* AI feedback visualization
* Notifications system
* Role-based access (if needed)

---

## 🔹Design Decisions

* Next.js App Router for scalability
* Route-based protection instead of per-page guards
* Context API for MVP simplicity
* Modular architecture for future separation
* UI-first development for rapid iteration

---

## 🔹MVP Scope

* Authentication flow working
* Persistent login
* Protected routing implemented
* Dashboard UI (mock data)
* Session UI (base structure)

---
