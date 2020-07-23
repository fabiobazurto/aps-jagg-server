const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

// Define our schema using the GraphQL schema language
const typeDefs = `
      scalar Upload

      type User {
        id: Int!
        username: String!
        email: String!
        avatar: String
      }

     type Book{
       id: Int!
       title: String!
       short_description: String!
     }

      type Query {
        users: [User]
        books: [Book]
        me: User
      }

      type Mutation {
        signup (username: String!, email: String!, password: String!): String
        login (email: String!, password: String!): String
        uploadFile(image: Upload!): String
      }
    `

module.exports = makeExecutableSchema({ typeDefs, resolvers})
