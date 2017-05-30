import angular from 'angular';

import './styles';

import layouts from './layouts';
import models from  './models'
import modals from  './modals'


export default angular.module('cdpCommon', [
  layouts,
  models,
  modals
])
  .name;
