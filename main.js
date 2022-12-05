import Graph from "./countriesChart.js";

//Todo function that gets countries data
async function getCountriesData() {
  const countriesPromise = await fetch("./countriesData.json");
  const countries_data = await countriesPromise.json();
  return countries_data;
}


//Todo func to sort based on population or languageCount callback.
async function sortDecendingandTopTen(
  type = "p or l",
  arrOfObjects = [],
  callback
) {
  if (type == "l" || type == "L" || type == "p" || type == "P") {
    let copyArr = [];
    if (arrOfObjects.length > 0) {
      copyArr = [...callback(type, arrOfObjects)]; // formats based on type and copies it to copyArr

      if (type == "p" || type == "P") {
        copyArr.sort((a, b) => b.population - a.population);
        copyArr = copyArr.slice(0, 10);
        return { type: "population", arr: copyArr };
      } else if (type == "l" || type == "L") {
        copyArr.sort((a, b) => b.count - a.count);
        copyArr = copyArr.slice(0, 10);
        return { type: "language", arr: copyArr };
      }
    }
  } else {
    return new Error("Not a valid type input");
  }
}

//Todo func for formatting language to count || country to population
function langOrPop(type, obj) {
  //! check for type then act accordingly
  if (type == "l" || type == "L") {
    let lang = new Set();

    // loops and makes a set of languages
    for (let item of obj) {
      for (let language of item.languages) {
        lang.add(language);
      }
    }
    const langArr = [...lang]; // array of lang set

    //! loops and makes a count of languages occurrences in each country
    let langArrCount = []; // count of languages occurrences
    langArr.forEach((language) => {
      let arr = [];
      for (let item of obj) {
        let currentArr = [];
        for (let item2 of item.languages) {
          if (language == item2) {
            currentArr.push(item2);
          }
        }
        if (currentArr.length > 0) {
          arr.push(...currentArr);
        }
      }
      langArrCount.push(arr.length);
    });

    // loop to pair langArr with arrCount
    let langAndCountArray = []; // array of obj of language and count
    for (let i = 0; i < langArr.length; i++) {
      langAndCountArray.push({ language: langArr[i], count: langArrCount[i] });
    }
    return langAndCountArray;
  } else if (type == "p" || type == "P") {
    let langAndPopArray = []; // array of obj of country and population

    for (let item of obj) {
      langAndPopArray.push({
        country: item.name,
        population: item.population,
      });
    }
    return langAndPopArray;
  } else {
    return null;
  }
}

//Todo function for making top ten based on btn clicked
async function chartIt(event) {
  const countriesData = await getCountriesData();
  const chartTitle = document.querySelector("#infoParagraph"); // gets the title(p tag) tag of the chart

  if (event.target.classList[1] == "lang-btn"){
    const arrData = await sortDecendingandTopTen("l", countriesData, langOrPop)
    let graph = new Graph(arrData);
    graph.graphIt();
    chartTitle.innerText = "10 Most spoken languages in the world";
  }
  else if (event.target.classList[1] == "pop-btn"){
    const arrData = await sortDecendingandTopTen("p", countriesData, langOrPop)
    let graph = new Graph(arrData);
    graph.graphIt();
    chartTitle.innerText = "10 Most populated countries in the world";
  }

}
const graphBtn = document.getElementsByClassName("btn");// gets button to make and display graph
for (let btn of graphBtn){
  btn.addEventListener("click",chartIt);
}
