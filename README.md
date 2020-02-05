# [Titanic data visualization](https://anisha7.github.io/titanicdata/)


## Description
This project experiments with different data visulization techniques to display [titanic dataset](https://www.kaggle.com/c/titanic/data). It uses bar graphs, tables, shapes, and more to better analyze the data provided.

The utils file consists of some general graph visualization functions that can be reused with different data values, given the correct format.

## Getting started (how to run the project)
1. Clone or download repository
2. Open index.html in your browser

## [Link to live project](https://anisha7.github.io/titanicdata/)


## Background Information
This titanic data set comes from Kaggle's Machine Learning challenge. The sinking of titanic is one of the most infamous shipwrecks in history. The data spikes our curiosity with regards to gender distributions, children on board, survival ratios, and more. Thus, this project focuses on 

## Implementation
You could reuse my implementation below if you like any of the visualizations. 


### utils.js
utils.js consists of helper functions that create sorted and unsorted bar graphs and a data table based on any data you provide. 

```

createDataTable(data, id)
```
This function takes in a data paramater which are key, value pairs. The keys are the row category and value is the row value. This creates a 2 column table.
This also takes in an id, which is the id of the html div you want to append the graph to.
This function can be customized to take in a key, value pair where value is an array of values. This customization would allow you to make a n-column graph.

```
createBarGraph(data, total, id)
```
This function takes in a data object containing "label": number, a total number, and id for html div to append graph to

```
function createSortedBarGraph(data, id)
```
This is similar to above but the keys in data have to be numbers for the graph to sort by.

## Progress evaluation
| Expectation | Doe not meet | Meets | Exceeds |
|:-------------|:------------------|:----------------|:-----------------|
| **Aesthetics** | Visitors are not sure what they are looking at | ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `Viewers easily understand the facts and figures contained in teh Titanic data` | Viewers are intrgued and interested by the data presented |
| **Completion** | Contains fewer than 7 charts | ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `Contains 7 charts including an interactive chart` | Contains charts that go beyond what was described in the homework description |
| **Code quality** | The code is sloppy and unorganized or throws errors and warnings | Code is well organized and works without errors | ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) `Shows no linter errors or warnings` |