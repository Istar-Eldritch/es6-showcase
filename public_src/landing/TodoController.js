
function TodoController($scope) {

  console.log('TodoController loaded');

  $scope.todos = [
    'Carrots',
    'Potatoes'
  ];

  $scope.remove = function remove(index) {
    $scope.todos.splice(index);
  };

  $scope.add = function add() {
    if ($scope.toinsert && $scope.toinsert.length > 0) {
      $scope.todos.push($scope.toinsert);
      $scope.toinsert = '';
    }
  };
}

TodoController.$inject = ['$scope'];

export default TodoController;
