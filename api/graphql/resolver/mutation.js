const { ApolloError } = require('apollo-server-express')
const { Onfido } = require('@onfido/api')

const fetch = require('node-fetch')
const serviceS3Upload = require('../../services/s3upload')

const validator = require('validator')
const moment = require('moment-timezone')
moment.tz.setDefault('Etc/UTC')

const onfido = new Onfido({
  apiToken: process.env.ONFIDO_API_TOKEN
})

async function saveAndUploadDocument (parent, args, { models }, info, applicant) {
  const { applicant_id } = args.input

  const insertArray = []
  const resDocument = await onfido.document.list(applicant_id)

  // RETURN ERROR
  if (!Array.isArray(resDocument)) {
    return {
      id: 1
    }
  }

  // GETTING RESULTS BASED ON REPORTS
  resDocument.map(data => {
    insertArray.push({
      applicant_id: applicant.id, // normal applicant id
      document_id: data.id,
      document_type: data.type,

      file_type: data.fileType,
      file_size: JSON.stringify(data.fileSize),
      file_name: data.fileName,
      file_side: data.side,

      download_href: data.downloadHref,
      onfido_json_reponse: JSON.stringify(data)
    })
  })

  const documentModels = await models.Document.bulkCreate(insertArray, {
    returning: ['document_id'],
    ignoreDuplicates: true
  })

  documentModels.map(document => {
    const fileType = document.file_type
    const split = fileType.split('/')
    let extensionName

    if (split.length > 1) {
      extensionName = split[1]
    } else {
      extensionName = split[0]
    }

    fetch(`${process.env.ONFIDO_API_URL}/v3/documents/${document.document_id}/download`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${process.env.ONFIDO_API_TOKEN}`
      }
    })
      .then(res => res.buffer())
      .then(async buffer => {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `kyc/${applicant_id}/documents/${document.document_id}.${extensionName}`, // File name you want to save as in S3
          Body: buffer
        }

        try {
          serviceS3Upload.uploadToBucket(params)
          const resDocument = await models.Document.findOne({
            where: {
              document_id: document.document_id
            }
          })

          resDocument.s3_download_href = params.Key
          resDocument.save()

          console.log('Document URL has been saved.')
        } catch (err) {
          const resDocument = await models.Document.findOne({
            where: {
              document_id: document.document_id
            }
          })

          resDocument.s3_download_href = 'error'
          resDocument.save()

          console.error(err)
        }
      })
  })
}

async function saveAndUploadLivePhoto (parent, args, { models }, info, applicant) {
  const { applicant_id } = args.input

  const insertArray = []
  const livePhotos = await onfido.livePhoto.list(applicant_id)

  if (!Array.isArray(livePhotos)) {
    return
  }

  // GETTING RESULTS BASED ON REPORTS
  livePhotos.map(data => {
    insertArray.push({
      applicant_id: applicant.id, // normal applicant id
      live_photo_id: data.id,

      file_name: data.fileName,
      file_type: data.fileType,
      file_size: JSON.stringify(data.fileSize),

      download_href: data.downloadHref,
      onfido_json_reponse: JSON.stringify(data)
    })
  })

  const livePhotoModels = await models.LivePhoto.bulkCreate(insertArray, {
    returning: ['live_photo_id'],
    ignoreDuplicates: true
  })

  livePhotoModels.map(photo => {
    const fileType = photo.file_type
    const split = fileType.split('/')
    let extensionName

    if (split.length > 1) {
      extensionName = split[1]
    } else {
      extensionName = split[0]
    }

    fetch(`${process.env.ONFIDO_API_URL}/v3/live_photos/${photo.live_photo_id}/download`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${process.env.ONFIDO_API_TOKEN}`
      }
    })
      .then(res => res.buffer())
      .then(async buffer => {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `kyc/${applicant_id}/livephotos/${photo.live_photo_id}.${extensionName}`, // File name you want to save as in S3
          Body: buffer
        }

        try {
          serviceS3Upload.uploadToBucket(params)
          const resPhoto = await models.LivePhoto.findOne({
            where: {
              live_photo_id: photo.live_photo_id
            }
          })

          resPhoto.s3_download_href = params.Key
          resPhoto.save()

          console.log('Live Photo URL has been saved.')
        } catch (err) {
          const resPhoto = await models.LivePhoto.findOne({
            where: {
              live_photo_id: photo.live_photo_id
            }
          })

          resPhoto.s3_download_href = 'error'
          resPhoto.save()

          console.error('An error has orrucred', err)
        }
      })
  })
}

async function saveAndUploadLiveVideo (parent, args, { models }, info, applicant) {
  const { applicant_id } = args.input

  const insertArray = []
  const liveVideos = await onfido.liveVideo.list(applicant_id)

  if (!Array.isArray(liveVideos)) {
    return
  }

  // GETTING RESULTS BASED ON REPORTS
  liveVideos.map(data => {
    insertArray.push({
      applicant_id: applicant.id, // normal applicant id
      live_video_id: data.id,

      challenge: JSON.stringify(data.challenge),
      language: JSON.stringify(data.languages),

      file_name: data.fileName,
      file_type: data.fileType,
      file_size: JSON.stringify(data.fileSize),

      download_href: data.downloadHref,
      onfido_json_reponse: JSON.stringify(data)
    })
  })

  const liveVideoModel = await models.LiveVideo.bulkCreate(insertArray, {
    returning: ['live_video_id'],
    ignoreDuplicates: true
  })

  liveVideoModel.map(video => {
    const fileType = video.file_type
    const split = fileType.split('/')
    let extensionName

    if (split.length > 1) {
      extensionName = split[1]
    } else {
      extensionName = split[0]
    }

    fetch(`${process.env.ONFIDO_API_URL}/v3/live_videos/${video.live_video_id}/download`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${process.env.ONFIDO_API_TOKEN}`
      }
    })
      .then(res => res.buffer())
      .then(async buffer => {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `kyc/${applicant_id}/live_videos/${video.live_video_id}.${extensionName}`, // File name you want to save as in S3
          Body: buffer
        }

        try {
          serviceS3Upload.uploadToBucket(params)
          const resVideo = await models.LiveVideo.findOne({
            where: {
              live_video_id: video.live_video_id
            }
          })

          resVideo.s3_download_href = params.Key
          resVideo.save()

          console.log('Live Video URL has been saved.')
        } catch (err) {
          const resVideo = await models.LiveVideo.findOne({
            where: {
              live_video_id: video.live_video_id
            }
          })

          resVideo.s3_download_href = 'error'
          resVideo.save()

          console.error(err)
        }
      })
  })
}

async function updateUserInfo (parent, args, { models }, info, applicant) {
  const { applicant_id } = args.input

  // FIND ONFIDO APPLICANT + UPDATE DB APPLICANT
  const onfidoApplication = await onfido.applicant.find(applicant_id)
  applicant.onfido_href = onfidoApplication.href
  applicant.first_name = onfidoApplication.firstName
  applicant.last_name = onfidoApplication.lastName
  applicant.dob = onfidoApplication.dob
  applicant.address_street = onfidoApplication.address_street
  applicant.address_town = onfidoApplication.address_town
  applicant.address_postcode = onfidoApplication.address_postcode
  applicant.address_country = onfidoApplication.address_country
  applicant.save()
}

async function updateCheckInfo (parent, args, { models }, info, applicant) {
  const { applicant_id } = args.input
  const onfidoApplication = await onfido.check.list(applicant_id)
  const reportNames = ['document', 'facial_similarity_photo']

  await onfidoApplication.map(async onfidoApp => {
    console.log(onfidoApp)

    await models.Check.update({
      applicant_id: applicant.id,
      onfido_check_config: JSON.stringify(reportNames),
      status: onfidoApp.status,
      result: onfidoApp.result,
      onfido_result_uri: onfidoApp.resultsUri
    }, {
      where: {
        onfido_check_id: {
          eq: onfidoApp.id
        }
      }
    })
  })
}

module.exports = {
  createApplicant: async (parent, args, { models }, info) => {
    const { email } = args.input
    const isValid = validator.isEmail(email)

    if (!isValid) throw new ApolloError('Email not in proper format').substr(10, 10)

    // create applicant - onfido
    const newApplicant = await onfido.applicant.create({
      firstName: args.input.first_name,
      lastName: args.input.last_name,
      dob: args.input.dob,
      email: args.input.email,
      address: {
        town: args.input.address_town,
        street: args.input.address_street,
        postcode: args.input.address_postcode,
        country: args.input.address_country
      }
    })

    // create applicant - db
    const res = await models.Applicant.create({
      user_id: args.input.user_id,
      onfido_applicant_id: newApplicant.id,
      email: args.input.email,
      onfido_href: newApplicant.href,
      first_name: args.input.first_name,
      last_name: args.input.last_name,
      dob: args.input.dob,
      address_street: args.input.address_street,
      address_town: args.input.address_town,
      address_postcode: args.input.address_postcode,
      address_country: args.input.address_country
    })

    const data = res ? res.dataValues : null

    return {
      ...data
    }
  },

  // updateApplicant: async (parent, args, { models }, info) => {
  //   const filterParam = queryFilter.filter(args)
  //   const { email } = args.input
  //   const isValid = validator.isEmail(email)

  //   if (!isValid) throw new ApolloError('Email not in proper format').substr(10, 10)

  //   // update applicant - onfido
  //   // TODO - update applicant on onfido

  //   // update applicant - db
  //   const res = await models.Applicant.update({
  //     user_id: args.input.user_id,
  //     onfido_applicant_id: '3214215231421-3421421421',
  //     email: args.input.email,
  //     first_name: args.input.first_name,
  //     last_name: args.input.last_name,
  //     dob: args.input.dob,
  //     address_street: args.input.address_street,
  //     address_town: args.input.address_town,
  //     address_postcode: args.input.address_postcode,
  //     address_country: args.input.address_country
  //   }, {
  //     where: filterParam.filter,
  //     paranoid: false
  //   })

  //   return {
  //     id: res[0]
  //   }
  // },

  requestApplicantToken: async (parent, args, { models }, info) => {
    const generateSdkToken = await onfido.sdkToken.generate({
      applicantId: args.input.onfido_applicant_id,
      referrer: args.input.referrer
    })

    return {
      token: generateSdkToken
    }
  },

  createCheck: async (parent, args, { models }, info) => {
    const { applicant_id } = args.input
    const reportNames = ['document', 'facial_similarity_photo'] // import in changeing the type of report
    // const reportNames = ['document', 'facial_similarity_photo', 'facial_similarity_video'] // import in changeing the type of report

    // find applicant
    const applicant = await models.Applicant.findOne({
      where: {
        onfido_applicant_id: applicant_id
      }
    })

    if (!applicant) {
      throw new ApolloError('No applicant found.')
    }

    // create check - onfido
    const createCheck = await onfido.check.create({
      applicantId: applicant_id, // user onfido_applicant_id === args.input.applicant_id
      reportNames
    })

    // // create check - db
    await models.Check.create({
      applicant_id: applicant.id,
      onfido_check_config: JSON.stringify(reportNames),
      onfido_check_id: createCheck.id,
      status: createCheck.status,
      result: createCheck.result,
      onfido_result_uri: createCheck.onfido_result_uri,
      onfido_json_reponse: JSON.stringify(createCheck)
    })

    // retrieve document
    await saveAndUploadDocument(parent, args, { models }, info, applicant)

    // retrieve live photo
    if (reportNames.includes('facial_similarity_photo')) {
      saveAndUploadLivePhoto(parent, args, { models }, info, applicant)
    }

    // retrieve live video
    if (reportNames.includes('facial_similarity_video')) {
      saveAndUploadLiveVideo(parent, args, { models }, info, applicant)
    }

    return {
      id: 1
    }
  },

  resaveDocumentData: async (parent, args, { models }, info) => {
    const { applicant_id } = args.input
    const reportNames = ['document', 'facial_similarity_photo'] // import in changeing the type of report
    // const reportNames = ['document', 'facial_similarity_photo', 'facial_similarity_video'] // import in changeing the type of report

    // USER APPLICANT ID
    const applicant = await models.Applicant.findOne({
      where: {
        onfido_applicant_id: applicant_id
      }
    })

    if (!applicant) {
      throw new ApolloError('No applicant found.')
    }

    // FIND ONFIDO APPLICATION + UPDATE DB APPLICATION
    await updateUserInfo(parent, args, { models }, info, applicant)

    // FIND ONFIDO CHECK + UPDATE DB CHECK
    await updateCheckInfo(parent, args, { models }, info, applicant)

    // retrieve document
    await saveAndUploadDocument(parent, args, { models }, info, applicant)

    // retrieve live photo
    if (reportNames.includes('facial_similarity_photo')) {
      saveAndUploadLivePhoto(parent, args, { models }, info, applicant)
    }

    // retrieve live video
    if (reportNames.includes('facial_similarity_video')) {
      saveAndUploadLiveVideo(parent, args, { models }, info, applicant)
    }

    return {
      id: 1
    }
  }
}
