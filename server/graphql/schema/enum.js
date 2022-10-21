module.exports = `
enum EnumSalutation {
  mr
  mrs
  miss
  sir
  dato
  datin
  tun
}

enum EnumGender {
  male
  female
}

enum EnumUserStatus {
  pending
  active
  inactive
  ceased
  suspended
  permanently_closed
  temporary_closed
}

enum EnumUserType {
  individual
  corporate
  market_maker
}

enum EnumUserRiskClasification {
  low
  medium
  high
}

enum EnumKycLevel {
  level_1
  level_2
}

enum EnumKycStatus {
  unverified
  pending
  verified
  rejected
}

enum EnumTradingAccountPlatform {
  marketplace
}

enum EnumTradingAccountStatus {
  active
  ceased
  suspended
  permanently_closed
  inactive
  temporary_closed
}
`
