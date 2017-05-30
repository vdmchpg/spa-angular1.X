import angular from 'angular';

export default function coursesFilter() {
  return function (items, letters) {
    let filtered = [];
    if (letters) {
      let testString = new RegExp(letters, 'i');
      filtered = items.filter(course => {
        return testString.test(course.title);
      });
    } else {
      filtered = [...items];
    }

    return filtered;
  };
}

