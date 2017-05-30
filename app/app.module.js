import angular from 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';

import fakeBE from './runFakeBackend';

import commonModule from './components';
import cdpViewLogin from './view-login';
import cdpViewCourses from './view-courses';
import cdpViewCourse from './view-course';

export default angular.module('cdpApp', [
  'ui.router',
  'ui.bootstrap',
  fakeBE,
  commonModule,
  cdpViewLogin,
  cdpViewCourses,
  cdpViewCourse,
])

  .config(/*@ngInject*/($locationProvider, $stateProvider, $urlRouterProvider) => {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        template: '<ui-view></ui-view>'
      });
    $urlRouterProvider.otherwise('/login');
  })
  .run(/*@ngInject*/($transitions, UserFct) => {
    $transitions.onStart({to: 'app.**'}, function (trans) {
      UserFct.setRedirectState(trans.targetState().name(), trans.targetState().params());
      if (!UserFct.user) {
        // User isn't authenticated. Redirect to a new Target State
        return trans.router.stateService.target('login');
      }
    });
  })
  .name;
