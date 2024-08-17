// elements
const calendarContainer = document.querySelector('.calendar-cont');
const calendarHeader = document.querySelector('.calendar-header');
const calendarBody = document.querySelector('.calendar-body');
const eventForm = document.querySelector('.event-form');
const eventList = document.querySelector('.event-list');
const prevMonthButton = document.querySelector('#prev-month');
const nextMonthButton = document.querySelector('#next-month');
const currentMonthSpan = document.querySelector('#current-month');
const calendarTable = document.querySelector('#calendar-table');
const calendarBodyTbody = document.querySelector('#calendar-body');
const eventDetails = document.querySelector('#event-details')

// Initialize variables
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = [];

// Function to render calendar
function renderCalendar() {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // previous calendar data
  calendarBodyTbody.innerHTML = '';

  // table rows and cells
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      row.appendChild(cell);
    }
    calendarBodyTbody.appendChild(row);
  }

  // calendar data
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const dayOfWeek = date.getDay();
    const cell = calendarBodyTbody.rows[startingDayOfWeek + Math.floor((i - 1) / 7)].cells[dayOfWeek];
    cell.textContent = i;
    cell.dataset.date = date.toISOString().split('T')[0];

    // events to calendar
    events.forEach((event) => {
      if (event.date === cell.dataset.date) {
        const eventElement = document.createElement('div');
        eventElement.textContent = event.title;
        eventElement.className = 'event';
        cell.appendChild(eventElement);
      }
    });
  }

  // Update current month display
  currentMonthSpan.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
}

// Function to get month name
function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
}

// Function to handle prev/next month buttons
function handleMonthChange(direction) {
  if (direction === 'prev') {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
  } else if (direction === 'next') {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  }
  renderCalendar();
}

// Function to handle event form submission
function handleEventFormSubmission(event) {
  event.preventDefault();
  const title = document.querySelector('#event-title').value;
  const date = document.querySelector('#event-date').value;
  const time = document.querySelector('#event-time').value;
  const eventDetails = document.querySelector('#event-details').value;
  const newEvent = { title, date, time, eventDetails };
  events.push(newEvent);
  renderEventList();
  document.querySelector('#event-form').reset();
}

// Function to render event list
function renderEventList() {
  eventList.innerHTML = '';
  events.forEach((event) => {
    const eventElement = document.createElement('li');
    eventElement.textContent = `${event.title} - ${event.date} ${event.time}`;
    eventList.appendChild(eventElement);
  });
}

// Add event listeners
prevMonthButton.addEventListener('click', () => handleMonthChange('prev'));
nextMonthButton.addEventListener('click', () => handleMonthChange('next'));
eventForm.addEventListener('submit', handleEventFormSubmission);

// Initialize calendar
renderCalendar();
renderEventList();