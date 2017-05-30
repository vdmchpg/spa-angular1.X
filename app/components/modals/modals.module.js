import angular from 'angular';

import ModalsService from './modals.service';

import './modals.less';

/**
 * @ngdocs overview
 * @name osmModals
 *
 * @description
 * Module for modals
 */
export default angular.module('cdpModals', [ //eslint-disable-line angular/file-name
])
  .factory('cdpModalsFct', ModalsService)
  .name;
