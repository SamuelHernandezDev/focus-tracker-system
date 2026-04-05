# 📘 Guía de Trabajo del Proyecto

## Objetivo

Mantener un flujo de trabajo ordenado, evitar conflictos y facilitar la colaboración en el desarrollo del proyecto.

---

# 🧩 Flujo de trabajo general

* Cada tarea se asigna mediante un **issue**
* Cada cambio debe hacerse en una **rama nueva**
* Todos los cambios se integran mediante **Pull Requests (PR)**
* No se trabaja directamente sobre `main`

---

# Uso de ramas

## 📌 Formato de nombres

```bash
tipo/nombre-descriptivo
```

### Ejemplos:

```bash
feature/history-page
feature/session-timer
fix/navbar-bug
refactor/session-component
```

---

## 📌 Reglas

* Una rama = un issue
* No trabajar múltiples cosas en la misma rama
* Siempre crear la rama desde `main`

---

# 💾 Commits

## 📌 Formato

```bash
tipo: descripcion corta
```

### Tipos:

* `feat:` nueva funcionalidad
* `fix:` corrección de error
* `refactor:` mejora de código
* `style:` estilos
* `docs:` documentación

---

## 📌 Ejemplos

```bash
feat: add session history page
fix: correct timer reset bug
```

---

## Recomendación

Si tienes duda, puedes apoyarte en ChatGPT para generar el commit.

---

# 🔹 Flujo paso a paso (IMPORTANTE)

---

## 🔹 1. Ir a la raíz del proyecto

```bash
cd Focus-Tracker-System
```

---

## 🔹 2. Asegurarte de estar en main

```bash
git branch
```

Si NO estás en main:

```bash
git checkout main
```

---

## 🔹 3. Actualizar proyecto

```bash
git pull origin main
```

---

## 🔹 4. Crear nueva rama

```bash
git checkout -b feature/nombre-del-issue
```

Ejemplo:

```bash
git checkout -b feature/history-page
```

---

## 🔹 5. Trabajar en la tarea

👉 Aquí puedes programar normalmente

---

## 🔹 6. Antes de guardar cambios (MUY IMPORTANTE)

```bash
git pull origin main
```

👉 Esto evita conflictos

---

## 🔹 7. Guardar cambios

```bash
git status
git add .
git commit -m "feat: descripcion corta"
```

---

## 🔹 8. Subir cambios

```bash
git push origin nombre-de-tu-rama
```

Ejemplo:

```bash
git push origin feature/history-page
```

---

## 🔹 9. Crear Pull Request (PR)

1. Ir a GitHub
2. Ir a **Pull Requests**
3. Click en **New Pull Request**
4. Seleccionar tu rama
5. Crear PR

---

## 🔹 10. Esperar revisión

* No hacer merge tú
* Esperar aprobación

---

## 🔹 11. Después del merge

```bash
git checkout main
git pull origin main
```

---

## 🔹 12. Siguiente tarea

👉 Repetir desde el paso 4

---

# 🔄 Antes de subir cambios (RESUMEN CLAVE)

Siempre ejecutar:

```bash
git pull origin main
```

---

# 🚀 Pull Requests (PR)

## 📌 Reglas

* Todo cambio debe ir por PR
* No hacer push directo a `main`

---

## 📌 Qué incluir

* Qué hiciste
* Qué issue resuelve

---

## 📌 Ejemplo

```text
Implementación de la pantalla de historial.

Incluye:
- Lista de sesiones

Issue: #3
```

---

# 🧭 Organización del trabajo

## 👨‍💻 Samuel (arquitectura / lógica)

* `/services`
* lógica de datos
* estructura del sistema
* backend

---

## 🎨 Frontend UI

* `/pages`
* `/components`
* estilos (Tailwind)

---

## ⚠️ Regla importante

No modificar archivos fuera de tu área sin avisar.

---

# 💬 Comunicación

* Avisar en qué issue estás trabajando
* Preguntar si tienes dudas

---

## 📌 Ejemplo

> “Estoy trabajando en el issue #5”

---

# ⚠️ Conflictos

## ¿Cuándo ocurren?

Cuando dos personas modifican el mismo archivo

---

## Cómo evitarlos

* Ejecutar `git pull origin main` antes de commit
* No trabajar en los mismos archivos
* Seguir la división de responsabilidades

---

# 🚫 No hacer

* No trabajar en `main`
* No hacer push directo a `main`
* No modificar cosas fuera de tu tarea

---

# 🧠 Reglas clave

* No buscar perfección, buscar avance
* Cambios pequeños y claros
* Un issue = una tarea

---

# 🧪 Ejemplo completo

```bash
cd Focus-Tracker-System

git checkout main
git pull origin main

git checkout -b feature/history-page

# trabajar

git pull origin main

git status
git add .
git commit -m "feat: add history page"

git push origin feature/history-page
```

---

# ✅ Resumen rápido

* ✔ Crear rama
* ✔ Trabajar
* ✔ Actualizar antes de commit
* ✔ Commit claro
* ✔ Push
* ✔ PR
* ✔ Esperar revisión
