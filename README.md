## React Big Calendar with Bar Graph

This project is a small demo app that combines **React Big Calendar** with a **bar graph** to visualize date-wise data, backed by a small **Redux Toolkit** store.

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

Works on Windows, macOS, and Linux as long as a recent Node.js version is installed.

---

### 2. Getting Started

From the project root (`d:\codes\360` or the cloned directory), run:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

Vite will print a local URL such as `http://localhost:5173` – open that in your browser.

---

### 3. Project Scripts

- **`npm run dev`**: Start the Vite development server with hot reload.
- **`npm run build`**: Build the app for production into the `dist` folder.
- **`npm run preview`**: Preview the production build locally.

---

### 4. State Management & Dummy Data

- A Redux store (`src/store`) keeps:
  - `data`: the calendar data coming from `src/data/dummyData.js`
  - `selectedDate`: last date the user clicked
- `CalendarWithBarGraph` subscribes to the store via `react-redux` hooks. Selecting slots/events dispatches an action to update `selectedDate`.
- You can extend the slice with new reducers (e.g., filters, async loading) without touching the UI tree.

**Dummy data format**

Dummy data is defined in `src/data/dummyData.js`. It is keyed by **date string** in the format `DD-MM-YYYY`, with an array of objects representing user values for that date:

```javascript
export const dummyData = {
  "01-11-2025": [
    { user_1: 1 },
    { user_2: 2 },
    { user_3: 3 },
    { user_4: 4 }
  ],
  "02-11-2025": [
    { user_1: 1 },
    { user_2: 2 },
    { user_3: 3 },
    { user_4: 4 }
  ]
};
```

You can freely add or modify dates and values, as long as:

- Keys remain `DD-MM-YYYY`.
- Each date value is an array of single-key objects where the key is the user and the value is a number.

---

### 5. How the Calendar Works

- The calendar is implemented in `src/components/CalendarWithBarGraph.jsx`.
- `react-big-calendar` is configured with a **date-fns localizer**.
- For each date in `dummyData`, an **all-day event** is created so those days appear as having entries.
- The calendar supports `month`, `week`, and `day` views.

**Date highlighting**

- Dates that have data in `dummyData` are highlighted using a custom `dayPropGetter`.
- The currently selected date is highlighted in a stronger color.

**Selecting a date**

- Clicking a **day cell** or an **event** sets that date as the selected date.
- The right-hand sidebar shows:
  - The selected date, formatted nicely.
  - A bar chart of user values if there is data for that date.
  - Otherwise, a warning message:
    - **“No data found for the selected date: &lt;date&gt;”**

---

### 6. Bar Graph Details

- Implemented with `recharts` (`BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`, `CartesianGrid`).
- Each bar represents a single user’s value for the selected date.
- Data is derived from the `dummyData` for the currently selected date.

---

### 7. File Overview

- `package.json` – Project metadata and dependencies.
- `vite.config.mts` – Vite configuration with React plugin.
- `index.html` – Entry HTML template.
- `src/main.jsx` – React entry point; renders `App`.
- `src/App.jsx` – Top-level layout.
- `src/components/CalendarWithBarGraph.jsx` – Main calendar + bar graph logic.
- `src/data/dummyData.js` – Dummy JSON-like data keyed by dates.
- `src/index.css`, `src/App.css`, `calendar.css` – Styling for layout and calendar highlighting.

---

### 8. Customization Ideas

- Add more users or metrics to the dummy data.
- Add filters (e.g., show only certain users).
- Replace the sidebar with a modal popup if you prefer a dialog-style UI.
- Hook this up to a real API instead of local dummy data.

---

### 9. Known Behaviors

- If you select any date **without data**, the app will clearly display the warning:
  - **“No data found for the selected date: &lt;Selected Date&gt;”**
- All logic is implemented with cross-platform libraries and should behave identically on Windows, macOS, and Linux as long as Node and a modern browser are available.


