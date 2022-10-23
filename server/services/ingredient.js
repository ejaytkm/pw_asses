const AbstractQueryService = require('./abstracts/abstractquery')

module.exports = class IngredientService extends AbstractQueryService {
  constructor (models) {
    const modelName = 'Ingredient'
    const arrAssociateQuery = []
    super(models, modelName, arrAssociateQuery)
    this.models = models
  }
}
