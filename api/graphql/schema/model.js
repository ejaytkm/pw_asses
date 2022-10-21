module.exports = `
type Applicant {
  id: String!,
  onfido_applicant_id: String!,
  onfido_href: String,
  user_id: String!,
  email: String!,
  first_name: String,
  last_name: String,
  dob: String,

  address_street: String,
  address_town: String,
  address_postcode: String,
  address_country: String,
  checkData: [Check],
  documentData: [Document],
  livePhotoData: [LivePhoto]

  deleted_at: String,
  updated_at: String,
  created_at: String,
}

type ApplicantToken {
  token: String
}

type Check {
  id: String,
  onfido_check_id: String,
  applicant_id: String,
  onfido_check_config: String,
  status: String,
  result: String,
  onfido_result_uri: String,
  onfido_json_reponse: String,
  reportData: [Report],

  created_at: String,
  updated_at: String,
  deleted_at: String,
}

type User {
  id: String,
  email: String,
  password: String,
  email_verification_code: String,
  updated_at: String,
  created_at: String,
}

type Report {
  id: String,
  onfido_report_id: String,
  onfido_check_id: String,
  onfido_report_href: String,
  onfido_document: String,
  report_name: String,
  report_status: String,
  report_result: String,
  report_sub_result: String,
  report_properties: String,
  report_breakdown: String,
  created_at: String,
  updated_at: String,
  deleted_at: String
}

type Document {
  id: String,
  applicant_id: String,
  document_id: String,
  document_type: String,
  file_type: String,
  file_size: String,
  file_name: String,
  file_side: String,
  download_href: String,
  s3_download_href: String,
  onfido_json_reponse: String,
  created_at: String,
  updated_at: String,
  deleted_at: String
}

type LivePhoto {
  id: String,
  applicant_id: String,
  live_photo_id: String,
  file_type: String,
  file_size: String,
  file_name: String,
  download_href: String,
  s3_download_href: String,
  onfido_json_reponse: String,
  created_at: String,
  updated_at: String,
  deleted_at: String
}

type UserInfo {
  id: String,
}
`
