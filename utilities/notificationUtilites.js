module.exports.notificationUtilities = async(event, snsClient) =>{

    console.log('notify event::', event)

    const { TableName, accountId, region } = event;

    const message = `The DynamoDB table ${TableName} has been created in account ${accountId} and region ${region}.`;
  
    try {
      const data = await snsClient
        .publish({
          TopicArn: 'arn:aws:sns:us-east-1:168131596408:testmira',
          Message: message,
          Subject: 'DynamoDB table created',
        })
        .promise();
  
      console.log(`Notification sent: ${message}`);

      console.log('data::notification', data)
      return 'success'

    } catch (err) {
      console.error(err);
      return 'FAILED'
    }
}