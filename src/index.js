import './styles.css';
import Controller from './modules/controller';

const controller = new Controller();
controller.render("New Delhi");

const formElement = document.getElementById("search-form")
formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const location = formData.get("searched-location")
    controller.render(location);
});


