module.exports = `
type Query {
  users (
    filter: UserFilterInput,
    perPage: Int,
    page: Int,
    sort: [[String]]
  ) : UserData

  ingredients (
    filter: IngredientFilterInput,
    perPage: Int,
    page: Int,
    sort: [[String]]
  ) : IngredientData

  outlets (
    filter: OutletFilterInput,
    perPage: Int,
    page: Int,
    sort: [[String]]
  ) : OutletData

  ingredientOutlets (
    filter: IngredientOutletFilterInput,
    perPage: Int,
    page: Int,
    sort: [[String]]
  ) : IngredientOutletData

  userOutlets (
    filter: UserOutletFilterInput,
    perPage: Int,
    page: Int,
    sort: [[String]]
  ) : UserOutletData
}
`
