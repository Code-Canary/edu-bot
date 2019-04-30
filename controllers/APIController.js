const messengerService = require('../service/messengerService');
const renderer = require('../render/renderer');

function renderHtml(req, res, userSchema) {
    const userId = req.query['userId'];
    console.log('Rendering for user: ')
    return userSchema.findOne({ 'userId': userId })
        .then(function (user) {
            const renderedContent = renderer.render(user.answers);
            console.log('Rendered content: ', renderedContent);

            res.status(200)
                .set('Content-Type', 'text/html')
                .send(renderedContent);
        }, function (error) {
            console.error('Error getting user: ', error);
            res.sendStatus(400);
        });
}

function verifyServer(req, res) {

    const VERIFY_TOKEN = 'double_or_nothing';

    // Parse params from the webhook verification request
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Check if a token and mode were sent
    if (mode && token) {

        // Check the mode and token sent are correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Respond with 200 OK and challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
}

function handleWebhookEvent(req, res) {

    // Parse the request body from the POST
    let body = req.body;

    console.log("Webhook:", body);
    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {
        body.entry.forEach(function (entry) {
            console.log("Received Entry: ", entry);
            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];

            console.log("Webhook event is: ", webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                console.log("Webhook message", webhook_event.message);
                messengerService.handleMessage(sender_psid, webhook_event.message);
            } if (webhook_event.message.quick_reply) {
                console.log("Webhook message", { text: webhook_event.message.quick_reply.payload });
                messengerService.handleMessage(sender_psid, webhook_event.message);
            } else {

                console.log("webhook payload", webhook_event.postback);
                messengerService.handlePostback(sender_psid, webhook_event.postback);
            }

        });
        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
}

module.exports = {
    verifyServer: verifyServer,
    handleWebhookEvent: handleWebhookEvent,
    renderHtml
}
