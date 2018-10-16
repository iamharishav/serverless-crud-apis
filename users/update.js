"use strict";

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
	const timestamp = new Date().getTime();
	const data = JSON.parse(event.body);
	if(typeof(data.userName) == "undefined" || typeof(data.userId) == "undefined"){
		const response = {
			statusCode: 200,
			body: JSON.stringify({message: "User record could not be saved due to validation errors."})
		}
		callback(null, response);
	}else{
		const params = {
			TableName: process.env.DYNAMODB_TABLE,
			Key: {
				id: event.pathParameters.id
			},
			ExpressionAttributeValues: {
      		':userName': data.userName,
      		':userId': data.userId,
      		':updatedAt': timestamp,
    		},
    		UpdateExpression: 'SET userName = :userName, userId = :userId, updatedAt = :updatedAt',
    		ReturnValues: 'ALL_NEW'
		}

		dynamoDb.update(params, function(err, result){
			if (err){
				console.log(err.stack);
				const response = {
					statusCode: 200,
					body: JSON.stringify({message: "There was an error in updating user record. Please try again."})
				}
				callback(null, response);
			}else{
				const response = {
					statusCode: 200,
					body: JSON.stringify({message: "User record has been updated successfully.", data: result.Item})
				}
				callback(null, response);
			}
		});

	}
}