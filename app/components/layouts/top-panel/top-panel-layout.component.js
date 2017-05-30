import controller  from './top-panel-layout.controller';
import templateUrl from './top-panel-layout.tpl.html';
import './top-panel.less';


/**
 * @ngdoc directive
 * @name cdpLayouts.pkmFooter
 * @scope
 *
 * @description Footer layout component
 */
export default {
  templateUrl,
  controller,
  bindings: {
    breadcrumbs: '<'
  },
  controllerAs: 'ctrl'
};
