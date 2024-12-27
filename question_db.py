import boto3
from botocore.exceptions import ClientError

def create_tables():
    # Initialize DynamoDB client
    dynamodb = boto3.client('dynamodb')
    
    try:
        # Create TriviaQuestions table
        dynamodb.create_table(
            TableName='TriviaQuestions',
            KeySchema=[
                {
                    'AttributeName': 'questionId',
                    'KeyType': 'HASH'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'questionId',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )

        # Create Players table
        dynamodb.create_table(
            TableName='Players',
            KeySchema=[
                {
                    'AttributeName': 'playerId',
                    'KeyType': 'HASH'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'playerId',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )

        print("Tables created successfully")
    except ClientError as e:
        print(f"Error creating tables: {e}")