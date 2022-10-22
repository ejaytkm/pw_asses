const AbstractQueryService = require('./abstracts/abstractquery')

module.exports = class AdminStatusService extends AbstractQueryService {
  constructor (models) {
    const modelName = 'Ingredients'
    const arrAssociateQuery = []
    super(models, modelName, arrAssociateQuery)
    this.models = models
  }
}
