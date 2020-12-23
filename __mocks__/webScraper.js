const fs = require('fs');
const cheerio = require('cheerio');


module.exports = {
async processRequest(url)
{
    console.log("inside web scraper mock function");
   console.log("URl to be processed: ",url);
   try {
      //let response = await got(url); 
    
      let res = await fs.readFileSync("./myPage.html", 'utf8');
      var resObj = {};
      let $ = cheerio.load(res);
      let $title = $('head title').text();
      let $desc = $('meta[name="description"]').attr('content');
      let $kwd = $('meta[name="keywords"]').attr('content');
      let $ogTitle = $('meta[property="og:title"]').attr('content');
      let $ogImage = $('meta[property="og:image"]').attr('content');
      let $ogkeywords = $('meta[property="og:keywords"]').attr('content');
      let $images = $('img');
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
       console.log(error);
   }
}
};