const express = require('express')
const bodyparser = require('body-parser');
const jwt = require('express-jwt');
const { ApolloServer, gql } = require('apollo-server-express');
const schema = require('./data/schema.js');
var cors = require('cors');

const auth = jwt({
      secret: process.env.JWT_SECRET,
    credentialsRequired: false,
      algorithms: ['HS256']
    })

const app = express();


app.use(cors());
const PORT = 4000;

app.use(auth);
const server = new ApolloServer({ cors: true, schema,
context: ({ req }) => {
   // Get the user token from the headers.
   const token = req.headers.authorization || '';
    console.log(token);
    
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



/*app.use((req, res, next) => {
    console.log(schema);
    if(!req.user)
	next();
    else{
		return res.send(   {
      schema,
      context: {
        user: req.user
      }
	});

    }
});
*/
//app.use(cors); 
server.applyMiddleware({ app });
app.use(bodyparser());


app.listen({ port: PORT  }, () =>{
	   console.log("Server ready at http://localhost:4000/${server.graphqlPath}");
}
);
