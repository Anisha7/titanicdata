fetch("https://anisha7.github.io/titanicdata/titanic-passengers.json")
  .then(res => res.json())
  .then(json => {
    handleData(json);
    createPassengerGraph(json);
    createAgeBarGraph(json);
    createGenderBarGraph(json);
    survivalInEachClassFemale(json);
    survivalInEachClassMale(json)
  })
  .catch(err => console.log(err.message));

let firstPassenger;
let totalPassengers;
let survived;
let listLen;
let dead;
let passengerClasses;
let passengerClassSizes;
let deadClassCounts;
let numQueenstownPassengers;
let numPeopleWithNanny;
let ages;
let numSiblings;
let survivalRate;
let numAges;

function handleData(json) {
  const fields = json.map(passenger => passenger.fields);

  // Get data from the first passenger in the list
  // name, fare, pclass, survived, age
  firstPassenger = {
    name: fields[0].name,
    fare: fields[0].fare,
    pclass: fields[0].pclass,
    survived: fields[0].survived,
    age: fields[0].age
  };

  // How many total passengers?
  totalPassengers = fields.length;

  // get the length of the list
  listLen = json.length;

  // How many survived?
  survived = fields.filter(({ survived }) => survived === "Yes").length;

  // How many died?
  deadList = fields.filter(({ survived }) => survived === "No");
  dead = deadList.length;

  // How many passenger classes?
  const classCounts = {};
  fields.forEach(val => {
    if (val.pclass in classCounts) {
      classCounts[val.pclass] += 1;
    } else {
      classCounts[val.pclass] = 1;
    }
  });

  passengerClasses = 3 //classCounts.size; // 3

  // How many passengers in each class?
  passengerClassSizes = JSON.stringify(classCounts);

  // How many died in each class?
  // Get all of the ages from the Titanic Dataset
  // Filter data points where the age is missing
  const deadClassCountsDict = {};
  deadList.forEach(val => {
    if (val.pclass in deadClassCountsDict) {
      deadClassCountsDict[val.pclass] += 1;
    } else {
      deadClassCountsDict[val.pclass] = 1;
    }
  });
  deadClassCounts = JSON.stringify(deadClassCountsDict);

  // How many passengers embarked from Queenstown?
  numQueenstownPassengers = fields.filter(({ embarked }) => embarked === "Q")
    .length;

  // How many people traveled with a nanny?
  numPeopleWithNanny = fields.filter(({ parch }) => parch === 0).length;

  // Find the min and max-age
  minAge = Number.MAX_VALUE;
  maxAge = Number.MIN_VALUE;
  fields.forEach(({ age }) => {
    if (age < minAge) {
      minAge = age;
    }

    if (age > maxAge) {
      maxAge = age;
    }
  });

  ages = JSON.stringify({
    min: minAge,
    max: maxAge
  });

  // Find min and max fare
  minFare = Number.MAX_VALUE;
  maxFare = Number.MIN_VALUE;
  fields.forEach(({ fare }) => {
    if (fare < minFare) {
      minFare = fare;
    }

    if (fare > maxFare) {
      maxFare = fare;
    }
  });

  fares = JSON.stringify({
    min: minFare,
    max: maxFare
  });

  // How many siblings were there?
  numSiblings = fields.map(({ sibsp }) => sibsp).reduce((n, acc) => acc + n);

  // What is the survival rate of siblings vs only children?
  const numSiblingsSurvived = fields.filter(
    ({ sibsp, survived }) => sibsp > 0 && survived === "Yes"
  ).length;
  const numSoloSurvived = fields.filter(
    ({ sibsp, survived }) => sibsp === 0 && survived === "No"
  ).length;
  survivalRate = (numSiblingsSurvived / numSoloSurvived).toFixed(2);

  // How many ages were estimated?
  seen = new Set();
  fields.forEach(({ age }) => {
    seen.add(age);
  });
  numAges = seen.size;
  createDataTable({
    "Get data from the first passenger in the list:": JSON.stringify(firstPassenger),
    "Get data from the first passenger in the list:": JSON.stringify(firstPassenger),
    "How many total passengers?:": totalPassengers,
    "What's the length of the list?:": listLen,
    "How many survived?:": survived,
    "How many died?:" : dead,
    "How many passenger classes?:": passengerClasses,
    "How many passengers in each class?:": passengerClassSizes,
    "How many died in each class?:": deadClassCounts,
    "How many passengers embarked from Queenstown?:": numQueenstownPassengers,
    "How many people traveled with a nanny?:": numPeopleWithNanny, 
    "Find the min and max-age:": ages,
    "Find min and max fare:": fares,
    "How many siblings were there?:": numSiblings,
    "What is the survival rate of siblings vs only children?": survivalRate, 
    "How many ages were estimated?:": numAges,
  }, "content1")
}

function createPassengerGraph(data) {
  const container = document.getElementById("content2");
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.flexWrap = "wrap";
  // console.log(data.sort((a, b) => a.fields.sex - b.fields.sex))
  // helper to sort by gender and survived
  const numGenderSurvived = (a) => {
    let n = a.fields.sex === "female" ? 0 : 2
    return a.fields.survived === "No" ? n + 1 : n
  };

  // sort by embarked
  const sortByEmbarked = (a, b) => {
    const x = a.fields.embarked
    const y = b.fields.embarked
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
  }
  
  data.sort(sortByEmbarked).sort((a, b) => numGenderSurvived(a) - numGenderSurvived(b)).forEach(passenger => {
    const el = document.createElement("div");
    el.style.height = "30px";
    el.style.width = "30px";
    el.style.margin = "1px";
    // Set the color of each passenger to red if they survived and black if they did not
    el.style.backgroundColor = "#8D8798";
    if (passenger.fields.survived === "Yes") {
      el.style.backgroundColor = "#C8ADCC";
    }
    // Set the border radius for each passenger based on gender (sex). Use 0 for males and 50% for females.
    if (passenger.fields.sex === "female") {
      el.style.borderRadius = "50%";
    }
    container.appendChild(el);
  });
}

function createAgeBarGraph(data) {

  const fields = data.map(passenger => passenger.fields);
  seen = {};

  fields.forEach(({ age }) => {
    age = Math.ceil(parseInt(age));
    if (isNaN(age)) {
      return;
    }
    if (age in seen) {
      seen[age] += 1;
    } else {
      seen[age] = 1;
    }
  });

  createSortedBarGraph(seen, 'content3')
}

function createGenderBarGraph(data) {
  const fields = data.map(passenger => passenger.fields);
  let numMales = 0;
  let numFems = 0;
  let numOther = 0;

  fields.forEach(({ sex }) => {
    if (sex === "male") {
      numMales += 1;
    } else if (sex === "female") {
      numFems += 1;
    } else {
      numOther += 1;
    }
  });

  createBarGraph({
    "Male": numMales,
    "Female": numFems,
    "Other": numOther
  }, totalPassengers, "content4")
}

function survivalInEachClassFemale(data) {
  const fields = data.map(passenger => passenger.fields).filter(({sex}) => sex === "female");
  const totalFemales = fields.length
  const survivedFemales = fields.filter(({survived}) => survived === "Yes")
  let newData = [0, 0, 0] // pclass 1, 2, 3
  survivedFemales.forEach(fem => {
    newData[fem.pclass - 1] += 1
  })

  createBarGraph({
    "1": newData[0],
    "2": newData[1],
    "3": newData[2]
  }, totalFemales, "content5")
}

function survivalInEachClassMale(data) {
  const fields = data.map(passenger => passenger.fields).filter(({sex}) => sex === "male");
  const totalMales = fields.length
  const survivedFemales = fields.filter(({survived}) => survived === "Yes")
  let newData = [0, 0, 0] // pclass 1, 2, 3
  survivedFemales.forEach(fem => {
    newData[fem.pclass - 1] += 1
  })

  createBarGraph({
    "1": newData[0],
    "2": newData[1],
    "3": newData[2]
  }, totalMales, "content6")
}