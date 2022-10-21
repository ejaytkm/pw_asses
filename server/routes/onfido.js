var express = require('express')
var router = express.Router()
const { Onfido } = require('@onfido/api')
const models = require('../database/models')
const serviceS3Upload = require('../services/s3upload')
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

const onfido = new Onfido({
  apiToken: process.env.ONFIDO_API_TOKEN
})

router.get('/', async (req, res, next) => {
  res.render('index', { title: 'API' })
})

router.post('/test_webhook', async (req, res, next) => {
  res.json({
    data: 'this is working test #16'
  })
})

// router.post('/test_webhook', async (req, res, next) => {
//   const checkModel = await models.Check.findOne({
//     where: {
//       onfido_check_id: '24ecb632-5b82-4990-9ae9-816aa62a9e2d'
//     },
//     include: [{
//       model: models.Applicant,
//       as: 'applicantData'
//     }]
//   })

//   // Fire compliance-advantage protocol only if clear and considered
//   if (resCheck.result === 'clear' && resCheck.result === 'considered') {
//     const complianceParams = new URLSearchParams()
//     complianceParams.append('user_id', checkModel.applicantData.user_id)

//     fetch(`${process.env.CHECK_COMPLIANCE_URL}`, {
//       method: 'POST',
//       body: complianceParams,
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     })
//       .then(res => {
//         return res.json()
//       })
//       .then(res => {
//         models.Compliance.create({
//           onfido_check_id: checkModel.onfido_check_id,
//           compliance_json_response: 'success'
//         })
//       })
//       .catch(err => {
//         models.Compliance.create({
//           onfido_check_id: checkModel.onfido_check_id,
//           compliance_json_response: JSON.stringify({ err: err.message })
//         })
//       })

//     return res.json()
//   }
// })

router.post('/onfido_webhook', async (req, res, next) => {
  try {
    if (!req.body.payload) {
      res.status(404)
      return res.json('Error no payload.')
    }

    const onfidoPayload = req.body.payload
    const resourceType = onfidoPayload.resource_type // report || check
    const action = onfidoPayload.action.split('.')[1] // completed

    // if (action !== 'completed') {
    //   res.status(404)
    //   return res.json('Please select a valid action.')
    // }

    // As for now, webhooks only suppport complete actions only. Pleaese visit https://dashboard.onfido.com/api/webhook_management to edit more webhook responses.
    if (resourceType === 'check') {
      const resCheck = await onfido.check.find(onfidoPayload.object.id)
      const checkModel = await models.Check.findOne({
        where: {
          onfido_check_id: onfidoPayload.object.id
        },
        include: [{
          model: models.Applicant,
          as: 'applicantData'
        }]
      })

      if (checkModel) {
        checkModel.status = resCheck.status
        checkModel.result = resCheck.result
        checkModel.onfido_result_uri = resCheck.onfido_result_uri
        checkModel.onfido_json_reponse = JSON.stringify(resCheck)

        checkModel.save()
      }

      // Fire compliance-advantage protocol
      if (resCheck.result === 'clear') {
        const complianceParams = new URLSearchParams()
        complianceParams.append('user_id', checkModel.applicantData.user_id)

        fetch(`${process.env.CHECK_COMPLIANCE_URL}`, {
          method: 'POST',
          body: complianceParams,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(res => {
            return res.json()
          })
          .then(res => {
            models.Compliance.create({
              onfido_check_id: checkModel.onfido_check_id,
              compliance_json_response: JSON.stringify(res)
            })
          })
          .catch(err => {
            models.Compliance.create({
              onfido_check_id: checkModel.onfido_check_id,
              compliance_json_response: JSON.stringify({ err: err.message })
            })
          })
      }

      return res.json()
    }

    if (resourceType === 'report') {
      const resReport = await onfido.report.find(onfidoPayload.object.id)
      const reportInstance = {
        onfido_report_id: resReport.id,
        onfido_check_id: resReport.checkId,
        onfido_report_href: resReport.href,
        onfido_document: JSON.stringify(resReport.documents),
        report_name: resReport.name,
        report_status: resReport.status,
        report_result: resReport.result,
        report_sub_result: resReport.subResult,
        report_properties: JSON.stringify(resReport.properties),
        report_breakdown: JSON.stringify(resReport.breakdown)
      }

      const reportModel = await models.Report.findOne({
        where: {
          onfido_report_id: onfidoPayload.object.id
        }
      })

      if (!reportModel) {
        await models.Report.create(reportInstance)
      } else {
        reportModel.onfido_report_href = resReport.href
        reportModel.onfido_document = JSON.stringify(resReport.documents)
        reportModel.report_status = resReport.status
        reportModel.report_result = resReport.result
        reportModel.report_sub_result = resReport.subResult
        reportModel.report_properties = JSON.stringify(resReport.properties)
        reportModel.report_breakdown = JSON.stringify(resReport.breakdown)

        reportModel.save()
      }

      return res.json()
    }

    res.json()
  } catch (err) {
    console.error(err)
    res.status(404)
    return res.json('An error has occuered')
  }
})

router.post('/get_resource_image', async (req, res, next) => {
  if (!req.body.uri) {
    res.status(404)
    res.json(null)
  }

  try {
    const check = await serviceS3Upload.checkObjectExist(req.body)

    if (!check) {
      throw new Error('')
    }

    const data = await serviceS3Upload.retrieveFromBucket(req.body)
    res.json({
      href: data
    })
  } catch (err) {
    res.status(404)
    res.json(null)
  }
})

module.exports = router
