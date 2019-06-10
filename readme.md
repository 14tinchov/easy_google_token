# Easy Google Token

Easy Google Token is a easy way to get a token with a [Service Account File](https://cloud.google.com/iam/docs/creating-managing-service-account-keys])

_*You could use it in the Backend to get a token and use it in the Frontend or you could create a file with limited access to use it in the Frontend but I recommend the first option_

## Installing

Using npm:

```bash
$ npm install easy_google_token
```

## Using

```js
# file: Json File with the service credentials
# scopes: String (scopes separated by comma)
# callback_function: function that will be executed when you receive the token

EasyGoogleToken.getTokenWithServiceAccountFile(file, scopes , callback_function);
```

## Example

```js
const creds = require('./service_account_file.json');
const scopes = 'https://www.googleapis.com/auth/dialogflow'
EasyGoogleToken.getTokenWithServiceAccountFile(creds, scopes, (response) => { console.log(response.data.access_token); });
```