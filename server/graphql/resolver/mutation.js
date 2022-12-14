const { ApolloError } = require('apollo-server-express')
const QueryFilter = require('../queryfilter')

const IngredientService = require('../../services/ingredient')
const OutletService = require('../../services/outlet')
const IngredientOutletService = require('../../services/ingredientoutlet')
const UserOutletService = require('../../services/useroutlet')
const UserService = require('../../services/user')

const moment = require('moment-timezone')
const { filter } = require('lodash')

moment.tz.setDefault('Etc/UTC')

module.exports = {
  updateUser: async (parent, args, { models }, info) => {
    // Add additional security if necessary, for now - keeping in really accessible but based on ROLES
    const filterParam 	= QueryFilter.filter(args)

    const serv = new UserService(models)
    return await serv.update(args.input, filterParam)
      .then(filteredData => {
        return filteredData[0]
      })
      .then(async (updateId) => {
        return await serv.getOne(filterParam, info)
      })
  },

  // Ingredients
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

    const serv = new IngredientService(models)
    return await serv.create(args.input)
      .then(filteredData => {
        return filteredData.dataValues
      })
  },

  updateIngredient: async (parent, args, { models }, info) => {
    // Add additional security if necessary, for now - keeping in really accessible but based on ROLES
    const filterParam 	= QueryFilter.filter(args)

    const serv = new IngredientService(models)
    return await serv.update(args.input, filterParam)
      .then(filteredData => {
        return filteredData[0]
      })
      .then(async (updateId) => {
        return await serv.getOne(filterParam, info)
      })
  },

  deleteIngredient: async (parent, args, { models }, info) => {
    // Add additional security if necessary, for now - keeping in really accessible but based on ROLES
    const filterParam 	= QueryFilter.filter(args)

    const serv = new IngredientService(models)
    return await serv.delete(filterParam)
      .then(filteredData => {
        return filteredData[0]
      })
      .then(async () => {
        return await serv.getOne(filterParam, info)
      })
  },

  // Outlets
  createOutlet: async (parent, args, { models }, info) => {
    const serv = new OutletService(models)
    return await serv.create(args.input)
      .then(filteredData => {
        return filteredData.dataValues
      })
  },

  updateOutlet: async (parent, args, { models }, info) => {
    // Add additional security if necessary, for now - keeping in really accessible but based on ROLES
    const filterParam 	= QueryFilter.filter(args)

    const serv = new OutletService(models)
    return await serv.update(args.input, filterParam)
      .then(filteredData => {
        return filteredData[0]
      })
      .then(async (updateId) => {
        return await serv.getOne(filterParam, info)
      })
  },

  deleteOutlet: async (parent, args, { models }, info) => {
    // Add additional security if necessary, for now - keeping in really accessible but based on ROLES
    const filterParam 	= QueryFilter.filter(args)

    const serv = new OutletService(models)
    return await serv.delete(filterParam)
      .then(filteredData => {
        return filteredData[0]
      })
      .then(async () => {
        return await serv.getOne(filterParam, info)
      })
  },

  // IngredientOutlets
  createIngredientOutlet: async (parent, args, { models }, info) => {
    const serv = new IngredientOutletService(models)
    return await serv.create(args.input)
      .then(filteredData => {
        return filteredData.dataValues
      })
  },

  updateIngredientOutlet: async (parent, args, { models }, info) => {
    // Add additional security if necessary, for now - keeping in really accessible but based on ROLES
    const filterParam 	= QueryFilter.filter(args)

    const serv = new IngredientOutletService(models)
    return await serv.update(args.input, filterParam)
      .then(filteredData => {
        return filteredData[0]
      })
      .then(async (updateId) => {
        return await serv.getOne(filterParam, info)
      })
  },

  deleteIngredientOutlet: async (parent, args, { models }, info) => {
    // Add additional security if necessary, for now - keeping in really accessible but based on ROLES
    const filterParam 	= QueryFilter.filter(args)

    const serv = new IngredientOutletService(models)
    return await serv.delete(filterParam)
      .then(filteredData => {
        return filteredData[0]
      })
      .then(async () => {
        return await serv.getOne(filterParam, info)
      })
  },

  // UserOutlets
  createUserOutlet: async (parent, args, { models }, info) => {
    const serv = new UserOutletService(models)
    return await serv.create(args.input)
      .then(filteredData => {
        return filteredData.dataValues
      })
  },

  updateUserOutlet: async (parent, args, { models }, info) => {
    // Add additional security if necessary, for now - keeping in really accessible but based on ROLES
    const filterParam 	= QueryFilter.filter(args)

    const serv = new UserOutletService(models)
    return await serv.update(args.input, filterParam)
      .then(filteredData => {
        return filteredData[0]
      })
      .then(async (updateId) => {
        return await serv.getOne(filterParam, info)
      })
  },

  deleteUserOutlet: async (parent, args, { models }, info) => {
    // Add additional security if necessary, for now - keeping in really accessible but based on ROLES
    const filterParam 	= QueryFilter.filter(args)

    const serv = new UserOutletService(models)
    return await serv.delete(filterParam)
      .then(filteredData => {
        return filteredData[0]
      })
      .then(async () => {
        return await serv.getOne(filterParam, info)
      })
  },
}
