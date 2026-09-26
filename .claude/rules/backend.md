---
paths:
  - "backend/**"
---

# Backend (Express REST API)

Express 4 in TypeScript (strict; compiled to CommonJS), Mongoose 7, Joi, JWT in signed cookies, Twilio Verify for SMS OTP. Run commands from `backend/`.

## Commands

```bash
cp .env.example .env && npm install
npm run dev        # tsx watch index.ts
npm run typecheck  # tsc --noEmit
npm run build      # tsc -> dist/
npm start          # node dist/index.js (build first)
```

The server listens on `PORT` (5001 in `.env.example`) and mounts all routes under `/api`. There is no test suite and no backend ESLint; verify with `npm run typecheck` and `npm run build`.

## Local development

- Set `ALLOW_CORS_ORIGIN=http://localhost:3000` and `DOMAIN=localhost` so cookie auth works with the local frontend.
- Set `IS_TESTING_MODE_OTP=true` so the OTP is returned in the API response instead of being sent by SMS.

## Architecture

- `index.ts` instantiates the `Application` class in `app/server.ts`, which sets up CORS, the cookie parser, static files from `public/`, the `/api` routes, and a JSON error handler (`{ statusCode, message }`).
- Modules use ES `import`/named exports (no default exports). Model types (`IUser`/`UserDocument`, …) live next to each model. Behind `verifyAccessToken`, read the user with `getAuthUser(req)` from `utils/functions`, not `req.user!`.
- Controllers are classes that extend `Controller` from `app/http/controllers/controller.ts`, which calls `auto-bind`. Each module exports a singleton instance. Route handlers are wrapped in `express-async-handler`, so a controller should just `throw createHttpError.X(...)`.
- Request bodies are validated with Joi schemas in `app/http/validators/` via `schema.validateAsync(req.body)` inside the controller. Each schema file also exports the matching raw request-body type (`AddProjectBody`, …); controllers annotate `req.body` with it but keep reading the raw body, not Joi's converted result.
- Success responses always have the shape `{ statusCode, data: { ...payload } }`. The frontend relies on this and unwraps `data.data`.
- The project list endpoint (`GET /project/list`) supports `search` (Mongo `$text`), `category` (a comma-separated list of category `englishTitle` values, or `ALL`), `status` (`OPEN`/`CLOSED`), and `sort` (`latest`/`earliest`).
