import angular    from 'angular';
import ngResource from 'angular-resource';

import UserService from './user.service';

export default angular.module('user', [ //eslint-disable-line angular/file-name
  ngResource
])
  .factory('UserFct', UserService)
  .name;
