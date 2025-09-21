let userInput = document.getElementById("datebox");
userInput.max = new Date().toISOString().split("T")[0]; // after string conversion to get till the year part  2025-09-15T07:10:30.123Z
let result = document.getElementById("result");

function calculateAge() {
  let birthday = new Date(userInput.value);

  let birthDate = birthday.getDate();
  let birthMonth = birthday.getMonth() + 1; // month will start from 0-jan, 1-feb  so adding 1 here
  let birthYear = birthday.getFullYear();

  let today = new Date();

  let currentDate = today.getDate();
  let currentMonth = today.getMonth() + 1;
  let currentYear = today.getFullYear();

  let resultYear, resultMonth, resultDate;

  resultYear = currentYear - birthYear;

  if (currentMonth >= birthMonth) {
    resultMonth = currentMonth - birthMonth;
  } else {
    //This runs when today’s month is smaller than the birth month example Birthday: 15 Nov 2000 (m1 = 11) and Today: 10 Sep 2025 (m2 = 9)  If we just subtract: m2 - m1 = 9 - 11 = -2 so borrows 1 year, instead of “25 years -2 months,” it becomes 24 years 10 months
    resultYear--;
    resultMonth = 12 + currentMonth - birthMonth;
  }

  if (currentDate >= birthDate) {
    resultDate = currentDate - birthDate;
  } else {
    resultMonth--;
    resultDate = getDaysInMonth(birthYear, birthMonth) + currentDate - birthDate;
  }

  if (resultMonth < 0) {
    // it's a safety check after adjusting days. In case We already borrowed days (so we reduced resultmonth--),  example - Birthday: 30 Jan 2000 (birthdate=30, birthmonth=1)   Today: 5 Jan 2025 (currentdate=5, currentmonth=1)    Birthday: 30 Jan 2000 (d1=30, m1=1) Day difference: d2 < d1 → borrow → m3-- → m3 = -1  So instead of “25 years -1 months …”, it becomes 24 years 11 months
    resultMonth = 11;
    resultYear--;
  }

  result.innerHTML = `You are <span>${resultYear}</span> Years <span>${resultMonth}</span> Months and <span>${resultDate}</span> Days Old`; // to style the year,month,date added span tag here
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
