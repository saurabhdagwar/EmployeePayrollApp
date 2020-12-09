const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
output.textContent = salary.value;
salary.addEventListener("input", function () {
  output.textContent = salary.value;
});
const text = document.querySelector("#name");
const textError = document.querySelector("#text-error");
text.addEventListener("input", function () {
  let namRegex = new RegExp(/^[A-Z]{1}[a-z ]{2,}$/);
  if (namRegex.test(text.value)) textError.textContent = "";
  else textError.textContent = "Name is incorrect";
});

dateValidation = () => {
  var today = new Date();
  const date = `${document.querySelector("#year").value}${document.querySelector("#month").value}${document.querySelector("#day").value}`;
    console.log(date);
  const dateError = document.querySelector("#date-error");
  let currentDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
  if (date > currentDate) {
    dateError.textContent = "Date not be a future date";
  } else {
    dateError.textContent = "";
  }
};
