async function getData() {
  const res = await fetch(
    "https://anisha7.github.io/titanicdata/titanic-passengers.json"
  );
  const json = await res.json();
  return json;
}

console.log("HERE DATA FILTER");
const data = getData().then(d => {
  handleData(d);
});
// const fields = data.map(passenger => passenger.fields);

// listen events for buttons

let showGender = false;
let showEmbarked = false;
let showSurvived = false;

const buttonGender = document.getElementById("button-gender");
const buttonEmbarked = document.getElementById("button-embarked");
const buttonSurvived = document.getElementById("button-survived");

buttonGender.addEventListener("click", e => {
  showGender = !showGender;
  displayByGender();
});

buttonEmbarked.addEventListener("click", e => {
  showEmbarked = !showEmbarked;
  displayByEmbarked();
});

buttonSurvived.addEventListener("click", e => {
  showSurvived = !showSurvived;
  displayBySurvived();
});

const container = document.getElementById("content7");
container.style.display = "flex";
container.style.flexDirection = "row";
container.style.flexWrap = "wrap";

const elements = [];
const passengerData = [];
// append basic divs
function handleData(data) {
  const fields = data.map(({ fields }) => fields);

  fields.forEach(passenger => {
    const el = document.createElement("div");
    el.style.width = "14px";
    el.style.height = "14px";
    el.style.backgroundColor = "black";
    el.style.margin = "1px";
    el.style.transition = "200ms"; // use trasnsition to asnimate changes
    el.style.boxSizing = "border-box";
    container.appendChild(el);
    elements.push(el); // store the element
    passengerData.push(passenger); // Store the passenger
  });
}

function displayByGender() {
  passengerData.forEach((obj, i) => {
    const el = elements[i];
    const color = obj.sex === "male" ? "blue" : "pink";
    el.style.backgroundColor = showGender ? color : "black";
  });
}

function displayByEmbarked() {
  passengerData.forEach((obj, i) => {
    const el = elements[i];
    let borderColor = "black";
    if (obj.embarked === "Q") {
        borderColor = "red"
    } else if (obj.embarked === "C") {
        borderColor = "yellow"
    } else if (obj.embarked === "S") {
        borderColor = "lightgreen"
    }
    el.style.border = showEmbarked ? `2px solid ${borderColor}` : "none";
  });
}

function displayBySurvived() {
  passengerData.forEach((obj, i) => {
    const el = elements[i];
    const borderRadius = obj.survived === "No" ? "0px" : "25px";
    el.style.borderRadius = showSurvived ? borderRadius : "0px";
  });
}
