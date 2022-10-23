module.exports = `
type UserData {
  rows: [User],
  total: Int,
  count: Int
}

type IngredientData {
  rows: [Ingredient],
  total: Int,
  count: Int
}

type OutletData {
  rows: [Outlet],
  total: Int,
  count: Int
}

type IngredientOutletData {
  rows: [IngredientOutlet],
  total: Int,
  count: Int
}

type UserOutletData {
  rows: [UserOutlet],
  total: Int,
  count: Int
}
`
