'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Yelp = require('yelp');
const r = require('rethinkdb');
const rConfig = require(__dirname+"/data/config.js");


const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: 3000,
  // Enable this API to be hit by any domain
  routes: { cors: true }
});


server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply){
    reply('Nothing to see here').code(403);
  }
});


// server.route({
//   method: 'GET',
//   path: '/{name}',
//   handler: function(request, reply){
//     // http://hapijs.com/tutorials
//     // Note that we URI encode the name parameter, this is to prevent
//     // content injection attacks. Remember, it's never a good idea to render
//     // user provided data without output encoding it first!
//     reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//   }
// });


server.route({
  method: 'GET',
  path: '/{userName}/meals',

  handler: function(request, reply){

    r.connect(rConfig.rethinkdb, function(err, conn){
      if(err)throw err;
      let rConn = conn;

      r.db('test').table('meals').orderBy({index: r.desc('timestamp')}).run(rConn, function(err, cursor){
        if (err) throw err;
        cursor.toArray(function(err, result){
          if(err) throw err;
          let val = JSON.stringify(result, null, 2);
          console.log(val);
          reply(val);
        });
      });
    });
  }
});


server.route({
  method: 'POST',
  path: '/new',

  handler: function(request, reply){
    console.log("Received POST: " + request.payload);

    let newMeal = JSON.parse(request.payload);

    r.connect(rConfig.rethinkdb, function(err, conn){
      if(err)throw err;

      let rConn = conn;
      var numStars = newMeal.stars;
      var starList = Array.apply(null, {length: numStars}).map(Number.call, Number)

      console.log(newMeal.item);
      console.log(newMeal.restaurant);
      console.log(starList);
      console.log(newMeal.info);

      r.db('test').table('meals').insert({
        timestamp: new Date(),
        userName: 'Carlos',
        item: newMeal.item,
        restaurant: newMeal.restaurant,
        stars: starList,
        info: newMeal.info,
        postedOn: '1 month ago',
        numLikes: 8
      }).run(rConn, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
      });

    });
    reply('Created new meal');
  }
});


var yelp = new Yelp({
  consumer_key: 'yc93F1bjrOLmzeKbCctkTA',
  consumer_secret: 'Px42KJg-lzDFfNX-v9Nn1Yw96HI',
  token: 'X8UAutSW7fOBMu9xNff47P5tOZKm5_Tu',
  token_secret: '9fJ6v5XZyLAajFk1EHkB-U-ZZxg',
});


server.route({
  method: 'GET',
  path: '/get-restaurants',

  handler: function(request, reply){
    yelp.search({ term: 'restaurant', location: '10033' })

    .then(function (data) {
      console.log(data);
      let names = data.businesses.map((business) => business.name);
      reply(names);
    })

    .catch(function (err) {
      console.error(err);
    });
  }
});


server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, (err) => {
  if(err){
    throw err; // something bad happened loading the plugin
  }

  server.start(() => {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});