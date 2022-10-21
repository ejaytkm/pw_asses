const offsetDefault = 0
const limitDefault = 1500

module.exports = {
  offsetDefault: offsetDefault,
  limitDefault: limitDefault,
  filter: (args) => {
    const filter = args.filter
    let offset = offsetDefault
    let limit = limitDefault
    const order = typeof args.sort !== 'undefined' ? args.sort : [['id', 'desc']]

    if (('page' in args) && ('perPage' in args)) {
      offset 	= ((args.page - 1) * args.perPage)
      limit 	= args.perPage
    }

    return {
      filter: filter,
      offset: offset,
      order: order,
      limit: limit
    }
  }
}
