const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got'); 
//This file is deployed in AWS lambda function with the actual logic.
module.exports = {
async processRequest(url)
{
    console.log("inside web scraper function");
   console.log("URl to be processed: ",url);
   try {
      let response = await got(url); 
      var resObj = {};
      //Json object returned to user
      //using cheerio we can navigate through html and get the DOM elements
      let $ = cheerio.load(response.body);
       //the first 6 variables get the metadata from HEAD of HTML
      let $title = $('head title').text();
      let $desc = $('meta[name="description"]').attr('content');
      let $kwd = $('meta[name="keywords"]').attr('content');
      let $ogTitle = $('meta[property="og:title"]').attr('content');
      let $ogImage = $('meta[property="og:image"]').attr('content');
      let $ogkeywords = $('meta[property="og:keywords"]').attr('content');
        //gets the data from BODY tag
      let $images = $('img');
 //The rest of the lines check whether variables have value  
       if ($title) {
            resObj.title = $title;
        }
  if ($desc) {
            resObj.description = $desc;
        }

        if ($kwd) {
            resObj.keywords = $kwd;
        }

        if ($ogImage && $ogImage.length){
            resObj.ogImage = $ogImage;
        }

        if ($ogTitle && $ogTitle.length){
            resObj.ogTitle = $ogTitle;
        }

        if ($ogkeywords && $ogkeywords.length){
            resObj.ogkeywords = $ogkeywords;
        }

        if ($images && $images.length){
            resObj.images = [];

            for (var i = 0; i < $images.length; i++) {
                resObj.images.push($($images[i]).attr('src'));
            }
        }
   return resObj;
   } catch (error) {
       console.log(error.response);
   }
}
};