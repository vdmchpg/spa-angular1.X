import angular    from 'angular';
import ngResource from 'angular-resource';

import AuthorsService from './authors.service';

export default angular.module('authors', [ //eslint-disable-line angular/file-name
  ngResource
])
  .factory('AuthorsFct', AuthorsService)
  .name;
