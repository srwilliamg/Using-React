var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
  var opts = {}
  var User = require('../models/users');
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = 'reactSecret';
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