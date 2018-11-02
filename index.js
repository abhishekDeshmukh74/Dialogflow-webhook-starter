'use strict';
const CONST = require('./CONST').CONST;
const express = require('express');
const bodyParser = require('body-parser');
const dashbot = require('dashbot')(CONST.DASHBOT_API_KEY).google;

const app = express();

app.use((req, res, next) => {
	res.header(CONST.ACCESS_CONTROL_HEADERS.ALLOW_ORIGIN.NAME, CONST.ACCESS_CONTROL_HEADERS.ALLOW_ORIGIN.VALUE);
	res.header(CONST.ACCESS_CONTROL_HEADERS.ALLOW_METHODS.NAME, CONST.ACCESS_CONTROL_HEADERS.ALLOW_METHODS.VALUE);
	res.header(CONST.ACCESS_CONTROL_HEADERS.ALLOW_HEADERS.NAME, CONST.ACCESS_CONTROL_HEADERS.ALLOW_HEADERS.VALUE);
	next();
});

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.post('/', (req, res) => {

	console.log(req.body);

	dashbot.logIncoming(req.body);

	// action contains the actual INTENT NAME sent by Dialogflow request    

	var action = req.body.queryResult.action;

	const resObj = {
		fulfillmentText: 'Reply from webhook'
	}

	dashbot.logOutgoing(req.body, resObj);

	//https://dialogflow.com/docs/fulfillment
	res.status(200).json(resObj);

});

app.set(CONST.PORT_VALUE, (process.env.PORT || CONST.PORT_VALUE));

app.listen(app.get(CONST.PORT_VALUE), () => {
	console.log((CONST.SERVER_START_TEXT), app.get(CONST.PORT_VALUE), app.get('env'));
});