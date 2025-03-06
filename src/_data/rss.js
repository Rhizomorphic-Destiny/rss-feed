const Parser = require('rss-parser');
const parser = new Parser();

module.exports = async function () {
  const feedUrls = [
    'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml', // Example feed
    'https://example.com/feed' // Replace with your feeds
  ];

  let allItems = [];
  for (let url of feedUrls) {
    try {
      const feed = await parser.parseURL(url);
      allItems = allItems.concat(feed.items);
    } catch (error) {
      console.error(`Failed to fetch ${url}: ${error}`);
    }
  }

  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return allItems;
};
