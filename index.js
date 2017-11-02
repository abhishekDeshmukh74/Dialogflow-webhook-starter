'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/', function(req, res) {
    // var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    // speech = speech+" location Details"
    var tokenAnduserid = req.body.originalRequest.data.user.accessToken;
    var resultArray = tokenAnduserid.split('~');
    var authorizationToken = resultArray[0]
    var userId = resultArray[1]
    console.log(authorizationToken)
    console.log(userId)
    var temp = req.body.result.action;

    if(temp!=undefined){
        console.log(temp);

        if(temp=="rezpolls/getfeeds"){
            //restService.post(temp,function(req,res){
            console.log("success1");
            var options = {
                url: 'https://rezility-dev.herokuapp.com/api/rezpolls/getfeeds',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+authorizationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "per_page": 100,
                    "page_number": 1,
                    "feed_owner_id": userId,
                    "branch_id": "59312f2e9fe7879361f20eea",
                    "app_id": "22062016",
                    "app_version": "1.3.0",
                    "device_id": "web-dev-admin1",
                    "device_type": "web",
                    "sys_user_id": userId
                })
            }

            request(options, function(error, response, body){
                if(!error && response.statusCode == 200) {
                    var serviceData = JSON.parse(body);
                    var speech = serviceData.page_number;
                    return res.json({
                        speech: speech,
                        displayText: speech,
                        source: 'webhook-echo-sample'
                    });     
                } else {
                    console.log("in else");
                }

            });	

            // });

        }

        if(temp=="getnearbyproperties"){
            console.log("success2");
            var options = {
                url: 'https://rezility-dev.herokuapp.com/api/getnearbyproperties',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+authorizationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id": userId,
                    "latitude": 18.548056,
                    "longitude": 73.9004693,
                    "is_housing_property_needed": true,
                    "service_interests": [
                        "5859382a4cce7614b8b0bd66_23",
                        "5859382a4cce7614b8b0bd66_24",
                        "5859382a4cce7614b8b0bd66_26",
                        "5859382a4cce7614b8b0bd66_25",
                        "5859382a4cce7614b8b0bd66_27",
                        "5859382a4cce7614b8b0bd66_28",
                        "5859382a4cce7614b8b0bd66_29",
                        "5859382a4cce7614b8b0bd66_30"
                    ],
                    "app_id": "22062016",
                    "app_version": "1.2.0",
                    "device_id": "web-dev1",
                    "device_type": "android",
                    "sys_user_id": userId
                })
            }

            request(options, function(error, response, body){
                if(!error && response.statusCode == 200) {
                    var responseSpeech = ''
                    var result = JSON.parse(body);
                    console.log(result)
                    if (result.feeds.length > 3 && result.feeds.length != 0) {

                        var totalfeeds = result.feeds
                        responseSpeech = ' I could find ' + totalfeeds.length + ' feeds. Here are the top 3: '
                        responseSpeech += '1. ' + totalfeeds[0].title + ', '
                        responseSpeech += '2. ' + totalfeeds[1].title + ', '
                        responseSpeech += '3. ' + totalfeeds[2].title + '. '

                    } else {
                        var totalfeeds = result.feeds
                        responseSpeech = ' I could find ' + totalfeeds.length + 'feeds. '

                        for (var i = 0; i < totalfeeds.length - 1; i++) {
                            var currentfeed = totalfeeds[i]
                            if (i = totalfeeds.length - 1) {
                                responseSpeech += i + '. ' + totalfeeds[i].title + '. '
                            } else {
                                responseSpeech += i + '. ' + totalfeeds[i].title + ', '
                            }

                        }
                    }
                    console.log('In feeds Response ' + responseSpeech)
                    return res.json({
                        speech: speech,
                        displayText: speech,
                        source: 'webhook-echo-sample'
                    });     
                } else {
                    console.log("in else");
                }
            });

        }
    }

});


restService.listen((process.env.PORT || 3000), function() {
    console.log("Server up and listening");
});
