window.addEventListener("DOMContentLoaded", (event) => {
  createInnerHtml();
});

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
  innerHTML1 = headerHtml;
  let empPayrollList = createEmployeePayrollJson();
  for (var empPayrollData of empPayrollList) {
    innerHTML1 =
      innerHTML1 +
      "<tr>" +
      `<td><img class='profile' src='${empPayrollData._profilePic}'></td>` + 
      "<td>" +
      empPayrollData._name +
      "</td>" +
      "<td>" +
      empPayrollData._gender +
      "</td>" +
      "<td>" +
      getDeptHtml(empPayrollData._department) +
      "</td>" +
      "<td>" +
      empPayrollData._salary +
      "</td>" +
      "<td>" +
      empPayrollData._startDate +
      "</td>" +
      "<td>" +
      "<img id='1' onclick='remove(this) alt='delete' src='../assets/create-black-18dp.svg'>" +
      "<img id='1' onclick='update(this) alt='edit' src='../assets/delete-black-18dp.svg'>" +
      "</td>" +
      "</tr>"
  };
  document.querySelector('#table-display').innerHTML = innerHTML1;
}
const createEmployeePayrollJson = () => {
  let empPayrollListLocal = [
    {
      _name: "Saurabh Dagwar",
      _gender: "male",
      _department: ["Engineering", "Finance"],
      _salary: "500000",
      _startDate: "29/11/2020",
      _note: "Its first",
      _id: new Date().getTime(),
      _profilePic: "../assets/profile-img4.JPG",
    },
    {
      _name: "Shankar",
      _gender: "male",
      _department: ["HR", "sales"],
      _salary: "450000",
      _startDate: "11/04/2018",
      _note: "Its Second",
      _id: new Date().getTime(),
      _profilePic: "../assets/profile-img2.JPG",
    },
    {
      _name: "Rashmi",
      _gender: "female",
      _department: ["Engineer", "sales"],
      _salary: "300000",
      _startDate: "9/12/2017",
      _note: "Its Third",
      _id: new Date().getTime(),
      _profilePic: "../assets/profile-img3.JPG",
    }
  ];
  return empPayrollListLocal;
};

const getDeptHtml = (deptList) => {
  let deptHtml = "";
  for (const dept of deptList) {
    deptHtml += "<div class='dept-label'>" + dept + "</div>";
  }
  return deptHtml;
}
