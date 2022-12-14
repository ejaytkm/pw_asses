// const { typeDefs } = require('graphql-scalars')
const QueryFilter = require('../queryfilter')

const IngredientService 		= require('../../services/ingredient')
const OutletService 		= require('../../services/outlet')
const IngredientOutletService 		= require('../../services/ingredientoutlet')
const UserOutletService 		= require('../../services/useroutlet')

module.exports = {
  // Users
  users: async (parent, args, { models, user}, info) => {
    const filterParam = QueryFilter.filter(args)
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
    const filterParam 	= QueryFilter.filter(args)
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
  outlets: async (parent, args, { models }, info) => {
    const filterParam 	= QueryFilter.filter(args)
    // console.log(filterParam)
    const serv = new OutletService(models)
    return await serv.getAll(filterParam, info)
      .then((filteredData) => {
        return {
          rows: filteredData.rows,
          total: filteredData.count,
          count: filteredData.rows.length
        }
      })
  },

  // Ingredient_Outlets
  ingredientOutlets: async (parent, args, { models }, info) => {
    const filterParam 	= QueryFilter.filter(args)
    const serv = new IngredientOutletService(models)
    return await serv.getAll(filterParam, info)
      .then((filteredData) => {
        // console.log("@filteredData", filteredData.rows[0])

        return {
          rows: filteredData.rows,
          total: filteredData.count,
          count: filteredData.rows.length
        }
      })
  },

  // User_Outlets
  userOutlets: async (parent, args, { models }, info) => {
    const filterParam 	= QueryFilter.filter(args)
    const serv = new UserOutletService(models)
    return await serv.getAll(filterParam, info)
      .then((filteredData) => {
        return {
          rows: filteredData.rows,
          total: filteredData.count,
          count: filteredData.rows.length
        }
      })
  },

}
