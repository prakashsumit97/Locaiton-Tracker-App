var Location = require('../models/location.js');
var jwt = require('jwt-simple');
var config = require('../../config/database');
var User = require("../models/user");


/*when user is searching location this function will store it in db*/
module.exports.saveLocation = function (req, res) {
    var header = req.headers.authorization;
    header = header.replace(/"/g, "");
    var token = header;
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            email: decoded.email
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                req.body.user = req.session.loggedInUser._id;
                var location = new Location(req.body);
                location.save(function (err, result) {
                    if (!err) {
                        res.status(200).send(result);
                    } else {
                        res.status(400).send(err);
                    }
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }

}


/*this function will return the all searches done by particular user*/
module.exports.getAllSearches = function (req, res) {
    var header = req.headers.authorization;
    header = header.replace(/"/g, "");
    var token = header;
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            email: decoded.email
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                if (req.session && req.session.loggedInUser) {
                    Location.find({
                        user: req.session.loggedInUser._id
                    }).exec(function (err, result) {
                        if (!err) {
                            res.status(200).send(result);
                        } else {
                            res.status(400).send(err);
                        }
                    });
                } else {
                    res.status(400).send({
                        message: 'user session expired'
                    });
                }

            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }



}
