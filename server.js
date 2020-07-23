const express = require('express')
const bodyparser = require('body-parser');
const jwt = require('express-jwt');
const { ApolloServer, gql } = require('apollo-server-express');
//const {InMemoryCache} = require('apollo-cache-inmemory');
const schema = require('./data/schema.js');
var cors = require('cors');

const PORT = 4000;

const auth = jwt({
      secret: process.env.JWT_SECRET,
    credentialsRequired: false,
      algorithms: ['HS256']
    })

const options = {
    port: PORT,
    bodyParserOptions: { limit: "10mb", type: "application/json"},
};

const app = express();

app.use(cors());
app.use(auth);
const server = new ApolloServer({ cors: true, schema,
				  context: ({ req }) => {
				      // Get the user token from the headers.
				      const token = req.headers.authorization || '';

				      // try to retrieve a user with the token
				      const user = req.user;

				      // add the user to the context
				      return { user };
				  },				  
				  playground:
				  {
				      endpoint:'/graphql',
				      settings: {
					  'editor.theme': 'light'
				      }				      
				  }
				
				});



server.applyMiddleware({ app,
			 bodyParserConfig: {
			     limit: '100mb',
			 },
 });
//app.use(bodyparser());


app.listen(options, () =>{
	   console.log("Server ready at http://localhost:${PORT}/${server.graphqlPath}");
}
);
