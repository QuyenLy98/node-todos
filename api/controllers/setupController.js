var Todos = require('../models/todoModel');

module.exports = function (app) {
  app.get('/api/setupTodos', function (req, res) {
    //setup seed data
    var seedTodos = [
      {
        text: 'Học Node.js',
        isDone: false,
      },
      {
        text: 'Học Angular.js',
        isDone: false,
      },
      {
        text: 'Viết một ứng dụng hoàn chỉnh',
        isDone: false,
      },
    ];

    Todos.create(seedTodos)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log(err);
      });

    // LỖI --> từ phiên bản mongoose 6.x.x trowtr xuống mới dùng được callback trở lên thì dùng promise như trên.
    //   Todos.create(seedTodos, function(err,results) {
    //     res.send(results);
    //   });
  });
};
