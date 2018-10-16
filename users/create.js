"use strict";

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
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
			Item: {
				id: uuid.v1(),
				userName: data.userName,
				userId: data.userId,
				createdAt: timestamp,
				updatedAt: timestamp
			}
		};

		dynamoDb.put(params, function(err, result){
			if (err){
				console.log(err.stack);
				const response = {
					statusCode: 200,
					body: JSON.stringify({message: "There was an error in saving user record. Please try again."})
				}
				callback(null, response);
			}else{
				const response = {
					statusCode: 200,
					body: JSON.stringify({message: "User record has been saved successfully.", data: params.Item})
				}
				callback(null, response);
			}
		});

	}
}
