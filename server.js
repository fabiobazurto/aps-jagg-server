const express = require('express')
const cors = require('cors');
const jwt = require('express-jwt');
const { ApolloServer, gql } = require('apollo-server-express');
const schema = require('./data/schema.js');


const auth = jwt({
      secret: process.env.JWT_SECRET,
    credentialsRequired: false,
      algorithms: ['HS256']
    })

const app = express();

const PORT = 4000;

const server = new ApolloServer({ schema,
				  
				  playground:
				  {
				      endpoint:'/graphql',
				      settings: {
					  'editor.theme': 'light'
				      }				      
				  }
				});


app.get('/protected',auth, (req, res) => {
	return res.send(   {
      schema,
      context: {
        user: req.user
      }
	});
}
);
 
server.applyMiddleware({ app });

app.use('/graphql', auth)



app.listen({ port: PORT  }, () =>{
	   console.log("Server ready at http://localhost:4000/${server.graphqlPath}");
}
);
