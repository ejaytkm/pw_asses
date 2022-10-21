const enumMod = require('./enum')
const filter = require('./filter')
const general = require('./general')
const model = require('./model')
const query = require('./query')
const input = require('./input')
const mutation = require('./mutation')

module.exports = enumMod + filter + general + model + query + input + mutation
