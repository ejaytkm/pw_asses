const { ApolloServer, gql, ApolloError } = require('apollo-server-express')
const { transpileSchema } = require('graphql-s2s').graphqls2s
const resolvers = require('./resolver')
const schema = require('./schema')
const models = require('../database/models')
const { typeDefs } = require('graphql-scalars')

// GraphQL: Schema
const authUserMiddleware = token => {
  // throw new ApolloError('Unauthenticated', 401, {
  //   "code": 401,
  //   "exception": {
  //     "message": "Sorry, unauthenticated when accessing resource.",
  //     // "stacktrace": [] // to: disable stacktrace
  //   }
  // })
}

module.exports = new ApolloServer({
  typeDefs: [...typeDefs, transpileSchema(schema)],
  resolvers: resolvers,
  context: ({ req }) => {
    const token = req.get('Authorization') || ''

    return {
      user: authUserMiddleware(token.replace('Bearer', '')),
      models
    }
  },
  playground: {
    endpoint: process.env.GRAPHQL_ENDPOINT_URL + '/graphql',
    settings: {
      'editor.theme': 'dark'
    }
  },
  formatError: error => {
    if (error.message.startsWith('Database Error: ')) {
      return new ApolloError('Internal server error')
    }

    return error
  },

  formatResponse: response => {
    return response
  }
})
