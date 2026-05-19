# JobHop — Freelancing Platform

A full-stack freelancing platform connecting Employers, Freelancers and Admins to manage projects, proposals and user approvals.

Live demo: https://JobHop.makiabadi.com/

## Overview

JobHop is a multi-role web application with three primary user panels:

- Employer: create/edit projects, review proposals, accept/reject freelancers.
- Freelancer: browse projects, submit proposals, manage profile.
- Admin: manage users, categories, projects and proposals; approve registrations.

## Key Features

- Multi-role authentication (Admin / Employer / Freelancer)
- Role-based dashboards and permissions
- Project creation, proposal submission and management
- Category-based project organization
- Admin approval workflow for new users

## Tech Stack

- Frontend: React, Vite, JavaScript, TailwindCSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication / OTP: Twilio Verify
- Deployment: Render / Netlify / MongoDB Atlas

## Repository Layout

- `frontend/` — React app (Vite). See frontend/README.md for more details and demo login.
- `backend/` — Express API. See backend/README.md for running and OTP/Twilio notes.

## Quick Start

Prerequisites: Node.js (16+ recommended), npm, MongoDB (Atlas or local).

1. Backend

```bash
cd backend
cp .env.example .env   # fill in secrets
npm install
npm run dev
```

Required backend env variables (Twilio / OTP highlights):

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_VERIFY_SID`
- `TWILIO_FROM` (optional)
- Optionally set `IS_TESTING_MODE_OTP=true` during development to return OTP in API responses.

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the frontend (usually at `http://localhost:5173`) and use the demo login (see frontend README) or create an account.

## Deployment

- Frontend: deployable to Netlify / Vercel / Render as a static SPA.
- Backend: deployable to Render / Heroku / similar Node hosting.
- Database: MongoDB Atlas is recommended for production.

## Contributing

Feel free to open issues or PRs. Follow existing code style and add tests where appropriate.

## License

This repository does not include a license file. Add one if you plan to open-source this project.
