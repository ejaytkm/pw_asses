module.exports = `
type Mutation {
  # --- Applicant ---
  createApplicant(
    input: ApplicantInput!
  ): Applicant!

  updateApplicant(
    filter: ApplicantFilterInput,
    input: ApplicantInput!
  ): Applicant!

  requestApplicantToken(
    input: ApplicantTokenInput!
  ): ApplicantToken!

  # --- Checks ---
  createCheck(
    input: CheckInput!
  ): Check!

  resaveDocumentData(
    input: ResaveDocumentInput!
  ): Check!
}
`
