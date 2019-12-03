const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const firstMessage = document.querySelector('#message1');
const secondMessage = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    firstMessage.textContent = 'Your query is loading';
    secondMessage.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                firstMessage.textContent = data.error;
            } else {
                firstMessage.textContent = data.location;
                secondMessage.textContent = data.forecast;
            }
        })
    })
})