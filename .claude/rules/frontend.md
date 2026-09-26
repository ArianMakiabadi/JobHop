---
paths:
  - "frontend/**"
---

# Frontend (React + Vite SPA)

React 18 + Vite, plain JSX (no TypeScript), TanStack Query, React Hook Form, Tailwind CSS 3, React Router 7. Run commands from `frontend/`.

## Commands

```bash
npm install
npm run dev        # Vite dev server on http://localhost:3000
npm run build
npm run lint       # ESLint flat config (eslint.config.js)
npm run preview
```

There is no test suite. Vite 7 requires Node 20.19+ or 22.12+.

## Local development

- `BASE_URL` in `src/services/httpService.js` is hardcoded to the deployed API (`https://api.makiabadi.com/api`). To work against a local backend, change it to e.g. `http://localhost:5001/api`, and don't commit that change unless asked.
- `/demo-login` only works if the demo users (`admin@`, `employer@`, `freelancer@jobhop.com`, password `12345678`) already exist in the database.

## Architecture

- **Data flow:** `services/*Service.js` functions call `http` and unwrap the response to `data.data`. Custom hooks (`features/**/use*.js`, `hooks/use*.js`) wrap these in `useQuery` or `useMutation`. Mutations show `react-hot-toast` messages (errors come from `err.response.data.message`) and invalidate the related query keys, such as `["employer-projects"]`, `["projects", query]`, or `["user"]`.
- **URL-driven filters:** list hooks like `hooks/useProjects.js` read `location.search` and pass the raw query string straight to the API, so filter and sort UI (`UI/Filter.jsx`, `FilterDropDown.jsx`) works by updating search params.
- **Routing:** all routes live in `src/App.jsx`. Each role has a layout (`features/{admin,employer,freelancer}/*Layout.jsx`) built on `layouts/RoleLayout.jsx`, which takes the sidebar items from `*Nav.js`. Some pages, such as `SubmittedProjects`, `Project`, and `Proposals`, are reused across roles.
- `features/` holds domain UI and hooks grouped by feature or role. `pages/` holds route-level screens. `UI/` holds shared primitives (`Table`, `Modal`, `TextField`, `RHFSelect`, and others).
- **Theming:** Tailwind colors (`primary-*`, `secondary-*`, and so on) map to CSS variables defined in `src/index.css`. Dark mode works by having `context/DarkModeContext.jsx` toggle a `dark-mode`/`light-mode` class on `<html>`, which switches those variables. It does not use Tailwind's `dark:` variant. Use the theme tokens rather than raw Tailwind palette colors.
- `public/_redirects` provides the SPA fallback for static hosting.
