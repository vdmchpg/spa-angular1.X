/**
 * @ngdoc controller
 *
 * @class
 * @description
 * Controller for Courses component
 */

export default class CoursesCtrl {
  /*@ngInject*/
  constructor(coursesFct, cdpModalsFct, $state, $filter, $transitions) {
    this.coursesFct = coursesFct;
    this.cdpModalsFct = cdpModalsFct;
    this.state = $state;
    this.courses = [];
    this.filter = $filter('coursesFilter');
    this.transitions = $transitions;
  }

  $onInit() {
    this.getCourses();
    this.breadcrumbs = [{name: 'Courses', state: 'app.courses'}];

    this.transitions.onSuccess({to:'app.courses'}, () => {
      this.getCourses();
    });
  }

  getCourses () {
    this.coursesFct.getCourses()
      .$promise
      .then((data) => {
        this.courses = angular.fromJson(data);
        this.filteredCourses = [...this.courses];
      });
  }

  filterCourses () {
    this.filteredCourses = this.filter(this.courses, this.searchField);
  }

  deleteCourse(id) {
    this.coursesFct.deleteCourse({id:id})
      .$promise
      .then((data) => {
        if (data.success) {
          const idx = this.courses.findIndex((item) => {
            return +item.id === +id;
          });

          if (idx > -1) {
            this.cdpModalsFct.open({
              onSubmit: () => {
                this.courses.splice (idx, 1);
                this.filterCourses();
              },
              title: 'Remove Course',
              message: `Do you want to delete "${this.courses[idx].title}" course?`
            });
          }
        }
      });
  }
}
