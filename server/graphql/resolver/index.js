const enumMod = require('./enum')
const query = require('./query')
const mutation = require('./mutation')
const { BigIntResolver } = require('graphql-scalars')
const _ = require('lodash')

const compiled = {
  // ...resolvers,
  BigInt: BigIntResolver,
  Query: query,
  Mutation: mutation
}

module.exports = _.assign({},
  enumMod,
  compiled
)
