module.exports = `
type User {
  id: String,
  username: String,
  password: String,
  name: String,
  user_type_id: String,

  updatedAt: String,
  createdAt: String,
  deletedAt: String,
}

type Ingredient {
  id: String,
  name: String,
  updated_at: String,
  created_at: String,
  deleted_at: String,
}

type Outlet {
  id: String,

  name: String,
  address: String,
  coordinate_x: String,
  coordinate_y: String,

  deleted_at: String,
  updated_at: String,
  created_at: String,
}

type IngredientOutlet {
  id: String,

  ingredientData: Ingredient,
  outletData: Outlet,
  ingredient_id: String,
  outlet_id: String,
  value: String,
  json_value: String,


  deleted_at: String,
  updated_at: String,
  created_at: String,
}

type UserOutlet {
  id: String,

  userData: User,
  outletData: Outlet,
  user_id: String,
  outlet_id: String,

  deleted_at: String,
  updated_at: String,
  created_at: String,
}
`

// type IngredientOutlet {
//   id: String,

//   ingredient_id: String,
//   outlet_id: String,
//   value: String,
//   json_value: String,

//   deleted_at: String,
//   updated_at: String,
//   created_at: String,
// }