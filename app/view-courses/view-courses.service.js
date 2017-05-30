import angular from 'angular';

export default /*@ngInject*/$injector => { //eslint-disable-line max-statements
  const $resource = $injector.get('$resource');
  const coursesService = $resource('app/courses/:id', {id:'@id'}, {
    getCourses: {
      isArray: true,
      method: 'GET',
    },
    deleteCourse: {
      method: 'DELETE'
    }
  });

  return coursesService;
};
