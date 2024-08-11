const holidays2024 = [
    { start: "01-26", end: "01-26", label: "Republic Day" },
    { start: "02-14", end: "02-14", label: "Basanta Panchami" },
    { start: "03-05", end: "03-05", label: "Panchayati Raj Diwas" },
    { start: "03-08", end: "03-08", label: "Maha Shivaratri" },
    { start: "03-26", end: "03-26", label: "Holi" },
    { start: "03-29", end: "03-29", label: "Good Friday" },
    { start: "04-01", end: "04-01", label: "Utkal Divas" },
    { start: "04-11", end: "04-11", label: "Id-ul-Fitre" },
    { start: "04-17", end: "04-17", label: "Ram Navami" },
    { start: "06-17", end: "06-17", label: "Id-ul-Juha" },
    { start: "07-17", end: "07-17", label: "Muharram" },
    { start: "08-15", end: "08-15", label: "Independence Day" },
    { start: "08-26", end: "08-26", label: "Janmastami" },
    { start: "09-16", end: "09-16", label: "Birthday of Prophet Mohammad" },
    { start: "10-02", end: "10-02", label: "Gandhi Jayanti" },
    { start: "10-10", end: "10-16", label: "Durga Puja" }, // Example range
    { start: "10-31", end: "10-31", label: "Kalipuja & Diwali" },
    { start: "11-15", end: "11-15", label: "Kartika Purnima / Guru Nanak’s Birthday" },
];

const specialDates2024 = [
    { start: "07-22", end: "07-22", label: "Reporting/Registration/Academic Induction/Sharing of Academic Vision" },
    { start: "07-23", end: "09-14", label: "Pre-Mid Semester Session" },
    { start: "09-17", end: "09-21", label: "Mid-Semester Examination" }, // Example range
    { start: "09-23", end: "11-16", label: "Post-Mid Semester Session" },
    { start: "11-18", end: "11-21", label: "Sessional/Practical/Project/Thesis Exam" },
    { start: "11-22", end: "11-30", label: "End Semester Examination" },
    { start: "12-01", end: "12-07", label: "Starting of the Spring Semester" },
];

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = 7; // August
let currentYear = 2024;

function generateCalendar(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysContainer = document.querySelector(".days");
    const monthYearText = document.getElementById("monthYear");
    const tooltip = document.getElementById("tooltip");

    daysContainer.innerHTML = ""; // Clear existing days

    // Set month and year
    monthYearText.innerHTML = `${monthNames[month]} ${year}`;

    // Adding blank spaces for days before the first day of the month
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        daysContainer.innerHTML += `<div></div>`;
    }

    // Adding days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        let isHoliday = "";
        let isSunday = new Date(year, month, day).getDay() === 0 ? "sunday" : "";
        let isHighlight = "";

        holidays2024.forEach(holiday => {
            if (isDateInRange(date, holiday.start, holiday.end)) {
                isHoliday = "holiday";
            }
        });

        specialDates2024.forEach(specialDate => {
            if (isDateInRange(date, specialDate.start, specialDate.end)) {
                isHighlight = "highlight";
            }
        });

        daysContainer.innerHTML += `<div class="${isHoliday} ${isSunday} ${isHighlight}" data-holiday="${getLabelForDate(date, holidays2024)}" data-special="${getLabelForDate(date, specialDates2024)}">${day}</div>`;
    }

    // Add click event listener to show tooltip
    document.querySelectorAll('.days div').forEach(dayDiv => {
        dayDiv.addEventListener('click', function(event) {
            const holidayName = this.dataset.holiday;
            const specialDate = this.dataset.special;

            if (this.classList.contains('holiday') && holidayName) {
                tooltip.innerHTML = holidayName;
                tooltip.style.display = 'block';
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            } else if (this.classList.contains('highlight') && specialDate) {
                tooltip.innerHTML = specialDate;
                tooltip.style.display = 'block';
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            } else {
                tooltip.style.display = 'none';
            }
        });
    });
}

function changeMonth(change) {
    currentMonth += change;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

function isDateInRange(date, start, end) {
    return date >= start && date <= end;
}

function getLabelForDate(date, datesArray) {
    for (let i = 0; i < datesArray.length; i++) {
        if (isDateInRange(date, datesArray[i].start, datesArray[i].end)) {
            return datesArray[i].label;
        }
    }
    return null;
}

// Hide tooltip when clicking outside of calendar days
document.addEventListener('click', function(event) {
    const tooltip = document.getElementById('tooltip');
    if (!event.target.closest('.days div')) {
        tooltip.style.display = 'none';
    }
});

generateCalendar(currentMonth, currentYear);
