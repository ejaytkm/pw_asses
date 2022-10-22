module.exports = `
type User {
  id: String,
  username: String,
  password: String,
  name: String,

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

`
