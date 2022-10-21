const aws = require('aws-sdk')

aws.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY,
  secretAccessKey: process.env.AWS_SECRETKEY
})

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESSKEY,
  secretAccessKey: process.env.AWS_SECRETKEY
})

module.exports = {
  uploadToBucket: (params, cb) => {
    return s3.upload(params, (err, data) =>  {
      if (err) {
        throw err
      }

      console.log(`File uploaded successfully. ${data.Location}`)
    })
  },

  retrieveFromBucket: async (data) => {
    return new Promise((resolve, reject) => {
      var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: data.uri
      }

      const url = s3.getSignedUrl('getObject', params)

      if (url) {
        resolve(url)
      } else {
        reject(url)
      }
    })
  },

  checkObjectExist: async (data) => {
    return new Promise((resolve, reject) => {
      var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: data.uri
      }

      s3.headObject(params, (err, data) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(true)
        }
      })
    })
  }
}
