const express = require('express')
const cors = require('cors');
const jwt = require('express-jwt');
const { ApolloServer, gql } = require('apollo-server-express');
const schema = require('./data/schema.js');



const app = express();

const PORT = 4000;

const server = new ApolloServer({ schema,context,
				  playground:
				  {
				      endpoint:'/graphql',
				      settings: {
					  'editor.theme': 'light'
				      }				      
				  }
				});


server.applyMiddleware({ app });

app.listen({ port: PORT  }, () =>{
	   console.log("Server ready at http://localhost:4000/${server.graphqlPath}");
}
);
