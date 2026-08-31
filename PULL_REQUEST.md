# Pull Request: National Material Master Enterprise Search & Match Dashboard

## PR Title
`feat: National Material Master Enterprise Search & Match Dashboard with SpecularButton & 21st.dev CPSE Cards`

---

## 📌 Summary of Changes

This Pull Request delivers the production-ready **Material Search & Match** dashboard for **National Material Master (MaterialSync AI / UMIP)**, created for SIH 2026. The implementation faithfully recreates the layout, hierarchy, color palette, dark navy sidebar, enterprise horizontal result rows, and dynamic circular match score gauges shown in the reference design.

### 🌟 Key Highlights
1. **Visual Source of Truth Alignment**:
   - Recreated the dark navy sidebar (`#0B132B`) with the crystal hexagon logo, glow-highlighted navigation (`Material Search`), user profile card (`Parag Yeole`, `Admin`), and bottom **AI Engine Status** panel (`AI Engine Status • Online`, `Model Version v2.4.1`).
   - Top header with page title, theme toggle, notifications badge counter (`3`), and help modal trigger.

2. **SpecularButton Integration (React Bits)**:
   - Integrated open-source WebGL-powered shader button (`<SpecularButton />`) using `ogl`.
   - Features cursor proximity lighting, hardware-accelerated SDF rim highlights, and auto-sweep animations.
   - Applied to the main **Search Bar** (`SearchSection.jsx`) and the **Hero CTA** (`DashboardView.jsx`).

3. **Enterprise Horizontal Result Rows**:
   - Built spacious horizontal enterprise rows (`ResultRow.jsx`) replacing generic cards.
   - Features rank number badges (#1, #2, #3), photorealistic 3D product images, `Best Match` pill, short description, dimensional specs, and category tags.
   - Integrated CPSE identity badges (CPCL, IOCL, BPCL, HPCL, ONGC) with legacy material codes and unified National Common Codes (`NMM-BA-6205-STD`).
   - Added interactive `View Details >` modal trigger for side-by-side spec comparison and AI confidence breakdown.

4. **Dynamic SVG Match Score Ring**:
   - Built a data-driven SVG circular ring progress gauge (`MatchScoreRing.jsx`) with multi-stop linear gradients.
   - Implemented threshold color bands: 95–100% Emerald (`Highly Similar`), 85–94% Sky Blue (`Highly Similar`), 70–84% Amber (`Likely/Possibly Similar`).

5. **Spacious CPSE Integration Cards**:
   - Redesigned the CPSE section into spacious 21st.dev / shadcn style enterprise cards (`DashboardView.jsx`).
   - Displays company brand badges, refinery hub locations (`Chennai TN`, `Vadodara GJ`, `Mumbai MH`, `Visakhapatnam AP`), mapped item counts, and live match rates with smooth hover float animations.

6. **Complete Navigation Views**:
   - Created full views for all sidebar items: `Dashboard`, `Material Search`, `AI Matching`, `My Approvals`, `Common Codes`, `CPSE Mapping`, `Upload Data`, `Reports & Analytics`.

---

## 🛠️ File Changes Breakdown

| File Path | Description |
| shadow | ------------ |
| `src/app/page.jsx` | Main application layout connecting sidebar, header, active views, search filter, sorting, and detail modal. |
| `src/components/Sidebar.jsx` | Dark navy sidebar with hexagon logo, active tab indicator, user profile, and live AI engine status card. |
| `src/components/Header.jsx` | Header bar with search title, theme toggle, notifications bell, and help icon. |
| `src/components/SearchSection.jsx` | Search tabs, search input, clear button, React Bits SpecularButton search trigger, example pills, and Search Tips panel. |
| `src/components/ResultRow.jsx` | Enterprise horizontal result row with rank badge, 3D product photo, CPSE metadata, MatchScoreRing gauge, and View Details trigger. |
| `src/components/MatchScoreRing.jsx` | Dynamic SVG ring gauge component with linear gradient strokes and similarity classification badge. |
| `src/components/MaterialDetailModal.jsx` | Comprehensive material detail modal comparing technical specs, CPSE stock, and AI confidence factors. |
| `src/components/SpecularButton.jsx` | WebGL-powered shader button component imported from React Bits. |
| `src/components/SpecularButton.css` | Stylesheet for canvas overlay and button rim lighting. |
| `src/components/ui/server-management-table.jsx` | Reusable CPSE node table primitive. |
| `src/components/Views/DashboardView.jsx` | Hero banner, 3-column dark metrics bar, and spacious 21st.dev CPSE cards grid. |
| `src/components/Views/*.jsx` | Modular views for `AiMatchingView`, `MyApprovalsView`, `CpseMappingView`, `CommonCodesView`, `UploadDataView`, `ReportsAnalyticsView`. |
| `src/data/mockData.js` | Enriched dataset matching reference screenshot items (Ball Bearing 6205 SKF, valves, bolts, gaskets, CPSEs). |
| `public/images/*.jpg` | Photorealistic 3D product asset images. |

---

## 📦 Dependencies Added

```json
"dependencies": {
  "ogl": "^1.0.11",
  "next-themes": "^0.4.6"
}
```

---

## 🧪 Verification & Build Status

- **Build Verification**: Executed `npm run build` — compiled cleanly with **0 errors**.
- **Browser Testing**: Verified across desktop viewports (`1920x912`) and responsive layouts using automated browser subagent.
- **Interactivity**: Verified search updates, example pill population, tab switching, sorting, and detail modal toggles.
