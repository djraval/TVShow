
const functions = require('firebase-functions');
const cheerio = require('cheerio');
var unirest = require('unirest');
var cors = require('cors')({origin: true});

function funcLogic(request,response){
  unirest.get('http://tuaashiqui.com/category/yeh-rishta-kya-kehlata-hai')
  .end(function (res) {
    $ = cheerio.load(res.body);
    var page_url = $("article a").attr("href");
    //response.send(page_url);
    console.log(res.body);
    unirest.get(page_url).end(function(page_url){
        var url_value = /setup\({\nfile: '.[^',]*/.exec(page_url.body);
        $ = cheerio.load(page_url.body);
        var date = $("p span strong")[2];
        var date_value = $(date).text();    
        response.send(url_value[0].substring(15)+';'+date_value);
    });
  });
}
 exports.getEpisodeUrl = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    funcLogic(req,res)
  });
 });