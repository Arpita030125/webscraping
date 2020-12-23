'use strict';
const webScrap = require('./webScraper');
module.exports.getMetaData = async (event) => {
  let input = event;
  console.log("input: ",input);
let response = await webScrap.processRequest(input.Url);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
