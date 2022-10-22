module.exports = `
type Mutation {
  createIngredient(
    input: IngredientInput!
  ): Ingredient!
}
`

// # --- Applicant ---
// createApplicant(
//   input: ApplicantInput!
// ): Applicant!

// updateApplicant(
//   filter: ApplicantFilterInput,
//   input: ApplicantInput!
// ): Applicant!

// requestApplicantToken(
//   input: ApplicantTokenInput!
// ): ApplicantToken!

// # --- Checks ---
// createCheck(
//   input: CheckInput!
// ): Check!

// resaveDocumentData(
//   input: ResaveDocumentInput!
// ): Check!