require('dotenv').config()
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op
const operatorsAliases = {
  eq: Op.eq,
  ne: Op.ne, // id != 20
  gte: Op.gte, // id >= 6
  gt: Op.gt, // id > 6
  lte: Op.lte, // id <= 10
  lt: Op.lt, // id < 10
  not: Op.not,
  in: Op.in, // [1, 2] is means as IN [1, 2]
  notIn: Op.notIn, // [1, 2] is means as NOT IN [1, 2]
  is: Op.is,
  like: Op.like, // '%hat' is means as LIKE '%hat'
  notLike: Op.notLike, // '%hat' is means as NOT LIKE '%hat'
  iLike: Op.iLike, // '%hat' is means as ILIKE '%hat' (case insensitive)  (PG only)
  notILike: Op.notILike, // '%hat' is means as NOT ILIKE '%hat'  (PG only)
  regexp: Op.regexp,
  notRegexp: Op.notRegexp,
  iRegexp: Op.iRegexp,
  notIRegexp: Op.notIRegexp,
  between: Op.between, // [6, 10] is means as BETWEEN 6 AND 10
  notBetween: Op.notBetween, // [6, 10] is means as NOT BETWEEN 11 AND 15
  overlap: Op.overlap, // [1, 2] is means as && [1, 2] (PG array overlap operator)
  contains: Op.contains, // [1, 2] is means as @> [1, 2] (PG array contains operator)
  contained: Op.contained, // [1, 2] is means as <@ [1, 2] (PG array contained by operator)
  adjacent: Op.adjacent,
  strictLeft: Op.strictLeft,
  strictRight: Op.strictRight,
  noExtendRight: Op.noExtendRight,
  noExtendLeft: Op.noExtendLeft,
  and: Op.and, // {a: 5} is means as (a = 5)
  or: Op.or, // [{a: 5}, {a: 6}] is means as (a = 5 OR a = 6)
  any: Op.any, // [2,3] is means as ANY ARRAY[2, 3]::INTEGER (PG only)
  all: Op.all,
  values: Op.values,
  col: Op.col
}

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT,
    port: process.env.DEV_DB_PORT,
    operatorsAliases: operatorsAliases,
    seederStorage: 'sequelize',
    dialectOptions: {
      useUTC: true // for reading from database
    },
    timezone: '+00:00' // for writing to database
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    dialect: process.env.PROD_DB_DIALECT,
    port: process.env.PROD_DB_PORT,
    operatorsAliases: operatorsAliases,
    seederStorage: 'sequelize',
    dialectOptions: {
      useUTC: true // for reading from database
    },
    timezone: '+00:00' // for writing to database
  }
}
