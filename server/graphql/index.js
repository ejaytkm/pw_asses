const { ApolloServer, gql, ApolloError } = require('apollo-server-express')
const { transpileSchema } = require('graphql-s2s').graphqls2s
const resolvers = require('./resolver')
const schema = require('./schema')
const models = require('../database/models')
const { typeDefs } = require('graphql-scalars')

// GraphQL: Schema
module.exports = new ApolloServer({
  typeDefs: [...typeDefs, transpileSchema(schema)],
  resolvers: resolvers,
  context: { models },
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
