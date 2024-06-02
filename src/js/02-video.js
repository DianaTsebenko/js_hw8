import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';
const savedTime = localStorage.getItem(STORAGE_KEY);

console.log(savedTime);
if (savedTime) {
  player.setCurrentTime(savedTime).catch(error => {
    console.error('Error setting current time:', error);
  });
}

player.on(
  'timeupdate',
  throttle(time => {
    localStorage.setItem(STORAGE_KEY, time.seconds);
  }, 1000)
);
