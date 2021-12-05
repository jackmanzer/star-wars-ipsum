//dom queries
const codeButtonsDiv = document.querySelector('.code-buttons');
const generatedTextContainer = document.querySelector('.generated-text');
const input = document.querySelector('#input');
const form = document.querySelector('#form');
const placeholder = document.querySelector('#placeholder');
const loadingAnimation = document.querySelector('#loading');

//GLOBAL VARIABLES
let numberOfWords = 0;

const codeButtons = codeButtonsDiv.children;

function changeButtonColor(e){  
    e.preventDefault();
    console.log(e.target.tagName);
    if(e.target.tagName === 'BUTTON'){
        for(let i = 0; i < codeButtons.length; i++){
            codeButtons[i].style.backgroundColor = 'black';
            codeButtons[i].style.color = 'white';
        }
        e.target.style.backgroundColor = 'white';
        e.target.style.color = 'black';
    } 
};



const updateNumberOfWords = () => {
    numberOfWords = input.value;
    console.log('hello');
    console.log(numberOfWords);
}

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
        return data;
    }
    catch(err) {
        console.log(err);
    };
}

// generateIpsumString(data, 44)

const generateIpsumString = (data, numberOfWords) => {
    
    let ipsumString = '';

    let currentWordCount = 0;

    while(currentWordCount !== numberOfWords){
        //get random choice 
        let randomSelectionNum = Math.floor(Math.random() * 6);
        let randomArray = [ 
                generateRandomPerson(data), 
                generateRandomFilm(data),
                generateRandomStarship(data),
                generateRandomVehicle(data),
                generateRandomPlanet(data),
                generateRandomSpecies(data)
            ]
        console.log(randomArray);
        let randomChoice = randomArray[randomSelectionNum];
        let newString = ipsumString.concat(' ' + randomChoice);
        currentWordCount = newString.match(/(\w+)/g).length; 

        if (currentWordCount < numberOfWords) {
            ipsumString = newString;
        }
        else if(currentWordCount === numberOfWords) {
            ipsumString = newString.toLowerCase();
            writeIpsumString(ipsumString);
            return;
        } else if(currentWordCount > numberOfWords){ 
            currentWordCount = ipsumString.match(/(\w+)/g).length;   
        }
    }
};

//generate a random person
const generateRandomPerson = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomPerson = data.people[randomNumber]; 
    console.log(randomPerson);
    return randomPerson;
};

//generate a random film 
const generateRandomFilm = (data) => {
    let randomNumber = Math.floor(Math.random() * 6);
    let randomFilm = data.films[randomNumber]; 
    console.log(randomFilm);
    return randomFilm;
};

//generate a random starship
const generateRandomStarship = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomStarship = data.starships[randomNumber]; 
    console.log(randomStarship);
    return randomStarship;
};

//generate a random vehicle 
const generateRandomVehicle = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomVehicle = data.vehicles[randomNumber]; 
    console.log(randomVehicle);
    return randomVehicle; 
};

//generate a random planet 
const generateRandomPlanet = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomPlanet = data.planets[randomNumber]; 
    console.log(randomPlanet);
    return randomPlanet; 
};

//generate a random species 
const generateRandomSpecies = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomSpecies = data.species[randomNumber]; 
    console.log(randomSpecies);
    return randomSpecies; 
};

const writeIpsumString = (ipsumString) => {
    placeholder.style.display = "none";
    generatedTextContainer.textContent = ipsumString;
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    if(/\D/.test(input.value)){
        alert('please enter a number');
    } else {
        placeholder.querySelector('p').textContent = '';
        loadingAnimation.style.display = 'block';
        let inputValue = Number(input.value);
        createDataObject().then((data) => generateIpsumString(data, inputValue));
    }
}



//check length

//use to lowercase
//event-listeners 
form.addEventListener('submit', handleFormSubmit);
codeButtonsDiv.addEventListener('click', changeButtonColor);
input.addEventListener('input', updateNumberOfWords);
