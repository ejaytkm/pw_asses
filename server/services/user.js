const AbstractQueryService = require('./abstracts/abstractquery')

module.exports = class OutletService extends AbstractQueryService {
  constructor (models) {
    const modelName = 'OAuthUsers'
    const arrAssociateQuery = []
    super(models, modelName, arrAssociateQuery)
    this.models = models
  }

  async delete (filterParam, info) {
    return await super.delete(filterParam)
      .then(async (isDeleted) => {
        console.log(isDeleted)
        return isDeleted
      })
  }
}
