//dom queries
const lengthButtonsContainer = document.querySelector('#length-buttons-container');
const lengthButtons = lengthButtonsContainer.children;

const IpsumAmountControl = document.querySelector('#ipsum-amount-control');
const IpsumForm = document.querySelector('#ipsum-form');

const generatedIpsumSection = document.querySelector('#generated-ipsum-section');
const generatedIpsumButtonContainer = document.querySelector('#generated-ipsum-button-container');
const generatedIpsumContainer = document.querySelector('#generated-ipsum-container');
const loadingCopy = document.querySelector('#loading-copy');

const backButton = document.querySelector('#back-button');
const copyIpsumButton = document.querySelector('#copy-ipsum-button');
const tooltip = document.querySelector('#tooltip');
const tooltipText = document.querySelector('#tooltiptext');


const formButtonAudio = document.querySelector('#form-button-audio');
const formSubmitAudio = document.querySelector('#form-submit-audio');
const copyButtonAudio = document.querySelector('#copy-button-audio');
const backButtonAudio = document.querySelector('#back-button-audio');


const tagButtonsContainer = document.querySelector('#tag-buttons-container');
const tagButtons = tagButtonsContainer.children;
const pTagButton = document.querySelector('#p-tag-button');
const liTagButton = document.querySelector('#li-tag-button');
const divTagButton = document.querySelector('#div-tag-button');
const spanTagButton = document.querySelector('#span-tag-button');
const noTagButton = document.querySelector('#no-tag-button');

//GLOBAL VARIABLES
let numberOfWords = 0;
let tagButtonValue = '';




//DOM STYLING 

function changeButtonColor(e, buttons){  
    e.preventDefault();
    if(e.target.tagName === 'BUTTON'){
        for(let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = 'black';
            buttons[i].style.color = 'white';
        }
        e.target.style.backgroundColor = 'white';
        e.target.style.color = 'black';
        formButtonAudio.play();
    } 
};

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
    generatedIpsumContainer.textContent = ipsumString;
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    formSubmitAudio.play();
    if(/\D/.test(IpsumAmountControl.value)){
        alert('please enter a number');
        IpsumAmountControl.value = '';
    } else {
        let IpsumAmountControlValue = Number(IpsumAmountControl.value);
        IpsumForm.classList.add('display-none');
        generatedIpsumSection.classList.remove('display-none');
        loadingCopy.classList.remove('display-none');
        createDataObject()
            .then((data) => generateIpsumString(data, IpsumAmountControlValue))
            .then(() => {
                loadingCopy.classList.add('display-none');
                generatedIpsumButtonContainer.classList.remove('display-none');
                generatedIpsumContainer.classList.remove('display-none');
            })        
    }
}

const resetApp = () => {
    backButtonAudio.play();
    generatedIpsumButtonContainer.classList.add('display-none');
    generatedIpsumContainer.classList.add('display-none');
    IpsumForm.classList.remove('display-none');
};


const copyIpsumToClipboard = () => {
  
//   generatedIpsumContainer.textContent.select();
//   generatedIpsumContainer.textContent.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(generatedIpsumContainer.textContent);
  tooltipText.textContent = 'Copied!'
//   tooltip.classList.add('tooltip-clicked')
  tooltipText.classList.add('tooltip-clicked')
  copyButtonAudio.play();
  setTimeout(() => {
    tooltipText.textContent = "Copy to Clipboard";
    // tooltip.classList.remove('tooltip-clicked')
    tooltipText.classList.remove('tooltip-clicked')
  }, 900);
};

const getTag = (tagButtons) => {
    const activeButton = tagButtons.filter(button => button.classList.contains('active'));
    const tagString = activeButton.textContent;
    return tagString;
}

IpsumForm.addEventListener('submit', handleFormSubmit);
lengthButtonsContainer.addEventListener('click', (e) => changeButtonColor(e,lengthButtons));
tagButtonsContainer.addEventListener('click', (e) => changeButtonColor(e,tagButtons));
backButton.addEventListener('click', resetApp);
copyIpsumButton.addEventListener('click', copyIpsumToClipboard);







// const updateNumberOfWords = () => {
//     numberOfWords = input.value;
//     console.log('hello');
//     console.log(numberOfWords);
// }

// input.addEventListener('input', updateNumberOfWords);

