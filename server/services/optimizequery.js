const _ = require('lodash')
const {
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType
} = require('graphql-parse-resolve-info')
const { QueryError } = require('sequelize')

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
    if (subModelName === "OAuthUsers") { // BUG: HARD CODED BUG - TECH DEBT TO FIX USER RELATION MODEL
      return subQueryFields[subModelNameAlias].fieldsByTypeName["User"]
    }

    return subQueryFields[subModelNameAlias].fieldsByTypeName[subModelName]
  }

  getSubModelAttributes (subQueryFields, subModelName, subModelNameAlias) {
    // console.log("subModelName", subModelName, subQueryFields, subModelNameAlias)
    if (_.has(subQueryFields, subModelNameAlias)) {
      const queryFields = this.getSubModelQueryField(subQueryFields, subModelName, subModelNameAlias)

      return this.getFields(queryFields)
    }

    return null
  }

  getFields (queryFields) {
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
