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
    console.log(JSON.stringify(req.headers);
    var temp = req.body.result.action;
    console.log(req.body);

    if(temp!=undefined){
        console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
        console.log(temp);

        if(temp=="rezpolls/getfeeds"){
            //restService.post(temp,function(req,res){
            console.log("success1");
            var options = {
                url: 'https://rezility-dev.herokuapp.com/api/rezpolls/getfeeds',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTkwYjNiNTUxM2Y3ZmZmMjBlZjc3MmI5IiwidXNlcl9lbWFpbCI6ImFkbWluQHJlemlsaXR5LmNvbSIsImlhdCI6MTQ5MzkwODcxNH0.AL1H4v5_YJJ3fFs9wjjbp64fFt2Vy9U2j8QMlZ5Vhlo',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "per_page": 100,
                    "page_number": 1,
                    "feed_owner_id": "590b3b5513f7fff20ef772b9",
                    "branch_id": "59312f2e9fe7879361f20eea",
                    "app_id": "22062016",
                    "app_version": "1.3.0",
                    "device_id": "web-dev-admin1",
                    "device_type": "web",
                    "sys_user_id": "590b3b5513f7fff20ef772b9"
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
                    var speech = serviceData.service_providers[0].public_name+" is available at address "+serviceData.service_providers[0].street_address1;
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
