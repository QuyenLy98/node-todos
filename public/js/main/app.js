var app = angular.module('app.todos', ['xeditable']);
app.controller('todoController', [
  '$scope',
  'svTodos',
  function ($scope, svTodos) {
    $scope.appName = 'Todo Dashboard';
    $scope.formData = {};
    $scope.todos = [];
    $scope.loading = true;

    //load data from api
    svTodos.get().then(function (data) {
      $scope.todos = data.data;
      $scope.loading = false;
    });

    $scope.createTodo = function () {
      $scope.loading = true;
      var todo = {
        text: $scope.formData.text,
        isDone: false,
      };

      svTodos.create(todo).then(function (data) {
        $scope.todos = data.data;
        $scope.formData.text = '';
        $scope.loading = false;
      });
    };

    $scope.updateTodo = function (todo) {
      console.log('Update todo: ', todo);
      $scope.loading = true;
      svTodos.update(todo._id, todo).then(function (data) {
        $scope.todos = data.data;
        $scope.loading = false;
      });
    };

    $scope.deleteTodo = function (todo) {
      console.log('Delete todo: ', todo);
      $scope.loading = true;
      svTodos.delete(todo._id).then(function (data) {
        $scope.todos = data.data;
        $scope.loading = false;
      });
    };
  },
]);
