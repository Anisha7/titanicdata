// For this lab, you will work on writing functions to automate your visualizations. Keep these functions in a utils.js file that you can copy and reuse for your various assignments.

// These functions should take in color and size parameters, and return a configured object. You can make one of these functions for each shape for ease of creation for your assignments:

// Rectangle
// Rounded Rectangles
// Circle
// Eyes
// Droplets
// Leaves
// Stretch Challenges

// Create functions for compound shapes, or any other shapes you may use
// Have your functions take in a position parameter
// Have your functions take in a stroke parameter

console.log("UTILS SETUP");

// Input: data object containing "label": number, total number,
// and id for html div to append graph to
function createBarGraph(data, total, id) {
  const container = document.getElementById(id);

  const barsDiv = document.createElement("div");
  barsDiv.style.width = "400px";
  barsDiv.style.height = "400px";
  barsDiv.style.border = "3px solid #515ada";
  barsDiv.style.display = "flex";
  barsDiv.style.flexDirection = "row";
  barsDiv.style.alignItems = "flex-end";
  barsDiv.style.backgroundColor = "#3c3c3c";

  const labelsDiv = document.createElement("div");
  labelsDiv.style.width = "400px";
  labelsDiv.style.display = "flex";
  labelsDiv.style.flexDirection = "row";
  labelsDiv.style.alignItems = "flex-end";

  Object.keys(data).forEach(key => {
    console.log(key, data[key]);
    const el = document.createElement("div");
    el.style.width = `100px`;
    el.style.height = `${(data[key] / total) * 400}px`;
    el.style.border = "1px solid #515ada";
    el.style.marginLeft = "20px";
    el.style.borderTopLeftRadius = "25px";
    el.style.borderTopRightRadius = "25px";
    // text
    el.style.fontSize = "16px";
    el.style.textAlign = "center";
    el.innerText = `${data[key]}`;
    el.style.paddingBottom = "20px";
    // colors
    el.style.background = "linear-gradient(135deg, #efd5ff 0%, #515ada 100%)";
    // append to graph
    barsDiv.appendChild(el);

    // labels
    const el_label = document.createElement("div");
    el_label.style.width = `100px`;
    el_label.style.height = "20px";
    el_label.style.marginLeft = "20px";
    el_label.style.marginTop = "10px";
    el_label.style.textAlign = "center";
    el_label.style.fontSize = "16px";
    el_label.style.fontWeight = "bold"
    el_label.innerText = key;
    labelsDiv.appendChild(el_label);
  });

  container.appendChild(barsDiv);
  container.appendChild(labelsDiv);
}

// keys in data have to be numbers
function createSortedBarGraph(data, id) {
  const keys = Object.keys(data).map(n => parseInt(n));
  keys.sort((a, b) => a > b);

  const container = document.getElementById(id);

  const barsDiv = document.createElement("div");
  barsDiv.style.width = "100 vw";
  barsDiv.style.display = "flex";
  barsDiv.style.flexDirection = "row";
  barsDiv.style.alignItems = "flex-end";
  container.appendChild(barsDiv);

  const labelsDiv = document.createElement("div");
  labelsDiv.style.width = "100 vw";
  labelsDiv.style.display = "flex";
  labelsDiv.style.flexDirection = "row";
  labelsDiv.style.alignItems = "flex-end";
  container.appendChild(labelsDiv);

  keys.forEach(key => {
    const el = document.createElement("div");
    el.style.width = `20px`;
    el.style.height = `${seen[key]}px`;
    el.style.border = "1px solid black";
    el.style.backgroundColor = "lightblue";
    // append to graph
    barsDiv.appendChild(el);

    // labels
    const el_label = document.createElement("div");
    el_label.style.width = `20px`;
    el_label.style.height = "20px";
    // el.style.border = "1px solid black"
    el_label.style.textAlign = "center";
    el_label.innerText = `${key}`;
    labelsDiv.appendChild(el_label);
  });
}

function createDataTable(data, id) {
    const container = document.getElementById(id);

    const table = document.createElement('table')
    table.style.border = "1px solid black"
    table.style.borderCollapse = "collapse"

    Object.keys(data).forEach(key => { 
        // create elements
        const tr = document.createElement('tr')
        const th = document.createElement('th')
        const td = document.createElement('td')
        // style elements
        th.style.border = "1px solid black"
        th.style.borderCollapse = "collapse"
        th.style.padding = "20px"
        th.style.textAlign = "left"
        td.style.border = "1px solid black"
        td.style.borderCollapse = "collapse"
        td.style.padding = "20px"
        td.style.textAlign = "left"
        // inject content
        th.innerText = key
        td.innerText = data[key]
        // append
        tr.appendChild(th)
        tr.appendChild(td)
        table.appendChild(tr)
    })

    container.appendChild(table)
}
