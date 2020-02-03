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

// ********** FILTERING **********
let showGender = false;
let showEmbarked = false;
let showSurvived = false;

const buttonGender = document.getElementById("button-gender");
const buttonEmbarked = document.getElementById("button-embarked");
const buttonSurvived = document.getElementById("button-survived");

function selectButton(e, state) {
    if (state) {
        e.target.style.backgroundColor = 'black'
        e.target.style.color = 'white'
      } else {
        e.target.style.backgroundColor = 'white'
        e.target.style.color = 'black'
      }
  }

buttonGender.addEventListener("click", e => {
  showGender = !showGender;
  selectButton(e, showGender)
  displayByGender();
});

buttonEmbarked.addEventListener("click", e => {
  showEmbarked = !showEmbarked;
  selectButton(e, showEmbarked)
  displayByEmbarked();
});

buttonSurvived.addEventListener("click", e => {
  showSurvived = !showSurvived;
  selectButton(e, showSurvived)
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

function redraw() {
    displayByGender()
    displayByEmbarked()
    displayBySurvived() 
}

// ********** SORTING **********
let sortGender = false;
let sortEmbarked = false;
let sortSurvived = false;
let sortFare = false;
let sortId = false;

const buttonSortGender = document.getElementById("button-sort-gender");
const buttonSortEmbarked = document.getElementById("button-sort-embarked");
const buttonSortSurvived = document.getElementById("button-sort-survived");
const buttonSortFare = document.getElementById("button-sort-fare");
const buttonSortId = document.getElementById("button-sort-id");

buttonSortGender.addEventListener("click", e => {
    sortGender = !sortGender;
    selectButton(e, sortGender)
    sortByGender();
});

buttonSortEmbarked.addEventListener("click", e => {
    sortEmbarked = !sortEmbarked;
    selectButton(e, sortEmbarked)
    sortByEmbarked();
});

buttonSortSurvived.addEventListener("click", e => {
    sortSurvived = !sortSurvived;
    selectButton(e, sortSurvived)
    sortbySurvived();
});

buttonSortFare.addEventListener("click", e => {
    sortFare = !sortFare;
    selectButton(e, sortFare)
    sortbyFare();
});

buttonSortId.addEventListener("click", e => {
    sortId = !sortId;
    selectButton(e, sortId)
    sortbyId();
});

function sortByGender() {
    passengerData.sort((a, b) => a.sex === "male" ? -1 : 1)
    redraw()
}

function sortByEmbarked() {
    passengerData.sort((a, b) => {
        const x = a.embarked
        const y = b.embarked
        if (x === undefined || y === undefined) {
          return 0
        }
    
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
      
        // names must be equal
        return 0;
      })
    redraw()
}

function sortbySurvived() {
    passengerData.sort((a, b) => a.survived === "Yes" ? -1 : 1)
    redraw()
}

function sortbyFare() {
    passengerData.sort((a, b) => b.fare - a.fare)
    redraw()
}

function sortbyId() {
    passengerData.sort((a, b) => b.passengerid - a.passengerid)
    redraw()
}