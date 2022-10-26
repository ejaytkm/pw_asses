const AbstractQueryService = require('./abstracts/abstractquery')

module.exports = class UserOutletService extends AbstractQueryService {
  constructor (models) {
    const modelName = 'UserOutlet'
    const arrAssociateQuery = [
      {
        modelName: 'OAuthUsers',
        modelNameAlias: 'userData'
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
