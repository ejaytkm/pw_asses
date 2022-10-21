import { GraphQLScalarType } from 'graphql'

const config = new GraphQLScalarType({
  name: 'MyCustomScalar',
  description: 'Description of my custom scalar type',
  serialize (value) {
    let result
    // Implement your own behavior here by setting the 'result' variable
    return result
  },
  parseValue (value) {
    let result
    // Implement your own behavior here by setting the 'result' variable
    return result
  },
  parseLiteral (ast) {
    switch (ast.kind) {
      // Implement your own behavior here by returning what suits your needs
      // depending on ast.kind
    }
  }
})

export default new GraphQLScalarType(config)
