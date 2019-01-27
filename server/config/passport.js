var User = require('../models/index').Users;
var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = 'OtherSecret';
  // opts.issuer = 'accounts.examplesoft.com';
  // opts.audience = 'yoursite.net';
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload);
    
    User.findByPk(jwt_payload.idUser)
    .then(data => {
        return done(null, data);
      })
      .catch(err => {
        console.log(err);
        return done(err, false);
      });
  }));
}