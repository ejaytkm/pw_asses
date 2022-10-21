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

input ApplicantFilterInput {
  id: StringFilterInput,
  user_id: StringFilterInput,
  onfido_applicant_id: StringFilterInput,
  email: StringFilterInput,
  first_name: StringFilterInput,
  last_name: StringFilterInput,
  dob: StringFilterInput,

  address_street: StringFilterInput,
  address_town: StringFilterInput,
  address_postcode: StringFilterInput,
  address_country: StringFilterInput,

  deleted_at: StringFilterInput,
  updated_at: StringFilterInput,
  created_at: StringFilterInput,
}

input CheckFilterInput {
  id: StringFilterInput,
}
`
