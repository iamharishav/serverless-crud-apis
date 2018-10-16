"use strict";

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {
	const params = {
		TableName: process.env.DYNAMODB_TABLE
	}

	dynamoDB.scan(params, function(err, result){
		if(err){
			console.log(err.stack);
			const response = {
				statusCode: 200,
				body: JSON.stringify({message: "There was an error in retrieving user records."})
			}
			callback(null, response);
		}else{
			const response = {
				statusCode: 200,
				body: JSON.stringify({message: "User records has been retrieved successfully.", items: result.Items})
			}
			callback(null, response);
		}
	})
}