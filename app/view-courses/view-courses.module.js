import angular from 'angular';

import component from './view-courses.component';
import coursesService from './view-courses.service'
import coursesFilter from './view-courses.filter'
import durationFilter from '../view-course/view-course.duration.filter'

import './view-courses.less';

/**
 * @ngdoc overview
 * @name cdpLogin
 *
 * @description
 * Hold component for generating main layout
 */
export default angular.module('cdpViewCourses', [])

  .config(/*@ngInject*/($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('app.courses', {
        url: '/courses',
        component: 'cdpCoursesComponent'
      });
  })
  .component('cdpCoursesComponent', component)
  .factory('coursesFct', coursesService)
  .filter('coursesFilter', coursesFilter)
  .filter('durationFilter', durationFilter)
  .name;
