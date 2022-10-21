module.exports = `
input ApplicantInput {
  user_id: String,
  onfido_applicant_id: String,
  email: String!,
  first_name: String,
  last_name: String,
  dob: String,

  address_street: String,
  address_town: String,
  address_postcode: String,
  address_country: String,
}

input ApplicantTokenInput {
  onfido_applicant_id: String,
  referrer: String
}

input CheckInput {
  applicant_id: String!,
  report_names: String
}

input ResaveDocumentInput {
  applicant_id: String!
}
`
