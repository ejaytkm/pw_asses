module.exports = `
input IngredientInput {
  id: String,
  name: String,

  created_at: String,
  updated_at: String,
  deleted_at: String,
}

input OutletInput {
  id: String,

  name: String,
  address: String,
  coordinate_x: String,
  coordinate_y: String

  created_at: String,
  updated_at: String,
  deleted_at: String,
}
`
