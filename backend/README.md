# JobHop (Backend)

This project is the backend API for JobHop.

## SMS / OTP provider

This project previously used Kavenegar. It's been migrated to Twilio Verify.

Required environment variables for Twilio Verify:

- TWILIO_ACCOUNT_SID - Twilio Account SID
- TWILIO_AUTH_TOKEN - Twilio Auth Token
- TWILIO_VERIFY_SID - Twilio Verify Service SID
- TWILIO_FROM - (optional) Twilio phone number used for SMS sending when using direct SMS (not required for Verify)

Set IS_TESTING_MODE_OTP=true for development to return the OTP in the API response instead of sending SMS.

## How to run

1. Copy `.env` and fill secrets.
2. Install dependencies:

```bash
npm install
```

3. Run in development:

```bash
npm run dev
```
