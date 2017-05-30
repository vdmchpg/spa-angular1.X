/**
 * @ngdoc controller
 *
 * @class
 * @description
 * Controller for Courses component
 */

export default class CourseCtrl {
  /*@ngInject*/
  constructor(courseFct, cdpModalsFct, AuthorsFct, $state) {
    this.courseFct = courseFct;
    this.cdpModalsFct = cdpModalsFct;
    this.AuthorsFct = AuthorsFct;
    this.state = $state;
    this.course = {id: '', title: '', description: '', date: '', duration: '', authors: []};
    this.authors = [];
    this.filteredCourseAuthors = [];
}


  $onInit() {
    if (this.state.params.id) {
      this.getCourse(this.state.params.id);
    } else {
      this.breadcrumbs = [{name: 'Courses', state: 'app.courses'}, {name: 'New', state: 'app.courses.new'}];
    }

    this.getAuthors();
  }

  filterAuthors (courseAuthors, allAuthors, includes = false) {
    return allAuthors.filter((item) => includes ? courseAuthors.includes(item.name) : !courseAuthors.includes(item.name))
  }

  getAuthors() {
    this.AuthorsFct.getAuthors()
      .$promise
      .then((data) => {
        this.authors = this.filterAuthors(this.course.authors, data );
      });
  }


  addAuthors () {
    this.authors.forEach((item) => {
      if(item.isSelected) {
        this.filteredCourseAuthors.push(item);
      }
    });

    this.course.authors = this.filteredCourseAuthors.map(item => item.name);
    this.authors = this.filterAuthors(this.course.authors, this.authors);
  }

  removeAuthors () {
    this.course.authors =[];
    this.filteredCourseAuthors.forEach((item) => {
      item.isSelected ? this.authors.push(item) : this.course.authors.push(item.name);
    });

    this.filteredCourseAuthors = this.filterAuthors(this.course.authors, this.filteredCourseAuthors, true);
    this.authors = this.filterAuthors(this.course.authors, this.authors);
  }

  toggleSelected(item) {
    item.isSelected = !item.isSelected;
  }

  getCourse (id) {
    this.courseFct.getCourse({id:id})
      .$promise
      .then((data) => {
        this.course = angular.fromJson(data);
        this.course.date = new Date(this.course.date);
        this.breadcrumbs = [{name: 'Courses', state: 'app.courses'}, {name: this.course.title, state: 'app.courses.course'}];
        this.course.authors.forEach(item => {
          this.filteredCourseAuthors.push({name: item, isSelected: false})
        });
      });
  }

  updateCourse (id, course) {
    this.cdpModalsFct.open({
      onSubmit: () => {
        this.courseFct.updateCourse({id:id}, course)
          .$promise
          .then((data) => {
            if (data.success) {
              this.state.go('app.courses');
            }
          });
      },
      title: 'Update Course',
      message: `Do you want to update "${course.title}" course?`
    });
  }

  goToCourses () {
    this.state.go('app.courses')
  }
}


