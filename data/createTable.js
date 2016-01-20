const r = require('rethinkdb');
const config = require(__dirname+"/config.js");


var rConn = null;
r.connect(config.rethinkdb, function(err, conn) {
  if(err)throw err;
  rConn = conn;

//   r.db('test').tableCreate('meals').run(rConn, function(err, result) {
//       if (err) throw err;
//       console.log(JSON.stringify(result, null, 2));
//   })

//   r.db('test').table('meals').insert([{
//       userName: 'Carlos',
//       item: 'Chicken',
//       restaurant: 'Vegetarian Paradise',
//       stars: [1,2,3,4],
//       info: 'too spicy lkdsjflksdj fklsjd lkfjs dlkf',
//       postedOn: '1 month ago',
//       numLikes: 8
//     }, {
//       userName: 'Carlos',
//       item: 'Turkey',
//       restaurant: 'Red Bamboo',
//       stars: [1,2],
//       info: 'super bland',
//       postedOn: '2 days ago',
//       numLikes: 2
//     }, {
//       userName: 'Carlos',
//       item: 'BBQ Wings',
//       restaurant: 'Vegetarian Paradise',
//       stars: [1,2,3,4,5],
//       info: 'perfect',
//       postedOn: '6 months ago',
//       numLikes: 87
//     }
//   ]).run(rConn, function(err, result) {
//     if (err) throw err;
//     console.log(JSON.stringify(result, null, 2));
//   });

//   r.db('test').table('meals').run(rConn, function(err, cursor) {
//     if (err) throw err;
//     cursor.toArray(function(err, result) {
//       if (err) throw err;
//       console.log(JSON.stringify(result, null, 2));
//     });
// });

//  r.db('test').table("meals").get("8175c2e2-f25e-4b4c-bfd7-0b632235884a").delete().run(rConn)
r.db('test').table('meals').indexCreate('timestamp').run(conn, function(){console.log('done')});
})


// var starList = Array.apply(null, {length: 4}).map(Number.call, Number);
// console.log(starList);
