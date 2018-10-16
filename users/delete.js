'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {

	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Key: {
			id: event.pathParameters.id
		}
	}
	dynamoDb.delete(params, function(err, result){
		if(err){
			console.log(err.stack);
			const response = {
				statusCode: 200,
				body: JSON.stringify({message: "There was an error in deleting user record."})
			}
			callback(null, response);
		}else{
			const response = {
				statusCode: 200,
				body: JSON.stringify({message: "User record has been deleted successfully.", item: result.Item})
			}
			callback(null, response);
		}
	});
	
}