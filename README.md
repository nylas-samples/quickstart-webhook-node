# How to run

This repo contains functionality to complete two tasks:
- **Backend Server**: A  server that will receive a request from Nylas to confirm the server endpoint is active prior to activate a Nylas Webhook. Note the backend server must be publicly available for Nylas to call, so it needs to be hosted on a service. It can be hosted locally, however, running a proxy server has been problematic due as the proxy server may restrict free use of webhook creation.
- **Nylas Webhook Create Script**:  The require code for creating a Nylas Webhook that can be run as a local script.

1. Install all the packages using `npm i`

2. Add the following environment variables, consider copying the `.env.example` file and creating an `.env` file:

```
NYLAS_CLIENT_ID=NYLAS_CLIENT_ID
NYLAS_API_KEY=NYLAS_API_KEY
NYLAS_API_URI=NYLAS_API_URI
WEBHOOK_CALLBACK_URL=WEBHOOK_CALLBACK_URL
NOTIFICATION_EMAIL=NOTIFICATION_EMAIL
# WEBHOOK_SECRET available after receiving the webhook response
WEBHOOK_SECRET=WEBHOOK_SECRET
```

3. Host the server or add the functionality to your existing dev server for testing purposes:

```npm run start```

4. Once the endpoint is running and publicly available on the web, run the script to create the webhook

```npm run create-nylas-webhook```

5. Grab the webhook secret generated in step 2 and use it to replace the empty **WEBHOOK_SECRET** variable

6. Create calendar events and you will the webhooks notification showing up on your application logs.