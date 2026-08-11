# UI Redesign - Premium Purple Theme (#6D28D9)

## Goal
Complete modern, consistent UI redesign across both Admin and Student dashboards
using white background + purple (#6D28D9) primary. Keep all logic/APIs/routes unchanged.

## Plan / Checklist

### Shared Components & Design Tokens
- [x] Create `PageHero.jsx` (reusable hero section)
- [x] Create `StatCard.jsx` (gradient stat cards with animated counter)
- [x] Update admin `DashboardCard.jsx` (gradient icon tile + animated counter)
- [x] Update student `DashboardCard.jsx` (premium card with arrow link)
- [x] Update `dataGridStyles.js` (sticky headers, zebra rows, hover, rounded)
- [x] Update `formStyles.js` (purple primary/focus colors)

### Admin Pages
- [x] `AdminDashboard.jsx` (PageHero + StatCard integration)
- [x] `Students.jsx`
- [x] `EmployeePage.jsx`
- [x] `RoomPage.jsx`
- [x] `FeePage.jsx`
- [x] `AdminOutpassPage.jsx`
- [x] `Notice.jsx`

### Student Pages
- [x] `StudentDashboard.jsx` (PageHero integration)
- [x] `StudentNotice.jsx`
- [x] `ProfilePage.jsx`
- [x] `FeePage.jsx`
- [x] `OutpassHistoryPage.jsx`
- [x] `RequestOutpassPage.jsx`

### Verification
- [x] Run `npm run build` and verify no errors
- [ ] Test all pages render without crashes
