# JobHop

JobHop is a full-stack marketplace for connecting employers with freelance talent. It combines phone-based sign-in, an approval step for new accounts, and focused workspaces for employers, freelancers, and administrators.

**Live site:** [jobhop.makiabadi.com](https://jobhop.makiabadi.com/)

## What it does

JobHop supports the complete project-proposal cycle:

1. A visitor signs in with a phone number and verifies a one-time code.
2. New users complete a profile and choose to join as an employer or freelancer.
3. An administrator reviews the new account before it can use the platform.
4. Employers publish projects with a category, budget, tags, and deadline.
5. Freelancers browse open work and submit proposals with a price, duration, and introduction.
6. Employers review incoming proposals and select a freelancer; project availability can also be opened or closed.

## Role-based workspaces

| Role | Workspace capabilities |
| --- | --- |
| **Employer** | Create, edit, close, and delete own projects; review project proposals; accept or reject applicants; manage profile details. |
| **Freelancer** | Browse and filter available projects; send proposals; track submitted proposals; manage profile details. |
| **Administrator** | Approve or reject users; manage categories; oversee users, projects, and proposals; manage profile details. |

## Highlights

- Phone-number authentication with SMS OTP via Twilio Verify
- Signed, HTTP-only access and refresh-token cookies
- Role- and approval-aware route protection
- Project catalogue with text search, category filtering, and date sorting
- Project status controls and proposal decision workflow
- Responsive React interface with light/dark theme support

## Architecture

```text
React + Vite client  ──cookie-based API requests──>  Express API  ──>  MongoDB
       │                                                │
       └── React Query, React Hook Form, Tailwind       └── Twilio Verify (OTP)
```

| Area | Main technologies |
| --- | --- |
| Frontend | React 18, Vite, React Router, TanStack Query, React Hook Form, Tailwind CSS |
| Backend | Node.js, Express, Mongoose, Joi, JSON Web Tokens |
| Data | MongoDB |
| Authentication | Twilio Verify, signed cookies, JWT access/refresh tokens |

## Repository structure

```text
.
├── frontend/                 # Vite single-page application
│   └── src/
│       ├── features/         # Role-specific UI and mutations
│       ├── pages/            # Route-level screens
│       ├── services/         # API clients
│       └── UI/               # Shared interface components
└── backend/                  # Express REST API
    └── app/
        ├── http/             # Controllers, validators, middleware
        ├── models/           # Mongoose models
        └── router/           # Public and protected API routes
```

## Run locally

### Prerequisites

- Node.js 20.19+ or 22.12+ (required by the frontend's Vite version)
- npm
- A MongoDB database (local or Atlas)
- A Twilio Verify service for SMS sign-in, or testing-mode OTPs for local development

### 1. Configure and start the API

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Update `backend/.env` with appropriate values. The supplied example documents every required setting:

| Variable | Purpose |
| --- | --- |
| `APP_DB` | MongoDB connection URI |
| `ACCESS_TOKEN_SECRET_KEY` | Secret for short-lived access tokens |
| `REFRESH_TOKEN_SECRET_KEY` | Secret for refresh tokens |
| `COOKIE_PARSER_SECRET_KEY` | Secret used to sign cookies |
| `ALLOW_CORS_ORIGIN` | Frontend origin permitted to send credentials |
| `DOMAIN` | Cookie domain; use `localhost` for local development |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SID` | Twilio Verify credentials |
| `IS_TESTING_MODE_OTP` | Set to `true` locally to return the one-time code in the API response instead of sending SMS |

The API listens on `PORT` (the example uses `5001`) and is mounted under `/api`.

### 2. Point the frontend at your API

The frontend development server runs on `http://localhost:3000`.

Before working locally, set `BASE_URL` in [`frontend/src/services/httpService.js`](frontend/src/services/httpService.js) to your local API, for example:

```js
const BASE_URL = "http://localhost:5001/api";
```

The value is currently set to the deployed API so the hosted application works out of the box. Make sure this URL exactly matches the backend port and that `ALLOW_CORS_ORIGIN=http://localhost:3000` is present in the backend environment.

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo access

The app provides a demo-login screen at [/demo-login](https://jobhop.makiabadi.com/demo-login). It expects matching demo users to exist in the connected database:

| Role | Email | Password |
| --- | --- | --- |
| Administrator | `admin@jobhop.com` | `12345678` |
| Employer | `employer@jobhop.com` | `12345678` |
| Freelancer | `freelancer@jobhop.com` | `12345678` |

For a fresh local database, create corresponding active users if you want to use this path; otherwise sign in through the OTP flow and approve the account from an administrator account.

## API at a glance

All endpoints are prefixed with `/api`.

| Area | Endpoint group | Notes |
| --- | --- | --- |
| Authentication | `/user` | OTP request/verification, profile completion, session refresh, profile updates, logout, and demo/admin login |
| Projects | `/project` | Authenticated project listing; employers and admins can create and manage projects |
| Proposals | `/proposal` | Freelancers submit and view proposals; employers and admins decide proposal status |
| Categories | `/category` | Readable project-category list |
| Administration | `/admin` | Administrator-only user approval and category management |

Protected API requests rely on credentialed cookies. The frontend Axios client sends them automatically with `withCredentials: true`.

## Available scripts

| Directory | Command | Description |
| --- | --- | --- |
| `frontend/` | `npm run dev` | Start the Vite development server on port 3000 |
| `frontend/` | `npm run build` | Create a production frontend build |
| `frontend/` | `npm run lint` | Run ESLint |
| `frontend/` | `npm run preview` | Preview the production frontend build |
| `backend/` | `npm run dev` | Start the API with Nodemon |
| `backend/` | `npm start` | Start the API with Node.js |

## Deployment notes

Deploy the frontend as a static SPA and the backend as a Node.js service backed by MongoDB. Configure the backend production environment with the deployed frontend origin (`ALLOW_CORS_ORIGIN`), cookie domain (`DOMAIN`), MongoDB URI, token secrets, and Twilio credentials. Because authentication uses cross-origin cookies in production, the frontend origin, API origin, and cookie settings must be configured together.

The frontend includes [`frontend/public/_redirects`](frontend/public/_redirects) for SPA route handling on compatible static hosts.

## License

No license has been specified for this repository.
