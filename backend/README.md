# JobHop (Backend)

This project is the backend API for JobHop, written in TypeScript (Express, Mongoose, Joi).

## SMS / OTP provider

This project previously used Kavenegar. It's been migrated to Twilio Verify.

Required environment variables for Twilio Verify:

- TWILIO_ACCOUNT_SID - Twilio Account SID
- TWILIO_AUTH_TOKEN - Twilio Auth Token
- TWILIO_VERIFY_SID - Twilio Verify Service SID
- TWILIO_FROM - (optional) Twilio phone number used for SMS sending when using direct SMS (not required for Verify)

Set IS_TESTING_MODE_OTP=true for development to return the OTP in the API response instead of sending SMS.

## How to run

1. Copy `.env.example` to `.env` and fill in the secrets:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Run in development (runs `index.ts` with `tsx` and restarts on changes):

```bash
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API from the TypeScript sources with `tsx watch` |
| `npm run typecheck` | Type-check with `tsc` (no output files) |
| `npm run build` | Compile to `dist/` with `tsc` |
| `npm start` | Start the compiled API (`node dist/index.js`). Run `npm run build` first |

In production, install with dev dependencies (the build needs TypeScript), then run `npm run build` and `npm start`.

Static files are served from the `public/` folder in the directory the server is started from.
