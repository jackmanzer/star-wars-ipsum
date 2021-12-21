//dom queries
const lengthButtonsContainer = document.querySelector('#length-buttons-container');
const lengthButtons = lengthButtonsContainer.children;
const wordsButton = document.querySelector('#words-button');
const paragraphButton = document.querySelector('#paragraphs-button');

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
            buttons[i].classList.remove('button_active');
            buttons[i].classList.add('button_inactive');
        }
        e.target.classList.remove('button_inactive');
        e.target.classList.add('button_active');
        formButtonAudio.play();
    } 
};

//FETCH DATA FROM BACKEND 
const createDataObject = async () => {
    try {
        let [characterData, planetsData, speciesData, vehiclesData, weaponsData] = await Promise.all([
          fetch("/characters").then((res) => res.json()),
          fetch("/planets").then((res) => res.json()),
          fetch("/species").then((res) => res.json()),
          fetch("/vehicles").then((res) => res.json()),
          fetch("/weapons").then((res) => res.json()),
        ]);
        const data = await {
            characters: characterData.map((result) => result.name),
            planets: planetsData.map((result) => result.name),
            species: speciesData.map((result) => result.name),
            vehicles: vehiclesData.map((result) => result.name),
            weapons: weaponsData.map((result) => result.name),
        }
        return data;
    }
    catch(err) {
        console.log(err);
    };
}

const generateIpsumString = (data, numberOfWords) => {

    createDataObject();
    
    let ipsumString = '';

    let currentWordCount = 0;

    while(currentWordCount !== numberOfWords){
        //get random choice 
        let randomSelectionNum = Math.floor(Math.random() * 5);
        let randomArray = [ 
                generateRandomCharacter(data), 
                generateRandomWeapon(data),
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
            ipsumString = newString;
            // writeIpsumString(IpsumStringConvertedToSentence);
            return ipsumString;
        } else if(currentWordCount > numberOfWords){ 
            currentWordCount = ipsumString.match(/(\w+)/g).length;   
        }
    }
};

const generateIpsumSentence = () => {

};

const generateIpsumParagraphs = (numberOfParagraphs) => {
    const shortParagraph = createShortParagraph(data);
    const mediumParagraph = createShortParagraph(data);
    const longParagraphWord = createLongParagraph(data);
};

const convertIpsumStringtoSentence = (ipsumString) => {
    const trimmedString = ipsumString.trim();
    const capitalizedString = capitalizeAString(trimmedString);
    const IpsumStringConvertedToSentence = capitalizedString + '.';
    return IpsumStringConvertedToSentence;
};

const createShortParagraph = (data) => {
    // const shortParagraphText = generateIpsumString(data, 30);
    const shortParagraph = convertIpsumStringtoSentence(shortParagraphText);
    return shortParagraph; 
}

const createMediumParagraph = (data) => {
    let mediumParagraph = '';
    // const mediumParagraphText = generateIpsumString(data, 60);
    const mediumParagraphText = 
    'Slave 1 rodians hoth disruptor kamino thermal detonator mirialans Han solo y-wing bb-8 endor alderaan boba fett mustafar pulse cannon hoth princess leia darth vader thermal detonator Ewok boba fett neimoidians seismic charge rodians coruscant mustafar ion blaster millennium falcon alderaan alderaan Coruscant princess leia disruptor pulse cannon imperial shuttle pulse cannon gungan millennium falcon endor r2-d2';
    const stringArray = mediumParagraphText.split(' ');
    //add punctuation and capitalization
    stringArray[0] = capitalizeAString(stringArray[0]);
    stringArray.splice(9, 0, '.');
    stringArray[10] = capitalizeAString(stringArray[10]);
    stringArray.splice(17, 0, ',');
    stringArray.splice(24, 0, ',');
    stringArray.splice(31, 0, '.');
    stringArray[32] = capitalizeAString(stringArray[32]);
    stringArray.splice(46, 0, ',');
    stringArray.splice(52, 0, '.');
    stringArray[53] = capitalizeAString(stringArray[53]);
    stringArray.push('.');
    //add spaces 
    for(element in stringArray) {
       if(stringArray[element] == '.' || stringArray[element] == ',') {
            mediumParagraph += stringArray[element]; 
       } else {
            mediumParagraph += ' ' + stringArray[element]; 
       }
    };
    //trim space off the front 
    const trimmedParagraph = mediumParagraph.trim();
    return trimmedParagraph; 
};

const createLongParagraph = (data) => {
    let longParagraph = '';
    const longParagraphText = 
    `mustafar rodians rodians hoth sandcrawler pulse cannon seismic charge millennium falcon alderaan princess leia bowcaster endor y-wing zeltrons mustafar chewbacca naboo rodians endor gungan lightsaber Hoth star destroyer gungan kamino neimoidians iktochi twi'lek tatooine zeltrons luke skywalker thermal detonator boba fett neimoidians ion blaster jawa jawa pulse cannon bespin sandcrawler naboo millennium falcon tatooine bb-8 hoth r2-d2 jawa slugthrower jawa keshiri ion blaster star destroyer coruscant hoth boba fett slugthrower han solo bespin gungan gungan gungan hoth alderaan imperial shuttle thermal detonator luke skywalker boba fett slave 1 millennium falcon hoth hoth imperial shuttle tatooine blaster`
    const stringArray = longParagraphText.split(' ');
    //add punctuation and capitalization
    stringArray[0] = capitalizeAString(stringArray[0]);
    stringArray.splice(19, 0, ',');
    stringArray.splice(27, 0, '.');
    stringArray[28] = capitalizeAString(stringArray[28]);
    stringArray.splice(36, 0, ',');
    stringArray.splice(41, 0, ',');
    stringArray.splice(53, 0, '.');
    stringArray[54] = capitalizeAString(stringArray[54]);
    stringArray.splice(59, 0, '.');
    stringArray[60] = capitalizeAString(stringArray[60]);
    stringArray.splice(63, 0, '.');
    stringArray[64] = capitalizeAString(stringArray[64]);
    stringArray.splice(73, 0, '.');
    stringArray[74] = capitalizeAString(stringArray[74]);
    stringArray.splice(80, 0, ',');
    stringArray.splice(84, 0, ',');
    stringArray.splice(90, 0, '.');
    stringArray[91] = capitalizeAString(stringArray[91]);
    stringArray.push('.');
    for(element in stringArray) {
        if(stringArray[element] == '.' || stringArray[element] == ',') {
             longParagraph += stringArray[element]; 
        } else {
             longParagraph += ' ' + stringArray[element]; 
        }
     };
     //trim space off the front 
     const trimmedParagraph = longParagraph.trim();
     return trimmedParagraph;
};



function capitalizeAString(word){
    const capitalizedFirstLetter = word.charAt(0).toUpperCase();
    const stringRemainder = word.slice(1);
    const capitalizedWord = capitalizedFirstLetter + stringRemainder;
    return capitalizedWord;
}

//TODOS 
//edit create sentence functionality 
//edit short paragraph functionality 
//add to lowercase();



//if words is selected 
//capitalize ipsum string and add a period to the end 
//else if sentences is selected 
//Create short long and medium paragraph lengths


//short is 30 words. 
//medium is 60 words.
//long is 100 words. 



//generate a random person
const generateRandomCharacter = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomChararacter = data.characters[randomNumber]; 
    return randomChararacter;
};

//generate a random planet 
const generateRandomPlanet = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomPlanet = data.planets[randomNumber]; 
    return randomPlanet; 
};

//generate a random species 
const generateRandomSpecies = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomSpecies = data.species[randomNumber]; 
    return randomSpecies; 
};

//generate a random vehicle 
const generateRandomVehicle = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomVehicle = data.vehicles[randomNumber]; 
    return randomVehicle; 
};

//generate a random vehicle 
const generateRandomWeapon = (data) => {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomWeapon = data.weapons[randomNumber]; 
    return randomWeapon; 
};




const writeIpsumString = (ipsumString) => {
    generatedIpsumContainer.textContent = ipsumString;
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    //play form submission sound
    formSubmitAudio.play();
    //validate IpsumAmountControl Input 
    if(/\D/.test(IpsumAmountControl.value)){
        alert('please enter a number');
        IpsumAmountControl.value = '';
    } else {
    //store input value 
    const IpsumAmountControlValue = Number(IpsumAmountControl.value); 
    //initiate loading state 
        IpsumForm.classList.add('display-none');
        generatedIpsumSection.classList.remove('display-none');
        loadingCopy.classList.remove('display-none');
    //check length button selection 
    if(wordsButton.classList.contains('button_active')){
        //create sentence 
        createIpsumSentence(IpsumAmountControlValue);
    } else if(paragraphButton.classList.contains('button_active')) {
        //create paragraphs 
        createIpsumParagraphs(IpsumAmountControlValue);
    }  



    // createDataObject()
    //         .then((data) => generateIpsumString(data, IpsumAmountControlValue))
    //         .then(() => {
    //             loadingCopy.classList.add('display-none');
    //             generatedIpsumButtonContainer.classList.remove('display-none');
    //             generatedIpsumContainer.classList.remove('display-none');
    //         })   

      
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

// const getTag = (tagButtons) => {
//     const activeButton = tagButtons.filter(button => button.classList.contains('active'));
//     const tagString = activeButton.textContent;
//     return tagString;
// }

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

