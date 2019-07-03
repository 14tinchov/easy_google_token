# Easy Google Token

Easy Google Token is a easy way to get a token with a [Service Account File](https://cloud.google.com/iam/docs/creating-managing-service-account-keys])

_*You could use it in the Backend to get a token and use it in the Frontend or you could create a file with limited access to use it in the Frontend but I recommend the first option_

## Installing

Using npm:

```bash
$ npm install easy_google_token
```

## Using

You can check the Google scopes [HERE](https://developers.google.com/identity/protocols/googlescopes)

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

## Example with Dialog Flow and Axios
```js
const axios = require('axios');

function sendMessage(message){
  const projectId = 'project-id';
  const session = 'random-session'
  const data = { 'queryInput': { 'text': { 'text': message, 'languageCode': 'es' } } };
  const url = `https://content-dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${session}:detectIntent`;
  const token = window.googleToken;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return axios.post(url, data, config).then((res) => {
    res.data.queryResult.fulfillmentMessages.forEach((msg) => {
      console.log(msg);
    });
  });
}

EasyGoogleToken.getTokenWithServiceAccountFile(creds, 'https://www.googleapis.com/auth/dialogflow', function(response) {
  window.googleToken = response.data.access_token;
  sendMessage("Hello !");
});
```