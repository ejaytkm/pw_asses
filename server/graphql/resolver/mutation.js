const { ApolloError } = require('apollo-server-express')

const moment = require('moment-timezone')
moment.tz.setDefault('Etc/UTC')

module.exports = {
  createIngredient: async (parent, args, { models }, info) => {
    const { name } = args.input
    if (!name) {
      return new ApolloError('Unauthorized action.', 401, {
        "code": 401,
        "exception": {
          "message": "Please enter a valid name",
          "stacktrace": [] // to: disable stacktrace
        }
      })
    }

    const res = await models.Ingredients.create({
      name: args.input.name
    })

    const data = res ? res.dataValues : null

    return {
      ...data
    }
  },
}
