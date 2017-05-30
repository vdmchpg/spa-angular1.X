import angular from 'angular';

import component from './view-login.component';
import loginService from './view-login.service'

import './view-login.less';

/**
 * @ngdoc overview
 * @name cdpLogin
 *
 * @description
 * Hold component for generating main layout
 */
export default angular.module('cdpViewLogin', ['ngResource'])

  .config(/*@ngInject*/($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('login', {
        url: '/login',
        component: 'cdpLoginComponent'
      });
    //$urlRouterProvider.otherwise('/app/login');
  })
  .component('cdpLoginComponent', component)
  .factory('loginFct', loginService)
  .name;
