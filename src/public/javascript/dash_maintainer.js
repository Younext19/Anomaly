// Get the modal
var modal = document.getElementById("id02");
const formData = document.querySelector("form");
const error_text = document.getElementById("error_text");
const annuler = document.getElementById("close_button");
const repairAnomalyBtn = document.querySelectorAll(".reparer_btn");
console.log(repairAnomalyBtn);
console.log(formData);
annuler.addEventListener("click", closeForm);

repairAnomalyBtn.forEach((btn) => {
  btn.addEventListener("click", repairAnomaly);
});
function repairAnomaly(e) {
  console.log(e.target.dataset.id);
  const id = e.target.dataset.id;
  fetch(`/api/anomaly/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => console.log(res))
    .then((data) => {
      // enter you logic when the fetch is successful
      deleteRow(e);
    })
    .catch((error) => {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    });
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// On submit click on add ressource
formData.onsubmit = function (event) {
  event.preventDefault();
  const data = {
    name: event.target.name.value,
    description: event.target.description.value,
  };

  console.log(data);
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
      if (data.name == undefined) {
        error_text.innerText = data.message;
        error_text.style.display = "block";
      } else {
        alert(`la resource : ${data.name} est ajoutée avec succès`)
        modal.style.display = "none";
      }
    })
    .catch((error) => {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    });
};

// Functions
function closeForm() {
  modal.style.display = "none";
  incorrect.style.display = "none";
  error_text.style.display = "none";
  formData.reset();
}

function deleteRow(e) {
  console.log("hahowa");
  e.target.parentElement.parentElement.remove();
}
