import angular from 'angular';
import 'angular-mocks/angular-mocks';

const validCredentials = {
  login: 'vadym',
  password: 'chepiga'
};

const authors = ['Author 1', 'Author 2', 'Author 3', 'Author 4', 'Author 5'];

const coursesMock = [
  {
    id: 1,
    title: 'Angular 1.X',
    date: 1487714400000,
    duration: 90,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi nisl, sollicitudin non sapien congue, ultrices tristique metus.',
    authors: ['Author 1']
  },
  {
    id: 2,
    title: 'How to make angular CDP in time',
    date: 1487800800000,
    duration: 105,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi nisl, sollicitudin non sapien congue, ultrices tristique metus.',
    authors: ['Author 2']
  },
  {
    id: 3,
    title: 'TypeScript is awesome',
    date: 1487887200000,
    duration: 75,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi nisl, sollicitudin non sapien congue, ultrices tristique metus.',
    authors: ['Author 3']
  },
  {
    id: 4,
    title: 'Semantic Markup',
    date: 1487973600000,
    duration: 130,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi nisl, sollicitudin non sapien congue, ultrices tristique metus.',
    authors: ['Author 4']
  },
  {
    id: 5,
    title: 'How to make BEM',
    date: 1487973600000,
    duration: 230,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi nisl, sollicitudin non sapien congue, ultrices tristique metus.',
    authors: ['Author 5']
  }
];

export default angular.module('fakeBE', ['ngMockE2E']).run(/*@ngInject*/$httpBackend => {
  $httpBackend.whenPOST('app/login').respond((method, url, data) => {
    const user = JSON.parse(data);
    const status = user.login === validCredentials.login && user.password === validCredentials.password ? {
        status: 'success',
        login: user.login
      } : {status: 'invalidCredentials'};
    return [200, status, {}];
  });

  $httpBackend.whenGET('app/courses').respond(() => {
    const courses = JSON.stringify(coursesMock);
    return [200, courses, {}];
  });

  $httpBackend.whenGET('app/courses/authors').respond(() => {
    const authorsArr = JSON.stringify(authors);
    return [200, authorsArr, {}];
  });

  $httpBackend.whenDELETE(/app\/courses\/(.+)/, undefined, ['id']).respond((method, url, data, headers, params) => {
    const idx = coursesMock.findIndex((item) => {
      return +item.id === +params.id;
    });

    if (idx > -1) {
      coursesMock.splice(idx, 1);
      return [200, {success: true}, {}];
    } else {
      return [500, {success: false}, {}];
    }
  });

  $httpBackend.whenGET(/app\/courses\/(.+)/, undefined, ['id']).respond((method, url, data, headers, params) => {
    const idx = coursesMock.findIndex((item) => {
      return +item.id === +params.id;
    });

    if (idx > -1) {
      const course = JSON.stringify(coursesMock[idx]);
      return [200, course, {}];
    } else {
      return [500, {success: false}, {}];
    }
  });

  $httpBackend.whenPOST(/app\/courses\/(.+)/, undefined, undefined, ['id']).respond((method, url, data, headers, params) => {
    const idx = coursesMock.findIndex((item) => {
      return +item.id === +params.id;
    });

    if (idx > -1) {
      coursesMock[idx] = JSON.parse(data);
      return [200, {success: true}, {}];
    } else {
      return [500, {success: false}, {}];
    }
  });

  $httpBackend.whenPOST('app/courses').respond((method, url, data, headers, params) => {
    const course = JSON.parse(data);
    course.id = coursesMock.length;
    coursesMock.push(course);
    return [200, {success: true}, {}];
  });
})
  .name;

