const AbstractQueryService = require('./abstracts/abstractquery')

module.exports = class UserOutletService extends AbstractQueryService {
  constructor (models) {
    const modelName = 'UserOutlet'
    const arrAssociateQuery = [
      {
        modelName: 'User',
        modelNameAlias: 'UserData'
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
