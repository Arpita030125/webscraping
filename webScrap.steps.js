const { Given, When, Then, Fusion } = require( 'jest-cucumber-fusion' )

jest.setTimeout(30000);
jest.mock('./webScraper');
const res = require('./handler');



 let result;
 let req;

 Given( /^Valid Url "([^"]*)"$/, (Url) => {
    console.log("inside first given condition");
    req =  {
        "Url":Url,
    };
} ) 
Then( /^OG metadata should be parsed and displayed$/, async() => {
    console.log("inside fuction");

      let event =  {
        "Url":"https://www.google.com"
        } 
      result = await res.getMetaData(event);
      console.log("result:",JSON.stringify(result));
      expect(result.statusCode).toBe(200);
       },50000 )


Fusion( 'webScrap.feature' );