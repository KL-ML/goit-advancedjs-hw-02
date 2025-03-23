const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = { email: '', message: '' };

populateInputData();

form.addEventListener('input', setInputDataToLocalStorage);
form.addEventListener('submit', onSubmitForm);

function setInputDataToLocalStorage(event) {
  const {
    elements: { email, message },
  } = event.target.form;
  const formData = { email: email.value.trim(), message: message.value.trim() };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onSubmitForm(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.target;
  const formData = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
  if (
    formData.email !== '' &&
    formData.message !== ''
  ) {
    console.log(formData);
    evt.target.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
  } else {
      alert('Fill please all fields');
  }
  
}

function populateInputData() {
  const inputValue = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (inputValue) {
    form.elements.email.value = inputValue.email;
    form.elements.message.value = inputValue.message;
  }
}
