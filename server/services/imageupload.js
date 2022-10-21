const multer = require('multer')
const multerS3 = require('multer-s3-transform')

const path = require('path')
const aws = require('aws-sdk')
const uuidv4 = require('uuid/v4')
const sharp = require('sharp')

aws.config.update({
  secretAccessKey: process.env.AWS_SECRETKEY,
  accessKeyId: process.env.AWS_ACCESSKEY
})

const s3 = new aws.S3()

// Check file Type
function checkFileType (req, file, cb) {
  const userId = req.body.userid
  if (userId == undefined) {
    return cb("Missing 'userid' parameter.", false)
  }
  // Allowed Extensions
  const fileTyps = /jpeg|jpg|png/
  // Check ext
  const extname = fileTyps.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = fileTyps.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    return cb('File submitted failed validation', false)
  }
}

function transformEnabler (file, cb) {
  // console.log(/^image/i.test(file.mimetype)); //cheking ?
  return cb(null, true)
}

function renameImage (req, cb) {
  const userId = req.body.userid
  const file_directory = process.env.AWS_KYC_PATH
  return cb(null, file_directory + '/' + userId + '_' + `${uuidv4()}.png`)
}

function transformSettings (file, cb) {
  return cb(null,
	    sharp()
	    .resize(300, 300, {
	     	fit: sharp.fit.inside,
	     	withoutEnlargement: true
	    })
  )
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    // acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: function (req, file, cb) {
      transformEnabler(file, cb)
    },
    transforms: [{
      id: 'original',
      key: function (req, file, cb) {
        renameImage(req, cb)
      },
      transform: function (req, file, cb) {
        transformSettings(file, cb)
      }
    }]
  }),
  fileFilter: function (req, file, cb) {
    checkFileType(req, file, cb)
  },
  limits: {
    fileSize: 5000000
  }
})

module.exports = upload
