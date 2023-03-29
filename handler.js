'use strict';
const AWS = require('aws-sdk')

//initalization
const cloudformationClient = new AWS.CloudFormation()
const snsClient = new AWS.SNS();

//custom import
const {cloudformationUtilities} = require('./utilities/cloudformationUtilities')
const {notificationUtilities} = require('./utilities/notificationUtilites')
const Response = require('./common/ResponsesApi')

module.exports.handler = async (event) => {

  const data = JSON.parse(event.body) 

  console.log('data::', data)

  const cloudformationResult = await cloudformationUtilities(data, cloudformationClient);

  if(!(cloudformationResult == 'FAILED')) {
    console.log('test')
    const newResult =  await notificationUtilities(cloudformationResult, snsClient);
    if(!(newResult == 'FAILED')) return Response._Success({msg:"success"})
  }

  return Response._Error({msg:'error'});

};
