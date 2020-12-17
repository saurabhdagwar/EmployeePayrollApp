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
    "<th>Note</th>"+
    "<th>Action</th>" +
    "</tr>";
  innerHTML1 = headerHtml;
  for (var empPayrollData of empPayrollList) {
    innerHTML1 = innerHTML1 +
      "<tr>" +
      `<td><img class='profile' src='${empPayrollData._profilePic}'></td>` + 
      "<td>" + empPayrollData._name + "</td>" +
      "<td>" + empPayrollData._gender + "</td>" +
      "<td>" + getDeptHtml(empPayrollData._department) + "</td>" +
      "<td>" + empPayrollData._salary + "</td>" +
      "<td>" + empPayrollData._startDate + "</td>" +
      "<td>" + empPayrollData._note +"</td>" +
      "<td>" +
      `<button onclick=remove('${empPayrollData._id}')><img id='1' alt='delete' src='../assets/delete-black-18dp.svg'></button>` +
      `<button onclick=update('${empPayrollData._id}')><img id='1' alt='edit' src='../assets/create-black-18dp.svg'></button>` + 
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

const remove = (node) => {
  console.log(node);
  let empPayrollData = empPayrollList.find(empData => empData._id == node);
  if(!empPayrollData) return;
  const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
  empPayrollList.splice(index,1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
}

const update = (node) => {
  let empPayrollData = empPayrollList.find(empData => empData._id == node);
  if(!empPayrollData) return;
  localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
  window.location.replace(site_properties.add_emp_payroll_page);
}
