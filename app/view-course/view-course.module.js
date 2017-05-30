import angular from 'angular';

import component from './view-course.component';
import courseService from './view-course.service';
import durationFilter from './view-course.duration.filter';

import './view-course.less';

/**
 * @ngdoc overview
 * @name cdpLogin
 *
 * @description
 * Hold component for generating main layout
 */
export default angular.module('cdpViewCourse', [])

  .config(/*@ngInject*/($stateProvider) => {
    $stateProvider
      .state('app.courses.new', {
        url: '/new',
        component: 'cdpCourseComponent'
      })
      .state('app.courses.course', {
        url: '/:id',
        params: {id: ''},
        component: 'cdpCourseComponent'
      });
  })
  .component('cdpCourseComponent', component)
  .factory('courseFct', courseService)
  .filter('durationFilter', durationFilter)
  .name;
