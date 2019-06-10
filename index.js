'use strict';

var KJUR = require('jsrsasign');
var axios = require('axios');

var EasyGoogleToken = {
  getTokenWithServiceAccountFile(creds = {}, scopes, callback ) {
    if (Object.keys(creds).length == 0) { return 'Need Service Account File to continue' };
    if (creds.private_key == null)      { return 'Need private_key in your File to continue' };
    if (creds.private_key_id == null)   { return 'Need private_key_id in your File to continue' };
    if (creds.client_email == null)     { return 'Need client_email in your File to continue' };

    // Header
    const header = {
      alg: 'RS256',
      typ: 'JWT',
      kid: creds.private_key_id
    };

    // Payload
    const payload = {
      iss: creds.client_email,
      sub: creds.client_email,
      scope: scopes,
      iat: KJUR.jws.IntDate.get('now'),
      exp: KJUR.jws.IntDate.get('now + 1hour'),
      aud: 'https://www.googleapis.com/oauth2/v4/token'
    };
    
    const stringHeader = JSON.stringify(header);
    const stringPayload = JSON.stringify(payload);
    var token = KJUR.jws.JWS.sign('RS256', stringHeader, stringPayload, creds.private_key);

    axios.post('https://www.googleapis.com/oauth2/v4/token', {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token
      })
      .then(function (response) {
        // handle success
        callback(response);
      })
      .catch(function (error) {
        // handle error
        callback(error);
      })
      .finally(function () {
        // always executed
      });

    },
}

module.exports = EasyGoogleToken;
