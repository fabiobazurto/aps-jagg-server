// data/resolvers.js

    const { User } = require('../models')
    const bcrypt = require('bcrypt')
    const jsonwebtoken = require('jsonwebtoken')
    require('dotenv').config()

    const resolvers = {
      Query: {
        // fetch the profile of currently authenticated user
        async me (_, args, { user }) {
            // make sure user is logged in
	    console.log(user);
          if (!user) {
            throw new Error('You are not authenticatedddd!')
          }

          // user is authenticated
          return await User.findById(user.id)
        }
      },

      Mutation: {
        // Handle user signup
        async signup (_, { username, email, password }) {
          const user = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10)
          })

          // return json web token
          return jsonwebtoken.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1y' }
          )
        },

        // Handles user login
        async login (_, { email, password }) {
          const user = await User.findOne({ where: { email } })

          if (!user) {
            throw new Error('No user with that email')
          }

          const valid = await bcrypt.compare(password, user.password)

          if (!valid) {
            throw new Error('Incorrect password')
          }

          // return json web token
          return jsonwebtoken.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          )
        }
      }
    }

    module.exports = resolvers
