import 'angular'
import 'angular-ui-router'
import config  from './config.js'

let moduleName = 'showcase';

console.log('Creating module');

angular.module(moduleName, ['ui.router', 'showcaseTemplates'])
.config(config);

export default moduleName;
