import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const textArea = form.querySelector('textarea');
const localStorageKey = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};
savedTextArea();

form.addEventListener('submit', onFormSubmit);
form.addEventListener(
  'input',
  throttle(evt => {
    formData[evt.target.name] = evt.target.value;
    const stringData = JSON.stringify(formData);
    localStorage.setItem(localStorageKey, stringData);
  }, 500)
);

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  localStorage.removeItem(localStorageKey);
  formData.email = '';
  formData.message = '';
  form.reset();
}

function savedTextArea() {
  const savedMessage = localStorage.getItem(localStorageKey);

  if (savedMessage) {
    const parsedData = JSON.parse(savedMessage);
    emailInput.value = parsedData.email;
    textArea.value = parsedData.message;
  }
}
