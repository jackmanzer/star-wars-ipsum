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

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// Write password to the #password input
function writePassword() {  
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

let ipsumString = '';


function getPeople() {
    // fetch request gets a list of all the repos for the node.js organization
  
    fetch('https://swapi.dev/api/people')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
}

function getFilms() {
    // fetch request gets a list of all the repos for the node.js organization
  
    fetch('https://swapi.dev/api/films')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
}

function getStarships() {
    // fetch request gets a list of all the repos for the node.js organization
  
    fetch('https://swapi.dev/api/starships')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
}
function getVehicles() {
    // fetch request gets a list of all the repos for the node.js organization
  
    fetch('https://swapi.dev/api/vehicles')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
}

function getSpecies() {
    // fetch request gets a list of all the repos for the node.js organization
  
    fetch('https://swapi.dev/api/species')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
}

function getPlanets() {
    // fetch request gets a list of all the repos for the node.js organization
  
    fetch('https://swapi.dev/api/planets')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
}

function init(){
    getPeople();
    getFilms();
    getStarships();
    getVehicles();
    getSpecies();
    getPlanets();
}
init();


//event-listeners 
codeButtonsDiv.addEventListener('click', changeButtonColor);
