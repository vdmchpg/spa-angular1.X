import angular from 'angular';

export default /*@ngInject*/$injector => { //eslint-disable-line max-statements
  const $resource = $injector.get('$resource');
  const AuthorsService = $resource('app/courses/authors', null, {
    getAuthors: {
      isArray: true,
      method: 'GET',
      transformResponse: data =>
        angular.fromJson(data).map((item) => ({name: item, isSelected: false}))
    }
  });

  return AuthorsService;
};

