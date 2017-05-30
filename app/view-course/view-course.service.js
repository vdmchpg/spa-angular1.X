import angular from 'angular';

export default /*@ngInject*/$injector => { //eslint-disable-line max-statements
  const $resource = $injector.get('$resource');
  const courseService = $resource('app/courses/:id', null, {
    getCourse: {
      method: 'GET',
    },
    updateCourse: {
      method: 'POST',
    }
  });

  return courseService;
};
