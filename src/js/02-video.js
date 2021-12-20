import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const CURRENT_TIME_KEY = 'videoplayer-current-time';

function videoStart(seconds) {
  let time = seconds;
  console.log('second', time);
  localStorage.setItem(CURRENT_TIME_KEY, JSON.stringify(time));
}

player.on('timeupdate', throttle(videoStart, 1000));

let savedCurrentTime = JSON.parse(localStorage.getItem(CURRENT_TIME_KEY)) || 0;
console.log('savedCurrentTime', savedCurrentTime);
let savedSecond = savedCurrentTime.seconds || 0;

player.setCurrentTime(savedSecond);
