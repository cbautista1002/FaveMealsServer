'use strict';

const Hapi = require('hapi');
const Good = require('good');


const server = new Hapi.Server();
server.connection({
  port: 3000,
  // Enable this API to be hit by any webpage
  routes: { cors: true }
});


server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply){
    reply('Nothing to see here').code(403);
  }
});


server.route({
  method: 'GET',
  path: '/{name}',
  handler: function(request, reply){
    // http://hapijs.com/tutorials
    // Note that we URI encode the name parameter, this is to prevent
    // content injection attacks. Remember, it's never a good idea to render
    // user provided data without output encoding it first!
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});


server.route({
  method: 'GET',
  path: '/{userName}/meals',
  handler: function(request, reply){
    let val = [{
      userName: request.params.userName,
      item: 'Chicken',
      restaurant: 'Vegetarian Paradise',
      stars: [1,2,3,4],
      info: 'too spicy lkdsjflksdj fklsjd lkfjs dlkf',
      postedOn: '1 month ago',
      numLikes: 8
    }, {
      userName: request.params.userName,
      item: 'Turkey',
      restaurant: 'Red Bamboo',
      stars: [1,2],
      info: 'super bland',
      postedOn: '2 days ago',
      numLikes: 2
    }, {
      userName: request.params.userName,
      item: 'BBQ Wings',
      restaurant: 'Vegetarian Paradise',
      stars: [1,2,3,4,5],
      info: 'perfect',
      postedOn: '6 months ago',
      numLikes: 87
    }];
    reply(val);
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