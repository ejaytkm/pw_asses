const { filter } = require('lodash')
const _ = require('lodash')
const OptimizeQueryService = require('../optimizequery.js')

module.exports = class AbstractQueryService {
  constructor (strModels, strModelName, arrAssociateQuery, arrColStr = null) {
    this._objModels = strModels
    this._strModelName = strModelName
    this._arrAssociateQuery = arrAssociateQuery
    this._arrColStr = arrColStr

    if (this._objModels === null) {
      throw new Error('Model is null.')
    }

    // console.log('@@@@@', this._objModels)
    // console.log('@@@@@', this._strModelName)

    if (typeof this._objModels[this._strModelName] === 'undefined') {
      throw new Error('Model "' + this._strModelName + '" not found.')
    }
  }

  async getOne (filterParam, info) {
    this.validateInfo(info)
    const assocAndAttr = await this.getAsocAndAttributes(info, this._arrAssociateQuery)

    return await this._objModels[this._strModelName].findOne({
      where: filterParam.filter,
      order: filterParam.order,
      paranoid: false,
      attributes: assocAndAttr.attributes,
      include: assocAndAttr.includes
    })
  }

  async getAll(filterParam, info) {
    this.validateInfo(info);
    let assocAndAttr = await this.getAsocAndAttributes(info, this._arrAssociateQuery);

    return await this._objModels[this._strModelName].findAndCountAll({
      where     : filterParam.filter,
      offset    : filterParam.offset,
      limit     : filterParam.limit,
      order     : filterParam.order,
      distinct  : true,
      paranoid  : false,
      // attributes: assocAndAttr.attributes, // TODO: FIX ATTRIBUTES: IF NOT: POTENTIAL SQL LEAK
      include: assocAndAttr.includes
    })
  }

  async countAll (filterParam) {
    return await this._objModels[this._strModelName].count({
      where: filterParam.filter,
      paranoid: false
    })
  }

  /*
   * ------------------------------------
   *   Functions
   * ------------------------------------
   */
  getEagerLoad (strAssocModelName, strAssocModelNameAlias, arrAttributes) {
    // console.log(strAssocModelName, arrAttributes)

    return {
      model: this._objModels[strAssocModelName],
      as: strAssocModelNameAlias,
      paranoid: false,
      attributes: arrAttributes
    }
  }

  async getAsocAndAttributes (info, arrAssocModelName) {
    const objOptQueryServ = new OptimizeQueryService(info, this._strModelName)
    const attributes = await this.convertAttrToStr(await objOptQueryServ.getAttributes())
    const queryFields = await objOptQueryServ.getQueryFields()
    const includes = []

    // console.log("queryFields", queryFields)

    for (let i = 0; i < arrAssocModelName.length; i++) {
      let assocModelName = arrAssocModelName[i].modelName
      const assocModelNameAlias = arrAssocModelName[i].modelNameAlias

      // console.log("@@@", assocModelName)
      // if (assocModelName === 'User') {
      //   let assocModelName = 'OAuthUsers'
      // }

      if (_.has(queryFields, assocModelNameAlias)) {
        // if (queryFields.userData && queryFields.userData.name === 'userData') {
        //   console.log("@@@queryFields", queryFields.userData.fieldsByTypeName);
        // }

        const assocAttributes = await objOptQueryServ.getSubModelAttributes(queryFields, assocModelName, assocModelNameAlias)

        if (assocAttributes !== null) {
          includes.push(await this.getEagerLoad(assocModelName, assocModelNameAlias, assocAttributes))
        }
      }
    }

    return {
      attributes: attributes,
      includes: includes
    }
  }

  async convertAttrToStr (arrAttributes) {
    const convToStrCol = this._arrColStr
    if (typeof convToStrCol === 'undefined' || convToStrCol === null || !Array.isArray(convToStrCol)) {
      return arrAttributes
    }

    for (let i = 0; i < convToStrCol.length; i++) {
      if (arrAttributes.includes(convToStrCol[i])) {
        const index = arrAttributes.indexOf(convToStrCol[i])
        arrAttributes[index] = [
          this._objModels[this._strModelName].sequelize.cast(
            this._objModels[this._strModelName].sequelize.col(this._strModelName + '.' + convToStrCol[i]),
            'varchar'
          ),
          convToStrCol[i]
        ]
      }
    }
    return arrAttributes
  }

  validateInfo (info) {
    if (typeof info === 'undefined' || info === null) {
      throw new Error('Graphql Info is undefined/null')
    }
  }

  /*
   * ------------------------------------
   *   CRUD
   * ------------------------------------
   */
  create (input) {
    return this._objModels[this._strModelName].create(input)
  }

  bulkCreate (input) {
    return this._objModels[this._strModelName].bulkCreate(input)
  }

  update (input, filterParam) {
    return this._objModels[this._strModelName].update(input, {
      where: filterParam.filter,
      paranoid: false
    })
  }

  /*
   *
   * @return Promise<number> Deleted rows count
   */
  delete (filterParam) {
    return this._objModels[this._strModelName].destroy({
      where: filterParam.filter,
      paranoid: false
    })
  }
}
