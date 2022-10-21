// const { typeDefs } = require('graphql-scalars')
const queryFilter = require('../queryfilter')

module.exports = {
  applicants: async (parent, args, { models }) => {
    const filterParam = queryFilter.filter(args)

    const data = await models.Applicant.findAndCountAll({
      where: filterParam.filter,
      offset: filterParam.offset,
      limit: filterParam.limit,
      order: filterParam.order,
      paranoid: false,
      include: [{
        model: models.Check,
        as: 'checkData',
        include: [{
          model: models.Report,
          as: 'reportData'
        }]
      }, {
        model: models.Document,
        as: 'documentData'
      }, {
        model: models.LivePhoto,
        as: 'livePhotoData'
      }]
    })

    return {
      rows: data.rows,
      count: data.count
    }
  },

  checks: async (parent, args, { models }) => {
    const filterParam = queryFilter.filter(args)

    const data = await models.Check.findAndCountAll({
      where: filterParam.filter,
      offset: filterParam.offset,
      limit: filterParam.limit,
      order: filterParam.order,
      paranoid: false,
      include: [{
        model: models.Report,
        as: 'reportData'
      }]
    })

    return {
      rows: data.rows,
      count: data.count
    }
  }

  // users: async (parent, args, { models }) => {
  //   const filterParam = queryFilter.filter(args)
  //   return await models.User.findAndCountAll({
  //     where: filterParam.filter,
  //     offset: filterParam.offset,
  //     limit: filterParam.limit,
  //     order: filterParam.order,
  //     paranoid: false,
  //     include: [{
  //       model: models.CompanyInfo,
  //       as: 'companyInfo',
  //       paranoid: false
  //     }, {
  //       model: models.UserInfo,
  //       as: 'userInfo',
  //       paranoid: false
  //     }, {
  //       model: models.UserStatus,
  //       as: 'userStatus',
  //       paranoid: false
  //     }, {
  //       model: models.UserType,
  //       as: 'userType',
  //       paranoid: false
  //     }, {
  //       model: models.UserRiskClasification,
  //       as: 'userRiskClasification',
  //       paranoid: false
  //     }, {
  //       model: models.KycLevel,
  //       as: 'kycLevel',
  //       paranoid: false
  //     }, {
  //       model: models.KycStatus,
  //       as: 'kycStatus',
  //       paranoid: false
  //     }, {
  //       model: models.TradingAccount,
  //       as: 'tradingAccount',
  //       paranoid: false
  //     }, {
  //       model: models.BankAccount,
  //       as: 'bankAccount',
  //       paranoid: false
  //     }, {
  //       model: models.MarketplaceUserSetting,
  //       as: 'marketplaceUserSetting',
  //       paranoid: false
  //     }]
  //   }).then((filteredData) => {
  //     return {
  //       rows: filteredData.rows,
  //       total: filteredData.count,
  //       count: filteredData.rows.length
  //     }
  //   })
  // }
}
