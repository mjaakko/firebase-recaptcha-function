const functions = require('firebase-functions')
const fetch = require('node-fetch')

exports.getValue = functions.https.onRequest(async (request, response) => {
    const responseToken = request.param('token')
    if (!responseToken) {
        response.status(400).send("Missing token parameter")
    } else {
        const params = new URLSearchParams()
        params.append('secret', functions.config().recaptcha.secret)
        params.append('response', responseToken)

        try {
            const verificationResponse = await fetch('https://recaptcha.google.com/recaptcha/api/siteverify', { method: 'POST', body: params, keepalive: true })

            if (verificationResponse.ok) {
                const verification = await verificationResponse.json()

                if (verification.success && verification.score > 0.6) {
                    response.send(functions.config().response.value)
                } else {
                    response.status(403).send("You're robot!")
                }
            } else {
                response.status(503).send("Verification failed")
            }
        } catch (e) {
            response.status(503).send("Verification failed")
        }
    }
})
