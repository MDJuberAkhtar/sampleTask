
module.exports.cloudformationUtilities = async (event, cloudformationClient) =>{

    if(!event.TableName || !event.ReadCapacityUnits || !event.WriteCapacityUnits) return 'FAILED'

    const { TableName, ReadCapacityUnits, WriteCapacityUnits } = event;

    const stackName = 'my-dynamodb-stack';

    const params = {
        StackName: stackName,
        TemplateBody: JSON.stringify({
        AWSTemplateFormatVersion: '2010-09-09',
        Resources: {
            MyDynamoDBTable: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
                TableName: TableName,
                AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'S',
                },
                ],
                KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH',
                },
                ],
                ProvisionedThroughput: {
                ReadCapacityUnits: ReadCapacityUnits,
                WriteCapacityUnits: WriteCapacityUnits,
                },
            },
            },
        },
        }),
        Capabilities: ['CAPABILITY_NAMED_IAM'],
    };

    let paramsData = {
        StackName: stackName
    }

    try {
        let result  = {}

        const newData = await cloudformationClient.describeStacks(paramsData).promise();

        console.log('data::new', newData)

        const stack = newData.Stacks[0];

        const newStack = stack.StackId.split(':')

        result.accountId = newStack[4];
        result.region = newStack[3];

        await cloudformationClient.updateStack(params).promise();

        console.log(`Stack update initiated: ${stackName}`);

        result.TableName = TableName

        console.log('result::', result)

        return result

    } catch (err) {
        console.error('Stack update failed',err);
        return 'FAILED'
    }


}