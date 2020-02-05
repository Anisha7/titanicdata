/*
This file consists of the javascript code needed to build the data 
sorting visualization. This is the first graph on the live version, 
where you can sort and filter using buttons.
*/

async function getData() {
  const res = await fetch(
    "https://anisha7.github.io/titanicdata/titanic-passengers.json"
  );
  const json = await res.json();
  return json;
}

// data setup
const data = getData().then(d => {
  handleData(d);
});

// graph data storage
const elements = [];
const passengerData = [];

// graph div elements
const container = document.getElementById("content7");
container.style.display = "flex";
container.style.flexDirection = "row";
container.style.flexWrap = "wrap";
const overlay = document.getElementById('content7-overlay')

// ********** FILTERING **********
// graph display style controllers 
let showGender = false;
let showEmbarked = false;
let showSurvived = false;


// filtering button elements
const buttonGender = document.getElementById("button-gender");
const buttonEmbarked = document.getElementById("button-embarked");
const buttonSurvived = document.getElementById("button-survived");

// event listeners for filtering buttons
buttonGender.addEventListener("click", e => {
  showGender = !showGender;
  selectButton(e, showGender);
  displayByGender();
});

buttonEmbarked.addEventListener("click", e => {
  showEmbarked = !showEmbarked;
  selectButton(e, showEmbarked);
  displayByEmbarked();
});

buttonSurvived.addEventListener("click", e => {
  showSurvived = !showSurvived;
  selectButton(e, showSurvived);
  displayBySurvived();
});


// Append basic/default divs to graph 
// and initialize elements and passengerData 
// to use for formatting graph later
function handleData(data) {
  const fields = data.map(({ fields }) => fields);

  fields.forEach((passenger, i) => {
    const el = document.createElement("div");
    el.style.width = "14px";
    el.style.height = "14px";
    el.style.backgroundColor = "#F28041";
    el.style.margin = "1px";
    el.style.transition = "200ms"; // use trasnsition to asnimate changes
    el.style.boxSizing = "border-box";
    el.style.cursor = "pointer";

    el.dataset.index = i; // <div data-index = "i">

    container.appendChild(el);
    elements.push(el); // store the element
    passengerData.push(passenger); // Store the passenger
  });
}

// Helper functions for drawing the graph
function selectButton(e, state) {
  if (state) {
    e.target.style.backgroundColor = "black";
    e.target.style.color = "white";
  } else {
    e.target.style.backgroundColor = "white";
    e.target.style.color = "black";
  }
}

function displayByGender() {
  passengerData.forEach((obj, i) => {
    const el = elements[i];
    const color = obj.sex === "male" ? "#1589F0" : "pink";
    el.style.backgroundColor = showGender ? color : "F28041";
  });
}

function displayByEmbarked() {
  passengerData.forEach((obj, i) => {
    const el = elements[i];
    let borderColor = "darkgray";
    if (obj.embarked === "Q") {
      borderColor = "red";
    } else if (obj.embarked === "C") {
      borderColor = "purple";
    } else if (obj.embarked === "S") {
      borderColor = "green";
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

// redraw all data with current selected filters
function redraw() {
  displayByGender();
  displayByEmbarked();
  displayBySurvived();
}

// ********** SORTING **********
// graph display style controllers 
let sortGender = false;
let sortEmbarked = false;
let sortSurvived = false;
let sortFare = false;
let sortId = false;

// sorting button elements
const buttonSortGender = document.getElementById("button-sort-gender");
const buttonSortEmbarked = document.getElementById("button-sort-embarked");
const buttonSortSurvived = document.getElementById("button-sort-survived");
const buttonSortFare = document.getElementById("button-sort-fare");
const buttonSortId = document.getElementById("button-sort-id");

// event listeners for sorting buttons
buttonSortGender.addEventListener("click", e => {
  sortGender = !sortGender;
  selectButton(e, sortGender);
  sortByGender();
});

buttonSortEmbarked.addEventListener("click", e => {
  sortEmbarked = !sortEmbarked;
  selectButton(e, sortEmbarked);
  sortByEmbarked();
});

buttonSortSurvived.addEventListener("click", e => {
  sortSurvived = !sortSurvived;
  selectButton(e, sortSurvived);
  sortbySurvived();
});

buttonSortFare.addEventListener("click", e => {
  sortFare = !sortFare;
  selectButton(e, sortFare);
  sortbyFare();
});

buttonSortId.addEventListener("click", e => {
  sortId = !sortId;
  selectButton(e, sortId);
  sortbyId();
});

// Helper functions for sorting
function sortByGender() {
  passengerData.sort((a, b) => (a.sex === "male" ? -1 : 1));
  redraw();
}

function sortByEmbarked() {
  passengerData.sort((a, b) => {
    const x = a.embarked;
    const y = b.embarked;
    if (x === undefined || y === undefined) {
      return 0;
    }

    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  redraw();
}

function sortbySurvived() {
  passengerData.sort((a, b) => (a.survived === "Yes" ? -1 : 1));
  redraw();
}

function sortbyFare() {
  passengerData.sort((a, b) => b.fare - a.fare);
  redraw();
}

function sortbyId() {
  passengerData.sort((a, b) => b.passengerid - a.passengerid);
  redraw();
}

// ********** Display passenger data when passenger block is clicked **********
// Helper to display passenger data
function displayOverlay(data) {
  overlay.style.display = 'flex'
  overlay.style.justifyContent = 'space-evenly'
  overlay.style.alignItems = 'baseline'
  overlay.innerHTML = `
  <h4> Selected passenger: </h4>
  <h4> ${data.name} </h4>
  <p> sex: ${data.sex} </p>
  <p> embarked: ${data.embarked} </p>
  <p> fare: ${data.fare} </p>
  <p> survived: ${data.survived} </p>
  <p> pclass: ${data.pclass} </p>
  `
}

// Helper to hide overlay, needed only with mouseover & mouseout method
// function hideOverlay() {
//   overlay.style.display = 'none'
// }

// Event listener on body for selecting 
// and displaying selected passenger data
const body = document.querySelector("body");
body.addEventListener("click", e => {
  console.log(e.target.dataset.index);
  const index = e.target.dataset.index;
  if (index !== undefined) {
    console.log(passengerData[index])
    displayOverlay(passengerData[index])
    redraw()
    elements[index].style.border = "3px solid black"
  }
});


// Tried using mouseover & mouseout. 
// This works, but can be glitchy if you move the mouse too quickly or scroll.
// Thus, I've decided to just go with the clicking approach above.

// container.addEventListener('mouseover', (e) => {
//   const index = e.target.dataset.index;
//   if (index !== undefined) {
//     displayOverlay(passengerData[index])
//     redraw()
//     elements[index].style.border = "3px solid black"
//   }
// })

// container.addEventListener('mouseout', (e) => {
//   hideOverlay()
// })