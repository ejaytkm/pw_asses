const _ = require('lodash')
const {
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType
} = require('graphql-parse-resolve-info')

class OptimizeQueryService {
  constructor (graphqlQueryInfo, modelName) {
    const parsedResolveInfoFragment = parseResolveInfo(graphqlQueryInfo)
    const { fields } = simplifyParsedResolveInfoFragmentWithType(parsedResolveInfoFragment, graphqlQueryInfo.returnType)

    this._graphqlQueryInfo = graphqlQueryInfo
    this._modelName = modelName

    if (typeof fields.rows !== 'undefined') {
      this._queryFields = fields.rows.fieldsByTypeName[modelName]
    } else {
      this._queryFields = fields
    }
  }

  getQueryFields () {
    return this._queryFields
  }

  getAttributes () {
    return this.getFields(this._queryFields)
  }

  getSubModelQueryField (subQueryFields, subModelName, subModelNameAlias) {
    return subQueryFields[subModelNameAlias].fieldsByTypeName[subModelName]
  }

  getSubModelAttributes (subQueryFields, subModelName, subModelNameAlias) {
    if (_.has(subQueryFields, subModelNameAlias)) {
      const queryFields = this.getSubModelQueryField(subQueryFields, subModelName, subModelNameAlias)
      return this.getFields(queryFields)
    }
    return null
  }

  getFields (queryFields) {
    console.log(queryFields)

    const attributes = []
    for (const key in queryFields) {
      const field = queryFields[key]
      if (_.isEmpty(field.fieldsByTypeName)) {
        attributes.push(field.name)
      }
    }

    return attributes
  }
}

module.exports = OptimizeQueryService
