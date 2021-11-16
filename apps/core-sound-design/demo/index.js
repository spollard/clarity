import '@cds/core/button/register';
import { ClarityIcons, userIcon } from '@cds/core/icon';

ClarityIcons.addIcons(userIcon);
import { ClarityAudio } from '@cds/core/audio';
import { yesSound } from '@cds/core/audio/sounds/yes.js';
import { noSound } from '@cds/core/audio/sounds/no.js';
import { doneSound } from '@cds/core/audio/sounds/done.js';

ClarityAudio.add(...yesSound);
ClarityAudio.add(...noSound);
ClarityAudio.add(...doneSound);

const successButton = document.querySelector('#success');
const errorButton = document.querySelector('#error');
const questionButton = document.querySelector('#question');
const eventButton = document.querySelector('#event');

successButton.addEventListener('click', () => {
  playAudio('success');
});
errorButton.addEventListener('click', () => {
  playAudio('error');
});
questionButton.addEventListener('click', () => {
  playAudio('question');
});
eventButton.addEventListener('click', () => {
  playAudio('event');
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const success = 900;
const error = 300;
const question = 600;
const event = 2500;

function playAudio(sound) {
  console.log('sounding: ', sound);
  let frequency;
  const osc = audioCtx.createOscillator();
  osc.type = 'sine';

  switch (sound) {
    case 'success':
      frequency = success;
      break;
    case 'error':
      frequency = error;
      break;
    case 'question':
      frequency = question;
      break;
    case 'event':
      frequency = event;
      break;
    default:
  }

  osc.frequency.value = frequency;

  const volume = audioCtx.createGain();
  volume.gain.setValueAtTime(0.1, 0);

  if (sound === 'error') {
    osc.frequency.setValueAtTime(
      frequency / Math.pow(3.5, 1 / 12),
      audioCtx.currentTime + 0.1
    );
    osc.frequency.setValueAtTime(
      frequency / Math.pow(3.5, 2 / 12),
      audioCtx.currentTime + 0.2
    );
  } else if (sound === 'success') {
    volume.gain.setValueAtTime(0.1, 0.1);
    osc.frequency.setValueAtTime(
      frequency * Math.pow(3.5, 1 / 12),
      audioCtx.currentTime + 0.1
    );
    osc.frequency.setValueAtTime(
      frequency * Math.pow(3.5, 2 / 12),
      audioCtx.currentTime + 0.2
    );
  } else if (sound === 'question') {
    osc.frequency.setValueAtTime(
      frequency / Math.pow(7, 1 / 12),
      audioCtx.currentTime + 0.1
    );
    osc.frequency.setValueAtTime(
      frequency * Math.pow(3.5, 2 / 12),
      audioCtx.currentTime + 0.2
    );
  } else {
    osc.frequency.setValueAtTime(0, audioCtx.currentTime + 0.1);
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime + 0.2);
  }

  osc.connect(volume);
  osc.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

// Use @cds/core/audio
const cdsDone = document.querySelector('#cds-done');
const cdsNo = document.querySelector('#cds-no');
const cdsYes = document.querySelector('#cds-yes');

cdsDone.addEventListener('click', () => {
  ClarityAudio.play('done');
});
cdsNo.addEventListener('click', () => {
  ClarityAudio.play('no');
});
cdsYes.addEventListener('click', () => {
  ClarityAudio.play('yes');
});