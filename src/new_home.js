let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
  empPayrollList = getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = empPayrollList.length; 
  createInnerHtml();
  localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
  console.log("its working");
  var innerHTML1 = "";
  const headerHtml =
    "<tr>" +
    "<th></th>" +
    "<th>Name</th>" +
    "<th>Gender</th>" +
    "<th>Department</th>" +
    "<th>Salary</th>" +
    "<th>Start Date</th>" +
    "<th>Action</th>" +
    "</tr>";
    if(!empPayrollList.length) return;
  innerHTML1 = headerHtml;
  // let empPayrollList = createEmployeePayrollJson();
  for (var empPayrollData of empPayrollList) {
    innerHTML1 = innerHTML1 +
      "<tr>" +
      `<td><img class='profile' src='${empPayrollData._profilePic}'></td>` + 
      "<td>" + empPayrollData._name + "</td>" +
      "<td>" + empPayrollData._gender + "</td>" +
      "<td>" + getDeptHtml(empPayrollData._department) + "</td>" +
      "<td>" + empPayrollData._salary + "</td>" +
      "<td>" + empPayrollData._startDate + "</td>" +
      "<td>" +
      "<img id='1' onclick='remove(this) alt='delete' src='../assets/create-black-18dp.svg'>" +
      "<img id='1' onclick='update(this) alt='edit' src='../assets/delete-black-18dp.svg'>" +
      "</td>" +
      "</tr>"
  };
  document.querySelector('#table-display').innerHTML = innerHTML1;
}
const getDeptHtml = (deptList) => {
  let deptHtml = "";
  for (const dept of deptList) {
    deptHtml += "<div class='dept-label'>" + dept + "</div>";
  }
  return deptHtml;
}

