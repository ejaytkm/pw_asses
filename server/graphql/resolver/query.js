// const { typeDefs } = require('graphql-scalars')
const queryFilter = require('../queryfilter')
const IngredientService 		= require('../../services/ingredient')
const model = require('../schema/model')

module.exports = {
  // Users
  users: async (parent, args, { models, user}, info) => {
    const filterParam = queryFilter.filter(args)
    const data = await models.OAuthUsers.findAndCountAll({
      where: filterParam.filter,
      offset: filterParam.offset,
      limit: filterParam.limit,
      order: filterParam.order,
      paranoid: false,
    })

    return {
      rows: data.rows,
      count: data.count,
      total:  0
    }
  },

  // Ingredients
  ingredients: async (parent, args, { models }, info) => {
    const filterParam 	= queryFilter.filter(args)
    const serv = new IngredientService(models)
    return await serv.getAll(filterParam, info)
      .then((filteredData) => {
        return {
          rows: filteredData.rows,
          total: filteredData.count,
          count: filteredData.rows.length
        }
      })
  },

  // Outlets
  // User_Outlets
  // Ingredient_Outlets
}
