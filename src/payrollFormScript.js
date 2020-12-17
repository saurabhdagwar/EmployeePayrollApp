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
    let nameRegex = new RegExp(/^[A-Z]{1}[a-z ]{2,}$/);
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
    return this._department;
  }
  set department(department) {
    this._department = department;
  }

  get salary() {
    return this._salary;
  }
  set salary(salary) {
    this._salary = salary;
  }

  get note() {
    return this._note;
  }
  set note(note) {
    this._note = note;
  }

  get startDate() {
    return this._startDate;
  }
  set startDate(startDate) {
    this._startDate = startDate;
  }

  toString() {
    return ("id=" +this.id + " name=" + this.name + ", gender=" + this.gender +", profilePic=" + this.profilePic + ", department=" + this.department + ", salary=" + this.salary +", startDate=" + this.startDate + ", note=" + this.note );
  }
}

let isUpdate = false;
let employeePayrollObj = {};

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
    checkForUpdate();
  });
  
  const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm(); 
  }

  const setForm = () => {
    setValue('#name' , employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date = employeePayrollObj._startDate.split("/");
    console.log(date);
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
  } 

  const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
      if(Array.isArray(value)){
        if(value.includes(item.value)){
          item.checked = true;
        }
      }
      else if(item.value === value)
      item.checked = true;
    });
  }

  dateValidation = () => {
    var today = new Date();
    const date = `${document.querySelector("#year").value}${
      document.querySelector("#month").value
    }${document.querySelector("#day").value}`;
    const dateError = document.querySelector("#date-error");
    let currentDate = `${today.getFullYear()}${String(
      today.getMonth() + 1
    ).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
    // let dateDiff = currentDate - date;
    if (date > currentDate  ) {
      dateError.textContent = "Date not be a future date";
    } else {
      dateError.textContent = "";
    }
  };
  
  const save = () => {
    event.preventDefault();
    event.stopPropagation();
    try {
      setEmployeePayrollObject();
      createAndUpdateStorage();
      resetForm();
      window.location.replace(site_properties.home_page);
    } catch (e) {
      return;
    }
  };
  
  const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+"/"+getInputValueById('#month')+"/"+getInputValueById('#year');
    employeePayrollObj._startDate = date;
  }

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
      employeePayrollData.name = getInputValueById("#name");
    } catch (e) {
      setTextValue(".text-error", e);
      throw e;
    }
    employeePayrollData.profilePic = getSelectedValues("[name=profile]").pop();
    employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
    employeePayrollData.department = getSelectedValues("[name=department]");
    employeePayrollData.salary = getInputValueById("#salary");
    employeePayrollData.note = getInputValueById("#notes");
    let givenDate = `${getInputValueById("#day")}/${getInputValueById("#month")}/${getInputValueById("#year")}`;
    employeePayrollData.startDate = givenDate;
    console.log(givenDate);
    alert(employeePayrollData.toString());
    return employeePayrollData;
  };
  
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
      if (item.checked) {
          selItems.push(item.value);
        }
    });
    return selItems;
  };
  
  const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
  };
  
  const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
  };
  
  const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
      let empPayrollData = employeePayrollList.find(empData => empData._name == employeePayrollObj._name);
      if(!empPayrollData){
        employeePayrollList.push(createEmployeePayrollData());
      }
      else{
        const  index = employeePayrollList.map(empData => empData._name).indexOf(empPayrollData._name)
        employeePayrollList.splice(index,1, createEmployeePayrollData(empPayrollData._name));
      }
    }
    else{
      employeePayrollList = [createEmployeePayrollData()]
    }
    localStorage.setItem( "EmployeePayrollList", JSON.stringify(employeePayrollList));
  }

  const  createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
  }

  const setEmployeePayrollData = (employeePayrollData) => {
    try{
      employeePayrollData.name = employeePayrollObj._name;
    }
    catch(e){
      setTextValue('.text-error',e);
      throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    employeePayrollData.startDate = employeePayrollObj._startDate;
    alert(employeePayrollData.toString());
  }

  const createNewEmployeeId = () => {
    let empID = localStorage.getItem('EmployeeID');
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
  }

  // const getSelectedValues = (propertyValue) => {
  //   let allItems = document.querySelectorAll(propertyValue);
  //   let selItems = [];
  //   allItems.forEach(item => {
  //     if(item.checked) selItems.push(item.value);
  //   });
  //   return selItems;
  // }

resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','01');
    setValue('#month','01');
    setValue('#year','2020');
}

unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}