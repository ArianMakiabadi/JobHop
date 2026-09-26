---
paths:
  - "backend/app/http/middlewares/**"
  - "backend/app/http/controllers/userAuth.controller.ts"
  - "backend/app/router/**"
  - "backend/app/models/user.ts"
  - "backend/utils/constants.ts"
  - "frontend/src/features/authentication/**"
  - "frontend/src/UI/ProtectedRoute.tsx"
  - "frontend/src/services/httpService.ts"
  - "frontend/src/services/authService.ts"
  - "frontend/src/App.tsx"
---

# Auth and access model (spans frontend and backend)

- Login is phone + OTP (`/api/user/get-otp`, `check-otp`). After that, new users complete their profile and pick the role `EMPLOYER` or `FREELANCER`. `ADMIN` accounts log in via `/admin-login` or demo login.
- User `status` is a number: `0` rejected, `1` pending (the default), `2` approved. Only approved users can reach protected APIs.
- Tokens are JWT access and refresh tokens stored in **signed, HTTP-only cookies**. The frontend never handles tokens directly. The Axios instance uses `withCredentials: true`, and a response interceptor retries a request once after a 401 by calling `/user/refresh-token`.
- Backend gating is layered in `backend/app/router/router.ts`: `verifyAccessToken` → `isVerifiedUser` (status must be 2) → `authorize(...ROLES)` (`app/http/middlewares/permission.guard.ts`). Role checks are applied either on the whole router (`/admin`) or on individual routes (`app/router/project.ts`, `proposal.ts`).
- Frontend gating: `UI/ProtectedRoute.tsx` wraps each role area. `features/authentication/useAuthorize.ts` takes the first URL segment (`/admin`, `/employer`, `/freelancer`) as the required role and compares it with `user.role` from the `["user"]` query. Depending on the result, it redirects to `/auth`, `/pending`, or `/unauthorized`. A new role area must use a top-level path that matches its role name.
