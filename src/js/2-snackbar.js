import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector("[name='delay']");
form.addEventListener('submit', onFormSubmit);

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve({ delay });
      } else {
        reject({ delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  const delayBeforCheck = Number(delayInput.value);
  if (delayBeforCheck <= 0 || delayBeforCheck === null) {
    iziToast.error({
      title: 'Error',
      titleColor: '#FFFFFF',
      timeout: 4000,
      message: `Delay should be a positive number`,
      position: 'topRight',
      backgroundColor: 'rgba(239, 64, 64, 0.99)',
      messageColor: '#FFFFFF',
      icon: '',
      close: false,
    });
    return;
  }
  const radioChecked = form.querySelector('input[name="state"]:checked');
  if (radioChecked === null) {
    iziToast.error({
      title: 'Error',
      titleColor: '#FFFFFF',
      timeout: 4000,
      message: `Choose a state please`,
      position: 'topRight',
      backgroundColor: 'rgba(239, 64, 64, 0.99)',
      messageColor: '#FFFFFF',
      icon: '',
      close: false,
    });
    return;
  }
  const state = radioChecked.value
  const delay = Number(delayInput.value);
  createPromise(delay, state)
    .then(({ delay }) => {
      iziToast.success({
        title: 'OK',
        titleColor: '#FFFFFF',
        timeout: 4000,
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'rgba(89, 161, 13, 0.99)',
        messageColor: '#FFFFFF',
        icon: '',
        close: false,
      });
    })
    .catch(({ delay }) => {
      iziToast.error({
        title: 'Error',
        titleColor: '#FFFFFF',
        timeout: 4000,
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'rgba(239, 64, 64, 0.99)',
        messageColor: '#FFFFFF',
        icon: '',
        close: false,
      });
    });
  event.currentTarget.reset();
}
