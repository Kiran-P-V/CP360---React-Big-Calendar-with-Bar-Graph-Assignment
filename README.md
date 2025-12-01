## Calendar Matrics Dashboard

This project is a small demo app that combines **React Big Calendar** with a **bar graph** to visualize date-wise metrics, backed by a small **Redux Toolkit** store.

- **Calendar views**: Day, week, and month.
- **Highlighted dates**: Dates that have data are visually highlighted.
- **Selected date highlight**: The currently selected date is emphasized.
- **Details panel**: When you click a date, the selected date and a bar chart (if data is available) are shown.
- **No-data warning**: If there is no data for the selected date, a warning message is shown with the selected date.

The app uses:

- `react-big-calendar` for the calendar UI
- `date-fns` for date handling
- `recharts` for the bar chart
- `@reduxjs/toolkit` + `react-redux` for global state (selected date + data source)
- `vite` for fast development and builds

---

### 1. Prerequisites

- **Node.js**: `>= 18`
- **npm** (comes with Node) or **pnpm** / **yarn**

### 2. Getting Started

From the project root run:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

Vite will print a local URL such as `http://localhost:5173` – open that in your browser.
