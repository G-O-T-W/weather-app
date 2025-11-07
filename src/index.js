import './styles.css';
import Controller from './modules/controller';

const controller = new Controller();
controller.query = 'New Delhi'; // Default
controller.render();

const formElement = document.getElementById('search-form');
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement);
  const location = formData.get('searched-location');
  controller.query = location;
  controller.render();
});

const toggleButton = document.getElementById('toggle-btn');
toggleButton.addEventListener('click', controller.toggleButtonHandler.bind(controller));

const nextSlide = document.querySelector('.next');
nextSlide.addEventListener('click', controller.nextButtonHandler.bind(controller));

const prevSlide = document.querySelector('.prev');
prevSlide.addEventListener('click', controller.prevButtonHandler.bind(controller));