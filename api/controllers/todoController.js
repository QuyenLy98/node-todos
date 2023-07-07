var Todos = require('../models/todoModel');

function getTodos(res) {
  Todos.find()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

module.exports = function (app) {
  // get all todos
  app.get('/api/todos', function (req, res) {
    getTodos(res);
  });

  // Search from id Ex: api/todo/123456
  app.get('/api/todo/:id', function (req, res) {
    Todos.findById({ _id: req.params.id })
      .then((todo) => {
        res.json(todo);
      })
      .catch((err) => {
        throw err;
      });
  });

  // Create a todo
  app.post('/api/todo', function (req, res) {
    var todo = {
      text: req.body.text,
      isDone: req.body.isDone,
    };

    Todos.create(todo)
      .then((todo) => {
        getTodos(res);
      })
      .catch((err) => {
        throw err;
      });
  });

  // Update a todo
  app.put('/api/todo', function (req, res) {
    if (!req.body._id) {
      return res.status(500).send('ID is required');
    } else {
      Todos.updateOne(
        { _id: req.body._id },
        { text: req.body.text, isDone: req.body.isDone }
      )
        .then((todo) => {
          getTodos(res);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  });

  // Delete a todo
  app.delete('/api/todo/:id', function (req, res) {
    Todos.deleteOne({
      _id: req.params.id,
    })
      .then((todo) => {
        getTodos(res);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
};
