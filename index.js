'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    speech = speech+" location Details"

    var options = {
        url: 'https://rezility-dev.herokuapp.com/api/getnearbyproperties',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTlhZmM1OTJmYTIyNjcwMDExYmMyY2I4IiwidXNlcl9lbWFpbCI6InNoZWhuaWxhQG1haWxpbmF0b3IuY29uIiwiaWF0IjoxNTA0NjkxNjAyfQ.KLH0fuaNWFVOAvJA9shjONcsMr68Pwhp35Z78tboEho',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": "59afc592fa22670011bc2cb8",
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
            "sys_user_id": "59afc592fa22670011bc2cb8"
        })
    }

    request(options, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var serviceData = JSON.parse(body);
	        console.log(serviceData.message+"LOL"); 
            return res.json({
                speech: serviceData.message,
                displayText: serviceData.message,
                source: 'webhook-echo-sample'
            });     
        } else {
            console.log("in else");
        }
    });
});

restService.listen((process.env.PORT || 3000), function() {
    console.log("Server up and listening");
});
