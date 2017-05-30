import angular         from 'angular';

import modelUser  from './user';
import modelAuthors  from './authors';

/**
 * @ngdocs overview
 * @name appModels
 *
 * @description
 * Module for holding models
 */
export default angular.module('appModels', [
  modelUser,
  modelAuthors,
])

  .name;
