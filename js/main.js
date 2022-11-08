const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const showDatepicker = document.getElementById("show-datepicker");
//////////////////////////////////////////////////////////////////
let selectedDate = new Date();
let selectedDay = new Date().getDate();
//////////////////////////////////////////////////////////////////
let eventCountdown = function () {
  let countDown = setInterval(() => {
    let dateNow = new Date().getTime();
    let dateFromSelected = selectedDate - dateNow;
    let days = parseInt(dateFromSelected / (1000 * 60 * 60 * 24));
    let hours = parseInt(
      (dateFromSelected % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = parseInt((dateFromSelected % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = parseInt((dateFromSelected % (1000 * 60)) / 1000);
    daysElement.innerText = days;
    hoursElement.innerText = hours;
    minutesElement.innerText = minutes;
    secondsElement.innerText = seconds;
    if (dateFromSelected < 0) {
      clearInterval(countDown);
      daysElement.innerText = 0;
      hoursElement.innerText = 0;
      minutesElement.innerText = 0;
      secondsElement.innerText = 0;
    }
  }, 1000);
};
//////////////////////////////////////////////////////////////////
const currentDate = document.getElementById("current-date");
const daysTag = document.querySelector(".days");
const chevronPrev = document.querySelector(".datepicker .header .icons .prev");
const chevronNext = document.querySelector(".datepicker .header .icons .next");
let liThisMonth;
//////////////////////////////////////////////////////////////////
let date = new Date(),
  currentYear = date.getFullYear(),
  currentMonth = date.getMonth();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const renderCalender = () => {
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(), // 0 -> 6
    lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(), // 30 Or 31
    lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate(), // 30 Or 31
    lastDayOfMonth = new Date(
      currentYear,
      currentMonth,
      lastDateOfMonth
    ).getDay(); // 0 -> 6
  //When we add 1 to the currentMonth, we will move one month forward.
  //by specifying 0 as the day, we move one day backward, to the last day of the month.
  let liTags = "";
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    liTags += `<li class="inactive">${lastDateOfPrevMonth - i}</li>`;
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      liTags += `<li class="active">${i}</li>`;
    } else {
      liTags += `<li>${i}</li>`;
    }
  }
  for (let i = lastDayOfMonth + 1; i <= 6; i++) {
    liTags += `<li class="inactive">${i - lastDayOfMonth}</li>`;
  }
  currentDate.innerText = `${monthNames[currentMonth]} ${currentYear}`;
  daysTag.innerHTML = liTags;
  liThisMonth = document.querySelectorAll(
    ".datepicker .calendar .days li:not(.inactive)"
  );
  liThisMonth.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      liThisMonth.forEach((ele) => {
        if (e.target === ele) {
          ele.classList.add("selected");
          console.log(e.target);
        } else {
          ele.classList.remove("selected");
        }
      });
      selectedDate = new Date(currentYear, currentMonth, this.innerText);
      selectedDay = this.innerText;
      eventCountdown();
    });
  });
};

renderCalender();

chevronPrev.addEventListener("click", () => {
  currentMonth = currentMonth - 1;
  if (currentMonth < 0) {
    date = new Date(currentYear, currentMonth);
    currentYear = date.getFullYear();
    currentMonth = date.getMonth();
  } else {
    date = new Date();
  }
  renderCalender();
});
chevronNext.addEventListener("click", () => {
  currentMonth = currentMonth + 1;
  if (currentMonth > 11) {
    date = new Date(currentYear, currentMonth);
    currentYear = date.getFullYear();
    currentMonth = date.getMonth();
  } else {
    date = new Date();
  }
  renderCalender();
});

//////////////////////////////////////////////////////////////////
hrInput = document.getElementById("hr-input");
minInput = document.getElementById("min-input");
hrUp = document.querySelector(".hr-up");
hrDown = document.querySelector(".hr-down");
minUp = document.querySelector(".min-up");
minDown = document.querySelector(".min-down");
let invalidChars = ["-", "+", "e"];
hrInput.value = formatTime(new Date().getHours());
minInput.value = formatTime(new Date().getMinutes());
//////////////////////////////////////////////////////////////////
hrInput.addEventListener("change", function (e) {
  if (e.target.value > 23) {
    e.target.value = 23;
  } else if (e.target.value < 0) {
    e.target.value = "00";
  } else if (e.target.value == "") {
    e.target.value = "00";
  }
  e.target.value = formatTime(e.target.value);
});

hrInput.addEventListener("keydown", function (e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});
//////////////
minInput.addEventListener("change", function (e) {
  if (e.target.value > 59) {
    e.target.value = 59;
  } else if (e.target.value < 0) {
    e.target.value = "00";
  } else if (e.target.value == "") {
    e.target.value = "00";
  }
  e.target.value = formatTime(e.target.value);
});

minInput.addEventListener("keydown", function (e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});
//////////////////////////////////////////////////////////////////
hrUp.addEventListener("click", () => {
  hrInput.value++;
  if (hrInput.value > 23) {
    hrInput.value = 23;
  }
  hrInput.value = formatTime(hrInput.value);
});
hrDown.addEventListener("click", () => {
  hrInput.value--;
  if (hrInput.value < 0) {
    hrInput.value = 0;
  }
  hrInput.value = formatTime(hrInput.value);
});
minUp.addEventListener("click", () => {
  minInput.value++;
  if (minInput.value > 59) {
    minInput.value = 0;
    hrUp.click();
  }
  minInput.value = formatTime(minInput.value);
});
minDown.addEventListener("click", () => {
  minInput.value--;
  if (minInput.value < 0) {
    minInput.value = 59;
    hrDown.click();
  }
  minInput.value = formatTime(minInput.value);
});
//////////////////////////////////////////////////////////////////
function formatTime(number) {
  if (number < 10) {
    number = Number(number);
    number = "0" + number;
  }
  return number;
}
//////////////////////////////////////////////////////////////////
const datePicker = document.querySelector(".datepicker");
const cancelBtn = document.querySelector(".my-btn .cancel");
const changeBtn = document.querySelector(".my-btn .change");
//////////////////////////////////////////////////////////////////
showDatepicker.addEventListener("click", function () {
  if (datePicker.style.display == "none") {
    datePicker.style.display = "block";
  } else {
    datePicker.style.display = "none";
  }
  console.log(selectedDate);
});
cancelBtn.addEventListener("click", function () {
  showDatepicker.click();
});
changeBtn.addEventListener("click", () => {
  selectedDate = new Date(
    currentYear,
    currentMonth,
    selectedDay,
    hrInput.value,
    minInput.value
  );
  console.log(selectedDay);
  eventCountdown();
  showDatepicker.click();
});
