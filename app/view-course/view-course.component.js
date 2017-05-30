import templateUrl from './view-course.tpl.html';
import CourseCtrl from './view-course.controller';


/**
 * @ngdoc directive
 * @name cdpLogin.cdpLoginLayout
 *
 * @scope
 *
 * @description
 * Component to render login layout
 */
export default {
  templateUrl,
  controller: CourseCtrl,
  controllerAs: 'ctrl'
};
