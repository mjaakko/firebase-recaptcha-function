# firebase-recaptcha-functions

Simple Firebase function for validating reCAPTCHA token and returning value.

## Usage

1. Configure with:
```bash
firebase functions:config:set recaptcha.secret="RECAPTCHA SERVER KEY" response.value.hello="Hello" response.value.world="World"
```
2. Send HTTP GET request to function with `token` parameter being the token returned by reCATPCHA client API
3. Function will return the configured response as JSON, e.g.
```json
{ "hello": "Hello", "world": "World" }
```
