const passport = require('passport')
const User = require('./models/User')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      })
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (err) {
      console.log(err)
      return done(new Error(), false)
    }
  })
)

module.exports = null