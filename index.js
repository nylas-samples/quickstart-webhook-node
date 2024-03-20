import "dotenv/config";
import express from "express";
import Nylas from "nylas";
import crypto from 'crypto';

const config = {
  clientId: process.env.NYLAS_CLIENT_ID,
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
};

const nylas = new Nylas({
  apiKey: config.apiKey,
  apiUri: config.apiUri, // "https://api.us.nylas.com" or "https://api.eu.nylas.com"
});

const app = express();
const port = 3000;

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// route to respond to Nylas webhook creation webhook with challenge parameter
app.get("/callback/nylas", (req, res) => {
  if (req.query.challenge) {
    console.log(`Received challenge code! - ${req.query.challenge}`);
    console.log(`Now returning challenge code! - ${req.query.challenge}`);
    
    // we need to enable the webhook by responding with the challenge parameter
    return res.send(req.query.challenge);
  }
});

// route to receive webhook events after creating webhook
app.post("/callback/nylas", (req, res) => {  
  const nylasSignature = 'x-nylas-signature';
  const hashAlgorithm = 'sha256'

  /* secret is storing the webhook secret in-memory for demo purposes
  TODO: Store the secret and retrieve as needed to verify the webhook signature
  */
  const webhookSecret = process.env.WEBHOOK_SECRET;
   
  console.log('==========Webhook log start==========');
  console.log(JSON.stringify(req.body.data));

  // Verify the webhook signature
  const signature = req.headers[nylasSignature];

  const digest = crypto
    .createHmac(hashAlgorithm, webhookSecret)
    .update(req.body.data)
    .digest('hex')

  const isValidWebhook = digest === nylasSignature
  console.log({isValidWebhook})
  console.log('==========Webhook log end==========\n');

  // Responding to Nylas is important to prevent the webhook from retrying
  return res.status(200).end();
});