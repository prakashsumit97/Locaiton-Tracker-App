var HttpStatus = require('http-status');
var User = require("../models/user");
var jwt = require('jwt-simple');
var config = require('../../config/database'); // get db config file



/*when user will click on logout this function get called*/
exports.logout = function (req, res) {

    if (req.session.loggedInUser) {
        req.session.loggedInUser = null;
        res.status(HttpStatus.OK).json({
            success: "logout successfully"
        });
    }

};


/*this will return the session of particular user if he is logged in or not*/
exports.getSessionUser = function (req, res) {
    if (req.session.loggedInUser) {
        User.findById(req.session.loggedInUser._id, {
            password: 0
        }).exec(function (err, user) {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'unexpected error accessing data'
                });
                return;

            }
            if (user == null) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: 'User not found'
                });
                return;
            }
            res.status(HttpStatus.OK).json(req.session.loggedInUser);
        });
    } else {
        res.status(HttpStatus.UNAUTHORIZED).json({
            error: 'Session invalid'
        });
    }
}

/*first time when user get register*/
exports.signup = function (req, res) {
    var newUser = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });

    // save the user
    newUser.save(function (err, result) {
        if (!err) {
            res.status(200).send({});
        } else {
            res.status(400).send(err);
        }
    });
}


/*this is authenticating user if he is registered user or not*/
exports.authenticate = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(400).send({
                success: false,
                msg: 'Authentication failed. User not found.'
            });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.encode(user, config.secret);
                    req.session.token = token;
                    req.session.loggedInUser = user;
                    res.status(HttpStatus.OK).json({
                        success: true,
                        token: token
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        msg: 'Incorrect Password.'
                    });
                }
            });
        }
    });
}
