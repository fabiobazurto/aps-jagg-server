// data/resolvers.js
const { GraphQLUpload } = require("apollo-server-express");
const { User, Book } = require('../models');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const toString = require('stream-to-string');

require('dotenv').config()

const resolvers = {
    Upload: GraphQLUpload,
	Query: {
	    // fetch the profile of currently authenticated user
            async me (_, args, { user }) {
		// make sure user is logged in
		if (!user) {
		    throw new Error('You are not authenticated!')
		}
		// user is authenticated
		return await User.findByPk(user.id)
            },
            async books (_, args,{user}) {
		// user is authenticated
		if (!user) {
		    throw new Error('You are not authenticated!')
		}
		
		return await Book.findAll()
            },
            async users (_, args,{user}) {
		// user is authenticated
		if (!user) {
		    throw new Error('You are not authenticated!')
		}
		
		return await User.findAll()
            },
	    
	},

    Mutation: {
	async uploadFile(_, { image }, {user}) {
//	    const { createReadStream, filename, mimetype, encoding } = await image;
//	    const stream = createReadStream();
	    console.log(image);
	    try{

		User.update({ avatar: image },{where: {id:user.id}});
		console.log('done');
	    }
	    catch(error){
		console.log(error);
	    }
	},	    
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
