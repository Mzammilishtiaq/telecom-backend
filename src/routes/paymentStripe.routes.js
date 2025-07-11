const express = require('express');
const paymentrouter = express.Router();
const {handleStripeWebhook} = require('../controllers/paymentStripe/paymentStripe.controller');
const {handleStripeSubscription} = require('../controllers/paymentStripe/createSubscription.controller');
const bodyParser = require('body-parser');
/**
 * @swagger
 * /api/payment/webhook:
 *   post:
 *     summary: Stripe webhook to handle successful payments
 *     tags: [Payment]
 *     description: |
 *       Stripe sends a `payment_intent.succeeded` event to this endpoint.
 *       It upgrades the user's role to `PAID_USER` or `ENTERPRISE_USER` based on metadata.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Stripe sends a raw payload here; do not send manually.
 *     responses:
 *       200:
 *         description: Webhook received and processed successfully
 *       400:
 *         description: Webhook signature invalid or metadata missing
 *       500:
 *         description: Server error during user upgrade
 */

paymentrouter.post('/webhook', bodyParser.raw({ type: 'application/json' }), handleStripeWebhook);

paymentrouter.post('/subscription', handleStripeSubscription);



module.exports = paymentrouter;
