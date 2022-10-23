const AbstractQueryService = require('./abstracts/abstractquery')

module.exports = class IngredientOutletService extends AbstractQueryService {
  constructor (models) {
    const modelName = 'IngredientOutlet'
    const arrAssociateQuery = [
      {
        modelName: 'Ingredient',
        modelNameAlias: 'ingredientData'
      },
      {
        modelName: 'Outlet',
        modelNameAlias: 'outletData'
      }
    ]

    super(models, modelName, arrAssociateQuery)
    this.models = models
  }
}
