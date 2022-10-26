module.exports = `
input StringFilterInput {
  eq: String,
  ne: String,
  gte: String,
  gt: String,
  lte: String,
  lt: String,
  not: String,
  in: [String],
  notIn: [String],
  is: String,
  like: String,
  notLike: String,
  between: [String],
  notBetween: [String],
  overlap: [String],
  contains: [String],
  contained: [String],
  and: String,
  or: [String],
  any: [String]
}

input GeneralFilterInput {
  id: StringFilterInput,
  code: StringFilterInput,
  name: StringFilterInput,
  sequential_order: StringFilterInput,
  is_enabled: StringFilterInput,
  deleted_at: StringFilterInput,
  updated_at: StringFilterInput,
  created_at: StringFilterInput,
}

input UserFilterInput {
  id: StringFilterInput,

  username: StringFilterInput,
  name: StringFilterInput,
  user_type_id: StringFilterInput,

  deleted_at: StringFilterInput,
  updated_at: StringFilterInput,
  created_at: StringFilterInput,
}

input UserDeleteFilterInput {
  id: StringFilterInput!,
}

input IngredientFilterInput {
  id: StringFilterInput,

  name: StringFilterInput,

  deleted_at: StringFilterInput,
  updated_at: StringFilterInput,
  created_at: StringFilterInput,
}

input IngredientDeleteFilterInput {
  id: StringFilterInput!,
}

input OutletFilterInput {
  id: StringFilterInput,

  name: StringFilterInput,
  address: StringFilterInput,
  coordinate_x: StringFilterInput,
  coordinate_y: StringFilterInput,

  deleted_at: StringFilterInput,
  updated_at: StringFilterInput,
  created_at: StringFilterInput,
}

input OutletDeleteFilterInput {
  id: StringFilterInput!,
}


input IngredientOutletFilterInput {
  id: StringFilterInput,

  ingredient_id: StringFilterInput,
  outlet_id: StringFilterInput,
  value: StringFilterInput,
  json_value: StringFilterInput,

  deleted_at: StringFilterInput,
  updated_at: StringFilterInput,
  created_at: StringFilterInput,
}

input IngredientOutletDeleteFilterInput {
  id: StringFilterInput!,
}

input UserOutletFilterInput {
  id: StringFilterInput,

  user_id: StringFilterInput,
  outlet_id: StringFilterInput,

  deleted_at: StringFilterInput,
  updated_at: StringFilterInput,
  created_at: StringFilterInput,
}

input UserOutletDeleteFilterInput {
  id: StringFilterInput!,
}

`
