'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
	
	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Key: {
			id: event.pathParameters.id
		}
	}

	dynamoDb.get(params, function(err, result){
		if(err){
			console.log(err.stack);
			const response = {
				statusCode: 200,
				body: JSON.stringify({message: "There was an error in retrieving user record."})
			}
			callback(null, response);
		}else{
			const response = {
				statusCode: 200,
				body: JSON.stringify({message: "User record has been retrieved successfully.", item: result.Item})
			}
			callback(null, response);
		}
	});

};