class EmployeePayrollData {
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }
  set name(name) {
    let nameRegex = "/^[A-Z]{1}[a-zA-Z\\s]{2,}$/";
    if (nameRegex.test(name)) this._name = name;
    else throw "Name is Incorrect!";
  }

  get profilePic() {
    return this._profilePic;
  }
  set profilePic(profilePic) {
    this._profilePic = profilePic;
  }

  get gender() {
    return this._gender;
  }
  set gender(gender) {
    this._gender = gender;
  }

  get department() {
    return this.department;
  }
  set department(department) {
    this._department = department;
  }

  get salary() {
    return this.salary;
  }
  set salary(salary) {
    this.salary = salary;
  }

  get note() {
    return this._note;
  }
  set note(note) {
    this._note = note;
  }

  get startDate() {
    return this.startDate;
  }
  set startDate(startDate) {
    this.startDate = startDate;
  }

  toString() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const empDate = !this.startDate
      ? "undefined"
      : this.startDate.toLocaleDateString("en-US", options);
    return (
      "id=" +
      this.id +
      " name=" +
      this.name +
      ", gender=" +
      this.gender +
      ", profilePic=" +
      this.profilePic +
      ", department=" +
      this.department +
      ", salary=" +
      this.salary +
      ", startDate=" +
      empDate +
      ", note=" +
      this.note
    );
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
    const text = document.querySelector("#name");
    const textError = document.querySelector("#text-error");
    text.addEventListener("input", function () {
      let namRegex = new RegExp(/^[A-Z]{1}[a-z ]{2,}$/);
      if (text.value.length == 0) {
        textError.textContent = "";
      } else if (namRegex.test(text.value)) textError.textContent = "";
      else textError.textContent = "Name is incorrect";
    });
  
    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener("input", function () {
      output.textContent = salary.value;
    });
  });
  
  dateValidation = () => {
    var today = new Date();
    const date = `${document.querySelector("#year").value}${
      document.querySelector("#month").value
    }${document.querySelector("#day").value}`;
    const dateError = document.querySelector("#date-error");
    let currentDate = `${today.getFullYear()}${String(
      today.getMonth() + 1
    ).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
    if (date > currentDate) {
      dateError.textContent = "Date not be a future date";
    } else {
      dateError.textContent = "";
    }
  };
  
  