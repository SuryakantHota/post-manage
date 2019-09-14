const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/signup", ( req, res, next ) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      "email": req.body.email,
      "password": hash
    });
    user.save().then(result => {
      res.status(201).json({
        message: "User created",
        result: result
      });
    }).catch(err => {
      res.status(500).json({
        "message": "User creation failed",
        "error": err
      });
    })
  });
});

router.post("/login", ( req, res, next ) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if ( !user ) {
        return res.status(401).json({
          message: "Authentication failed"
        })
      }

      bcrypt.compare(req.body.password, user.password)
        .then( doesPwdMatch => {
          if ( !doesPwdMatch ) {
            return res.status(401).json({
              message: "Authentication failed"
            })
          }
          const token = jwt.sign(
            {email: user.email, userId: user._id},
            "this_is_my_secret_key",
            {expiresIn: "1h"}
          );
          res.status(200).json({
            token: token
          })
        })
        .catch(err => {
          return res.status(401).json({
            message: "Authentication failed"
          })
        });
    });
});

module.exports = router;
