const agendaSection = document.getElementById('agenda');

const eventForm = document.createElement('form');
eventForm.innerHTML = `
    <h2>Crear Evento</h2>
    <label>Fecha: <input type="date" id="event-date"></label>
    <label>Hora: <input type="time" id="event-time"></label>
    <label>Descripción: <input type="text" id="event-description"></label>
    <label>Recordatorio: <input type="checkbox" id="event-reminder"></label>
    <button type="button" onclick="addEvent()">Agregar Evento</button>
`;

const eventList = document.createElement('div');
eventList.innerHTML = `<h2>Lista de Eventos</h2><ul id="event-list"></ul>`;

agendaSection.appendChild(eventForm);
agendaSection.appendChild(eventList);

function addEvent() {
    const event = {
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        description: document.getElementById('event-description').value,
        reminder: document.getElementById('event-reminder').checked
    };
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
    displayEvents();
}

function displayEvents() {
    const eventListElement = document.getElementById('event-list');
    eventListElement.innerHTML = '';
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = `${event.date} ${event.time} - ${event.description} ${event.reminder ? '(Recordatorio)' : ''}`;
        eventListElement.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', displayEvents);