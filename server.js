const express = require('express')
const bodyparser = require('body-parser');
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

const server = new ApolloServer({ cors: false, schema,
				  
				  playground:
				  {
				      endpoint:'/graphql',
				      settings: {
					  'editor.theme': 'light'
				      }				      
				  }
				});



//app.use(cors); 
server.applyMiddleware({ app });
app.use(bodyparser());
//app.use('/graphql', auth)

app.get('/graphql',auth, (req, res) => {
	return res.send(   {
      schema,
      context: {
        user: req.user
      }
	});
}
);

app.listen({ port: PORT  }, () =>{
	   console.log("Server ready at http://localhost:4000/${server.graphqlPath}");
}
);
