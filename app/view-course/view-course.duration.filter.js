import angular from 'angular';

export default function durationFilter() {
  return function (duration) {
    const hours = Math.floor(duration/60);
    const minutes = duration%60;
    return `${hours || ''} ${hours ? 'h' : ''} ${minutes || ''} ${minutes ? 'm' : ''}`;
  };
}

