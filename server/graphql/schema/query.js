module.exports = `
type Query {
  # --- User and User Info ---
  applicants (
    filter: ApplicantFilterInput,
    perPage: Int,
    page: Int,
    sort: [[String]]
  ) : ApplicantData

  checks (
    filter: CheckFilterInput,
    perPage: Int,
    page: Int,
    sort: [[String]]
  ) : CheckData
}
`
