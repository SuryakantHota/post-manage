const jwt = require("jsonwebtoken");

let checkAuth = function ( req, res, next ) {
  let authHdr = req.headers.authorization;
  try {
    const token = authHdr ? authHdr.split(" ")[1] : null;
    if ( !token ) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }
    jwt.verify(token, "this_is_my_secret_key");
    next();
  } catch ( err ) {
    res.status(401).json({
      message: "User not authenticated"
    });
  }
};

module.exports = checkAuth;
