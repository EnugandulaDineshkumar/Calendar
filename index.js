
// Step 1: Display the Month
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Step 2: Initialize current date variables
let currentDate = new Date();
let currentMonth = currentDate.getMonth(); // 0-based index
let currentYear = currentDate.getFullYear();

// Step 3: Get DOM elements
const monthYearDisplay = document.getElementById('month-year');
const datesContainer = document.getElementById('dates');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Step 4: Creating the core calendar rendering function
function renderCalendar(month, year) {
    // 4.1 Calculate calendar metrics
    
    // Get the day of the week for the 1st day (0=Sun, 6=Sat). This determines placeholders.
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Get the total number of days in the month (by asking for day 0 of the next month)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get today's date for highlighting
    const today = new Date();
    const isCurrentMonthYear = month === today.getMonth() && year === today.getFullYear();
    const todayDate = today.getDate();

    // 4.2 Update the header
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
    
    // 4.3 Clear previous dates
    datesContainer.innerHTML = '';

    // 4.4 Create placeholder empty divs for days before the 1st
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        // No text content needed, CSS will handle the styling of the empty slot
        datesContainer.appendChild(emptyDiv);
    }

    // 4.5 Create and fill in the dates of the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = day; 

        // Check if the current day should be highlighted as 'today'
        if (isCurrentMonthYear && day === todayDate) {
            dateDiv.classList.add('today'); 
        }

        datesContainer.appendChild(dateDiv);
    } 
}

// Step 5: Event listeners for navigation
prevButton.addEventListener('click', () => {
    currentMonth--; 
    if (currentMonth < 0) { 
        currentMonth = 11; // Wrap to December
        currentYear--;     // Decrement the year
    }
    renderCalendar(currentMonth, currentYear); 
});

nextButton.addEventListener('click', () => {
    currentMonth++; 
    if (currentMonth > 11) { 
        currentMonth = 0; // Wrap to January
        currentYear++;    // Increment the year
    }
    renderCalendar(currentMonth, currentYear); 
});

// Step 6: Initial render of the calendar
renderCalendar(currentMonth, currentYear);