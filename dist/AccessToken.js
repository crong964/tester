"use strict";
const { google } = require("googleapis");
const credentials = require("../../credentials.json");
const token = require("../../token.json");
var oauth2Client = new google.auth.OAuth2(credentials.installed.client_id, credentials.installed.client_secret, credentials.installed.redirect_uris[0]);
oauth2Client.setCredentials(token);
oauth2Client.getAccessToken()
    .then((v) => {
    console.log(v.token);
});
