fetch('http://127.0.0.1:5500/titanic-passengers.json')
    .then(res => res.json())
    .then(json => {
        handleData(json)
        createPassengerGraph(json)
        createFaresBarGraph(json)
    })
    .catch(err => console.log(err.message))

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
    const fields = json.map(passenger => passenger.fields)

    // Get data from the first passenger in the list
    // name, fare, pclass, survived, age
    firstPassenger = {
        name: fields[0].name,
        fare: fields[0].fare,
        pclass: fields[0].pclass,
        survived: fields[0].survived,
        age: fields[0].age,
    }

    // How many total passengers?
    totalPassengers = fields.length

    // get the length of the list
    listLen = json.length

    // How many survived?
    survived = fields.filter(({survived}) => survived === "Yes").length

    // How many died?
    deadList = fields.filter(({survived}) => survived === "No")
    dead = deadList.length

    // How many passenger classes?
    const classCounts = {}
    fields.forEach(val => {
        if (val.pclass in classCounts) {
            classCounts[val.pclass] += 1
        } else {
            classCounts[val.pclass] = 1
        }
    })

    passengerClasses = classCounts.size // 3

    // How many passengers in each class?
    passengerClassSizes = JSON.stringify(classCounts)

    // How many died in each class?
    // Get all of the ages from the Titanic Dataset
    // Filter data points where the age is missing
    const deadClassCountsDict = {}
    deadList.forEach(val => {
        if (val.pclass in deadClassCountsDict) {
            deadClassCountsDict[val.pclass] += 1
        } else {
            deadClassCountsDict[val.pclass] = 1
        }
    })
    deadClassCounts = JSON.stringify(deadClassCountsDict)

    // How many passengers embarked from Queenstown?
    numQueenstownPassengers = fields.filter(({embarked}) => embarked === "Q").length

    // How many people traveled with a nanny?
    numPeopleWithNanny = fields.filter(({parch}) => parch === 0).length

    // Find the min and max-age
    minAge = Number.MAX_VALUE
    maxAge = Number.MIN_VALUE
    fields.forEach(({age}) => {
        if (age < minAge) {
            minAge = age
        }

        if (age > maxAge) {
            maxAge = age
        }
    })

    ages = JSON.stringify({
        min: minAge,
        max: maxAge
    })

    // Find min and max fare
    minFare = Number.MAX_VALUE
    maxFare = Number.MIN_VALUE
    fields.forEach(({fare}) => {
        if (fare < minFare) {
            minFare = fare
        }

        if (fare > maxFare) {
            maxFare = fare
        }
    })

    fares = JSON.stringify({
        min: minFare,
        max: maxFare
    })

    // How many siblings were there?
    numSiblings = fields.map(({sibsp}) => sibsp).reduce((n, acc) => acc + n)

    // What is the survival rate of siblings vs only children?
    const numSiblingsSurvived = fields.filter(({sibsp, survived}) => sibsp > 0 && survived === "Yes").length
    const numSoloSurvived = fields.filter(({sibsp, survived}) => sibsp === 0 && survived === "No").length
    survivalRate = (numSiblingsSurvived/numSoloSurvived).toFixed(2)
    
    // How many ages were estimated?
    seen = new Set()
    fields.forEach(({age}) => {
        seen.add(age)
    })
    numAges = seen.size

    document.getElementById("content1").innerHTML = 
        `
        <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }
        th, td {
            padding: 20px;
            text-align: left;    
        }
        </style>

        <table>
        <tr>
            <th>Get data from the first passenger in the list:</th>
            <td>${JSON.stringify(firstPassenger)}</td>
        </tr>
        <tr>
            <th>Get data from the first passenger in the list:</th>
            <td>${JSON.stringify(firstPassenger)}</td>
        </tr>
        <tr>
            <th>How many total passengers?:</th>
            <td>${totalPassengers}</td>
        </tr>
        <tr>
            <th>What's the length of the list?:</th>
            <td>${listLen}</td>
        </tr>
        <tr>
            <th>How many survived?:</th>
            <td>${survived}</td>
        </tr>
        <tr>
            <th>How many died?:</th>
            <td>${dead}</td>
        </tr>
        <tr>
            <th>How many passengers in each class?:</th>
            <td>${passengerClasses}</td>
        </tr>
        <tr>
            <th>How many passengers in each class?:</th>
            <td>${passengerClassSizes}</td>
        </tr>
        <tr>
            <th>How many died in each class?:</th>
            <td>${deadClassCounts}</td>
        </tr>
        <tr>
            <th>How many passengers embarked from Queenstown?:</th>
            <td>${numQueenstownPassengers}</td>
        </tr>
        <tr>
            <th>How many people traveled with a nanny?:</th>
            <td>${numPeopleWithNanny}</td>
        </tr>
        <tr>
            <th>Find the min and max-age:</th>
            <td>${ages}</td>
        </tr>
        <tr>
            <th>Find min and max fare:</th>
            <td>${fares}</td>
        </tr>
        <tr>
            <th>How many siblings were there?:</th>
            <td>${numSiblings}</td>
        </tr>
        <tr>
            <th>What is the survival rate of siblings vs only children?:</th>
            <td>${survivalRate}</td>
        </tr>
        <tr>
            <th>How many ages were estimated?:</th>
            <td>${numAges}</td>
        </tr>
        </table>
        `

}


function createPassengerGraph(data) {
    const container = document.getElementById('content2')
    container.style.display = 'flex'
    container.style.flexDirection = 'row'
    container.style.flexWrap = 'wrap'
    data.forEach(passenger => {
        const el = document.createElement('div')
        el.style.height = "30px"
        el.style.width = "30px"
        el.style.margin = "1px"
        // Set the color of each passenger to red if they survived and black if they did not
        el.style.backgroundColor = "black"
        if (passenger.fields.survived === "Yes") {
            el.style.backgroundColor = "red"
        }
        // Set the border radius for each passenger based on gender (sex). Use 0 for males and 50% for females.
        if (passenger.fields.sex === "female") {
            el.style.borderRadius = "50%"
        }
        container.appendChild(el)
    })
}

function createFaresBarGraph(data) {
    const container = document.getElementById('bar-graph')
    container.style.width = "100 vw"
    container.style.display = 'flex'
    container.style.flexDirection = 'row'
    container.style.alignItems = 'flex-end'
    // data.forEach(passenger => {
    //     const el = document.createElement('div')
    //     el.style.width = passenger.fields.fare
    //     el.style.height = "18px"
    //     el.style.border = "1px solid black"
    //     el.innerText = `${Math.round(passenger.fields.fare)}`
    //     container.appendChild(el)
    // })

    const fields = data.map(passenger => passenger.fields)
    seen = {}
    
    fields.forEach(({age}) => {
        age = Math.ceil(parseInt(age))
        if (isNaN(age)) {
            return
        }
        if (age in seen) {
            seen[age] += 1
        } else {
            seen[age] = 1
        }
    })
    
    const keys = Object.keys(seen).map((n) => parseInt(n))
    keys.sort((a, b) => a > b)
    console.log(keys)
    keys.forEach(key => {
        const el = document.createElement('div')
        el.style.width = `20px`
        el.style.height = seen[key]
        el.style.border = "1px solid black"
        el.style.backgroundColor = "lightblue"
        container.appendChild(el)
    })

    const labels = document.getElementById('labels')
    labels.style.width = "100 vw"
    labels.style.display = 'flex'
    labels.style.flexDirection = 'row'
    labels.style.alignItems = 'flex-end'
    keys.forEach(key => {
        const el = document.createElement('div')
        el.style.width = `20px`
        el.style.height = "20px"
        // el.style.border = "1px solid black"
        el.style.textAlign = "center"
        el.innerText = `${key}`
        labels.appendChild(el)
    })
}