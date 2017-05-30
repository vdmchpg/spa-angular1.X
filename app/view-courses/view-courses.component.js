import templateUrl from './view-courses.tpl.html';
import CoursesCtrl from './view-courses.controller';


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
  controller: CoursesCtrl,
  bindings: {
    searchField: '<'
  },
  controllerAs: 'ctrl'
};
