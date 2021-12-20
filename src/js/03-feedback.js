import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

const STORAGE_KEY = 'feedback-form-data';
let feedbackFormData = {};

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  if (localStorage.getItem(STORAGE_KEY)) {
    feedbackFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
  feedbackFormData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
}

function populateTextarea() {
  const savedFeedbackFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  // const savedMessage = savedFeedbackFormData.message;
  // const saveEmail = savedFeedbackFormData.email;

  if (savedFeedbackFormData) {
    if (savedFeedbackFormData.email) {
      // console.log(savedFeedbackFormData.email);
      refs.email.value = savedFeedbackFormData.email;
    }

    if (savedFeedbackFormData.message) {
      // console.log(savedFeedbackFormData.message);
      refs.textarea.value = savedFeedbackFormData.message;
    }
  }
}
