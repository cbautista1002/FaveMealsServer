var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'yc93F1bjrOLmzeKbCctkTA',
  consumer_secret: 'Px42KJg-lzDFfNX-v9Nn1Yw96HI',
  token: 'X8UAutSW7fOBMu9xNff47P5tOZKm5_Tu',
  token_secret: '9fJ6v5XZyLAajFk1EHkB-U-ZZxg',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'restaurant', location: '10033' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});