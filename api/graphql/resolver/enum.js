module.exports = {
  EnumGender: {
    male: 'm',
    female: 'f'
  },

  EnumUserStatus: {
    pending: 1,
    active: 2,
    inactive: 3,
    ceased: 4,
    suspended: 5,
    permanently_closed: 6,
    temporary_closed: 7
  },

  EnumUserType: {
    individual: 1,
    corporate: 2,
    market_maker: 3
  },

  EnumUserRiskClasification: {
    low: 1,
    medium: 2,
    high: 3
  },

  EnumKycLevel: {
    level_1: 1,
    level_2: 2
  },

  EnumKycStatus: {
    unverified: 1,
    pending: 2,
    verified: 3
  },

  EnumTradingAccountPlatform: {
    marketplace: 1
  },

  EnumTradingAccountStatus: {
    active: 1,
    ceased: 2,
    suspended: 3,
    permanently_closed: 4,
    inactive: 5,
    temporary_closed: 6
  }
}
