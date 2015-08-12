
import TodoController from './landing/TodoController';

function config($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('landing', {
    url: '/',
    controller: TodoController,
    templateUrl: '/landing/landing.html'
  });

}

config.$inject = [
  '$stateProvider',
  '$urlRouterProvider'
];

export default config;
