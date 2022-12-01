const select_one = document.getElementById("resource");
const allDataList = document.getElementById("desc");
const descText = document.getElementById("p_details");

select_one.onchange = function (e) {
  console.log(e.target.value);
  const elm = Array.from(allDataList.querySelectorAll(`[data-id]`)).find(
    (el) => el.dataset.id == e.target.value
  );

  console.log(elm);
  console.log(elm.value);
  var par = document.createTextNode(elm.value);
  descText.innerText = "Description : " + elm.value;
  //   document.getElementById("p_details").textContent(elm.value);
  //   descText.innerText();
};
