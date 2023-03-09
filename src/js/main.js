let Home_price = document.getElementById("Home_price");
let Precentage = document.getElementById("Precentage");
let Down_payment = document.getElementById("Down_payment");
let Loan_term = document.getElementById("Loan_term");
let Interest_rate = document.getElementById("Interest_rate");
let date = document.getElementById("initial_date");
let btn_calculate = document.getElementById("calculate");
let tbody = document.getElementById("tbody");

function calculateMonthlyPayment(
  monthlyInterestRate,
  numberOfPayments,
  presentValue
) {
  var monthlyPayment =
    (monthlyInterestRate * presentValue) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  return monthlyPayment.toFixed(5);
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

btn_calculate.addEventListener("click", function () {
  tbody.innerHTML = "";
  let beginning = Number.parseFloat(Home_price.value);
  let months = Number.parseInt(Loan_term.value) * 12;
  let x = 0;
  let rate = Number.parseFloat(Interest_rate.value) / 100 / 12;
  let new_date = new Date(date.value);
  let payment = calculateMonthlyPayment(
    rate,
    months,
    Number.parseInt(Home_price.value)
  );
  while (x < months) {
    let interest = rate * beginning;
    let principal = payment - interest;
    let ending = beginning - principal;
    let i = 0;
    let tr = document.createElement("tr");
    while (i < 7) {
      let td = document.createElement("td");
      if (i == 0) td.innerText = x + 1;
      if (i == 1)
        td.innerText =
          new_date.toLocaleDateString("default", { month: "short" }) +
          " " +
          new_date.getFullYear();
      if (i == 2) td.innerText = formatter.format(Number.parseFloat(beginning));
      if (i == 3) td.innerText = formatter.format(Number.parseFloat(payment));
      if (i == 4) td.innerText = formatter.format(Number.parseFloat(interest));
      if (i == 5) td.innerText = formatter.format(Number.parseFloat(principal));
      if (i == 6) {
        if (ending < 0) ending = 0;
        td.innerText = formatter.format(Number.parseFloat(ending));
      }
      tr.appendChild(td);
      i++;
    }
    beginning = ending;
    new_date.setMonth(new_date.getMonth() + 1);
    tbody.appendChild(tr);
    x++;
  }
});

function calculat_precnt() {
  if (Number.parseInt(Precentage.value))
    Down_payment.value = Home_price.value * (Precentage.value / 100);
  else Down_payment.value = 0;
}

Precentage.addEventListener("keyup", calculat_precnt);
Home_price.addEventListener("keyup", function () {
  if (Number.parseInt(Precentage.value)) calculat_precnt();
});
