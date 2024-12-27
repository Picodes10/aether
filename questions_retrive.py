import json
import boto3
from botocore.exceptions import ClientError

def get_question_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('TriviaQuestions')
    
    try:
        # Get question ID from event
        question_id = event['pathParameters']['questionId']
        
        # Get item from DynamoDB
        response = table.get_item(
            Key={
                'questionId': question_id
            }
        )
        
        # Check if item exists
        if 'Item' in response:
            return {
                'statusCode': 200,
                'body': json.dumps(response['Item'])
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Question not found'})
            }
            
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }
