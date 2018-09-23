// require cheerio 
var cheerio = require('cheerio');

// get html
var request = require('request');

// Use Article model
var Article = require('../models/Article');

// define the site we want to scrape
var website = 'https://www.npr.org';

function scrapedWeb(callback) 
{
  request(website, function(error, response, html)
    
  {
    if (error) console.log("Error Scraping", error);

    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);

    //Target articles by tag
    $("h3.title").each(function(i, element) 
    {
      

      // Add the text and href of every link, and save them as properties of the result object
      var link = $(element).parent().attr("href");
      var title = $(element).text();

      var scrapeArticle = new Article(
      {
        title: title,
        link: link
      });

      // Save Article
      scrapeArticle.save(function(error) 
      {
        //if (error) console.log("Unable to save article", error); //removes duplicate error msg
      });
    });

    callback();
  });
      
}

// export the scraps
exports.scrapedWeb = scrapedWeb;