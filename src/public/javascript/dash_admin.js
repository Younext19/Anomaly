// Get the elements
const modal = document.getElementById("id01");
const annuler = document.getElementById("close_button");
const add_responsible = document.getElementById("add_resp");
const incorrect = document.getElementById("incorrect_pw");
const refTable = document.getElementById("table_res");
const error_text = document.getElementById("err_resp");
const formData = document.querySelector("form");
const deleteMaintainerbtn = document.querySelectorAll(".delete_btn");
console.log(formData);
// EVENTS
add_responsible.addEventListener("click", openModal);
annuler.addEventListener("click", closeForm);
deleteMaintainerbtn.forEach((btn) =>
  btn.addEventListener("click", deleteMaintainer)
);

//When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// On submit click
formData.onsubmit = function (event) {
  event.preventDefault();
  if (validatePassword(event.target.password, event.target.password_confirm)) {
    const data = {
      username:event.target.username.value,
      full_name: event.target.full_name.value,
      password: event.target.password.value,
    };
    fetch(event.target.action, {
      method: event.target.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // enter you logic when the fetch is successful

        if (!data.full_name) {
          error_text.innerText = data.message;
          error_text.style.display = "block";
        } else {
          createRow(data);
        }
      })
      .catch((error) => {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error);
      });
  }
};

function deleteMaintainer(e) {
  const id = e.target.dataset.id;
  console.log("hoa");
  console.log();
  // console.log(e.rowIndex);
  fetch(`/api/maintainer/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // enter you logic when the fetch is successful
      console.log(data);
      if (data.id) {
        deleteRow(e);
      } else {
      }
    })
    .catch((error) => {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    });
}
// Functions
function closeForm() {
  modal.style.display = "none";
  incorrect.style.display = "none";
  error_text.style.display = "none";
  formData.reset();
}
function validatePassword(password, password_confirm) {
  if (password.value != password_confirm.value) {
    password_confirm.setCustomValidity("Passwords Don't Match");
    incorrect.style.display = "block";
    formData.reset();

    return false;
  } else {
    password_confirm.setCustomValidity("");
    return true;
  }
}
function openModal() {
  modal.style.display = "block";
}
function createRow(data) {
  var newRow = refTable.insertRow();
  var newCell = newRow.insertCell();
  var secondCell = newRow.insertCell();

  newCell.innerText = data.full_name;
  const span = document.createElement("span");
  span.innerText = "Supprimer";
  span.dataset.id = data.id;
  span.classList.add("delete_btn");
  secondCell.appendChild(span);
  span.addEventListener("click", deleteMaintainer);

  modal.style.display = "none";
  formData.reset();
}
function deleteRow(e) {
  console.log(e);
  e.target.parentElement.parentElement.remove();
}
//TODO: DELETE ROW WHEN DELETE MAINTAINER

// REPARE POST ID
