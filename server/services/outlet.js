const AbstractQueryService = require('./abstracts/abstractquery')

module.exports = class OutletService extends AbstractQueryService {
  constructor (models) {
    const modelName = 'Outlet'
    const arrAssociateQuery = []
    super(models, modelName, arrAssociateQuery)
    this.models = models
  }
}
