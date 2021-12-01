//dom queries
const codeButtonsDiv = document.querySelector('.code-buttons');

const codeButtons = codeButtonsDiv.children;

function changeButtonColor(e){  
    e.preventDefault();
    console.log(e.target.tagName);
    if(e.target.tagName === 'BUTTON'){
        for(let i = 0; i < codeButtons.length; i++){
            codeButtons[i].style.backgroundColor = 'white';
            codeButtons[i].style.color = 'black';
        }
        e.target.style.backgroundColor = 'black';
        e.target.style.color = 'white';
    } 
};

// // Assignment Code
// var generateBtn = document.querySelector("#generate");

// // Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);


// // Write password to the #password input
// function writePassword() {  
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");
//   passwordText.value = password;
// }

// let ipsumString = '';

const createDataObject = async () => {
    try {
        let [peopleData, filmsData, starshipsData, vehiclesData, planetsData, speciesData] = await Promise.all([
          fetch("https://swapi.dev/api/people/").then((res) => res.json()),
          fetch("https://swapi.dev/api/films/").then((res) => res.json()),
          fetch("https://swapi.dev/api/starships/").then((res) => res.json()),
          fetch("https://swapi.dev/api/vehicles/").then((res) => res.json()),
          fetch("https://swapi.dev/api/planets/").then((res) => res.json()),
          fetch("https://swapi.dev/api/species/").then((res) => res.json()),
        ]);
        const data = await {
            people: peopleData.results.map((result) => result.name),
            films: filmsData.results.map((result) => result.title),
            starships: starshipsData.results.map((result) => result.name),
            vehicles: vehiclesData.results.map((result) => result.model),
            planets: planetsData.results.map((result) => result.name),
            species: speciesData.results.map((result) => result.name)
        }
        console.log(data);
        return data;
    }
    catch(err) {
        console.log(err);
    };
}
createDataObject().then((data) => generateIpsumString(data));

const generateIpsumString = (data, numberOfWords) => {
    
    let ipsumString = '';

    let wordCount = 0;

    while(wordCount < numberOfWords){
        //get random choice 
        let randomSelectionNum = Math.floor(Math.random * 6);
        let randomArray = [ 
                generateRandomPerson(data), 
                generateRandomFilm(data),
                generateRandomStarship(data),
                generateRandomVehicle(data),
                generateRandomPlanet(data),
                generateRandomSpecies(data)
            ]
        let randomChoice = randomArray[randomSelectionNum];
        let prevStringWordCount = ipsumString.match(/(\w+)/g).length; 
        let newString = ipsumString.concat(randomChoice);
        let newStringWordCount = newString.match(/(\w+)/g).length; 

        if(newStringWordCount <= prevStringWordCount) {
            ipsumString = newString;
        } else {
        }
    }
    console.log(ipsumString);
};

//generate a random person
const generateRandomPerson = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomPerson = data.people[randomNumber]; 
    console.log(randomPerson);
};

//generate a random film 
const generateRandomFilm = (data) => {
    let randomNumber = Math.floor(Math.random() * 6);
    let randomFilm = data.films[randomNumber]; 
    console.log(randomFilm);
};

//generate a random starship
const generateRandomStarship = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomStarship = data.starships[randomNumber]; 
    console.log(randomStarship);
};

//generate a random vehicle 
const generateRandomVehicle = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomVehicle = data.vehicles[randomNumber]; 
    console.log(randomVehicle);
};

//generate a random planet 
const generateRandomPlanet = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomPlanet = data.planets[randomNumber]; 
    console.log(randomPlanet);
};

//generate a random species 
const generateRandomSpecies = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomSpecies = data.species[randomNumber]; 
    console.log(randomSpecies);
};

//check length

//use to lowercase
//event-listeners 
codeButtonsDiv.addEventListener('click', changeButtonColor);
