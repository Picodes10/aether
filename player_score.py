import json
import boto3
from botocore.exceptions import ClientError
from decimal import Decimal

def update_score_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Players')
    
    try:
        # Parse request body
        body = json.loads(event['body'])
        player_id = body['playerId']
        score_increment = Decimal(str(body['scoreIncrement']))
        
        # Update player score
        response = table.update_item(
            Key={
                'playerId': player_id
            },
            UpdateExpression='ADD score :val',
            ExpressionAttributeValues={
                ':val': score_increment
            },
            ReturnValues='UPDATED_NEW'
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({'updatedScore': float(response['Attributes']['score'])})
        }
        
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }
