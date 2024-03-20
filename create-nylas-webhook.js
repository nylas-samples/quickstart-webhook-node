import 'dotenv/config'
import Nylas, { WebhookTriggers } from "nylas"

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

const createWebhook = async () => {
  try {
    const webhook = await nylas.webhooks.create({
      requestBody: {
        triggerTypes: [WebhookTriggers.EventCreated],
        webhookUrl: process.env.WEBHOOK_CALLBACK_URL,
        description: "My first webhook",
        notificationEmailAddress: [process.env.NOTIFICATION_EMAIL],
      }
    })

    console.log("Webhook created:", webhook)
  } catch (error) {
    console.error("Error creating webhook:", error)
  }
}

createWebhook() 


/* Example output:
Webhook created: {
  requestId: '1',
  data: {
    id: '2',
    description: 'My first webhook',
    triggerTypes: [ 'event.created' ],
    webhookUrl: 'your-webhook-callback-url',
    webhookSecret: 'webhook-secret-to-store',
    status: 'active',
    notificationEmailAddresses: null,
    statusUpdatedAt: 1710964914,
    createdAt: 1710964914,
    updatedAt: 1710964914
  }
}
*/