module.exports = `
input IngredientInput {
  name: String

  created_at: String
  updated_at: String
  deleted_at: String
}

input OutletInput {
  name: String
  address: String
  coordinate_x: String
  coordinate_y: String

  created_at: String
  updated_at: String
  deleted_at: String
}

input OutletInputCreate {
  name: String!
  address: String!
  coordinate_x: String!
  coordinate_y: String!

  created_at: String
  updated_at: String
  deleted_at: String
}

input IngredientOutletInput {
  outlet_id: Int
  ingredient_id: Int
  value: String
  json_value: String

  created_at: String
  updated_at: String
  deleted_at: String
}

input UserOutletInput {
  user_id: Int
  outlet_id: Int

  created_at: String
  updated_at: String
  deleted_at: String
}
`
