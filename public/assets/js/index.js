
/* table of contents

1. dom queries 
   1.1 length buttons 
   1.2 tag buttons 
   1.3 ipsum form 
   1.4 load state 
   1.5 generate ipsum section
   1.6 audio clips 

2. change button class 

3. fetch data 

4. generate ipsum function 
    4.1 generate random functions 

5. generate sentences and paragraphs with tags 
    5.1 utility functions 
    5.2 generate ipsum sentence 
    5.3 generate different paragraph sizes 
    5.4 generate ipsum paragraphs 

6. load states

7. generate ipsum section functions 

8. handle form submission 

9. event listeners 

*/

//1. dom queries 
//1.1 length buttons 
const lengthButtonsContainer = $('#length-buttons-container');
const lengthButtons = lengthButtonsContainer.children();
const wordsButton = $('#words-button');
const paragraphButton = $('#paragraphs-button');

//1.2 tag buttons 
const tagButtonsContainer = $('#tag-buttons-container');
const tagButtons = tagButtonsContainer.children();
const pTagButton = $('#p-tag-button');
const liTagButton = $('#li-tag-button');
const divTagButton = $('#div-tag-button');
const spanTagButton = $('#span-tag-button');
const noTagButton = $('#no-tag-button');

//1.3 ipsum form
const IpsumForm = $('#ipsum-form');
const IpsumAmountControl = $('#ipsum-amount-control');

//1.4 load state 
const loadingCopy = $('#loading-copy');

//1.5 generate ipsum section 
const generatedIpsumSection = $('#generated-ipsum-section');
const generatedIpsumButtonContainer = $('#generated-ipsum-button-container');
const generatedIpsumContainer = $('#generated-ipsum-container');
const backButton = $('#back-button');
const copyIpsumButton = $('#copy-ipsum-button');
const tooltip = $('#tooltip');
const tooltipText = $('#tooltiptext');

//1.6 audio clips
const formButtonAudio = $('#form-button-audio');
const formSubmitAudio = $('#form-submit-audio');
const copyButtonAudio = $('#copy-button-audio');
const backButtonAudio = $('#back-button-audio');


//2. change button class 

function changeButtonClass(e, buttons) {
    e.preventDefault();                             
    buttons.removeClass('button_active');
    buttons.addClass('button_inactive');

    if($(e.target).prop('tagName') === 'BUTTON'){
        $(e.target).addClass('button_active');
        formButtonAudio[0].play();
    }
}

//3. fetch data 
async function createDataObject() {
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
    catch (err) {
        console.log(err);
    };
}

//4 generate ipsum function 

async function generateIpsumString(numberOfWords) {
    //fetch data 
    const data = await createDataObject();
    //initialize ipsumString
    let currentIpsumString = '';
    //initialize string word count 
    let currentWordCount = 0;

    while (currentWordCount !== numberOfWords) {

        //generate random word from data 
        let randomSelectionNum = Math.floor(Math.random() * 5);
        let randomArray = [
            generateRandomCharacter(data),
            generateRandomWeapon(data),
            generateRandomVehicle(data),
            generateRandomPlanet(data),
            generateRandomSpecies(data)
        ]
        let randomChoice = randomArray[randomSelectionNum];

        //add to string 
        let newIpsumString = currentIpsumString.concat(' ' + randomChoice);
        //add to word count 
        currentWordCount = newIpsumString.match(/(\w+)/g).length;

        if (currentWordCount < numberOfWords) {
            currentIpsumString = newIpsumString;
        }
        else if (currentWordCount === numberOfWords) {
            currentIpsumString = newIpsumString;
            return currentIpsumString;
        } else if (currentWordCount > numberOfWords) {
            currentWordCount = currentIpsumString.match(/(\w+)/g).length;
        }
    }
};

//4.1 generateRandomFunctions 

function generateRandomCharacter(data) {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomChararacter = data.characters[randomNumber];
    return randomChararacter;
};

function generateRandomPlanet(data) {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomPlanet = data.planets[randomNumber];
    return randomPlanet;
};

function generateRandomSpecies(data) {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomSpecies = data.species[randomNumber];
    return randomSpecies;
};

function generateRandomVehicle(data) {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomVehicle = data.vehicles[randomNumber];
    return randomVehicle;
};

function generateRandomWeapon(data) {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomWeapon = data.weapons[randomNumber];
    return randomWeapon;
};

//5 generate sentences and paragraphs with tags 


//5.1 utility functions 

function convertIpsumStringtoSentence(ipsumString) {
    const trimmedString = ipsumString.trim();
    const lowercasedString = trimmedString.toLowerCase();
    const capitalizedString = capitalizeAString(lowercasedString);
    const IpsumStringConvertedToSentence = capitalizedString + '.';
    return IpsumStringConvertedToSentence;
};

function capitalizeAString(word) {
    const capitalizedFirstLetter = word.charAt(0).toUpperCase();
    const stringRemainder = word.slice(1);
    const capitalizedWord = capitalizedFirstLetter + stringRemainder;
    return capitalizedWord;
}

function addTagToIpsumString(ipsumString) {
    const activeButton = tagButtonsContainer.find('.button_active').text();

    if(activeButton === '<p>'){
        ipsumString = `<p>${ipsumString}</p>`
    } else if(activeButton === '<li>'){
        ipsumString =`<li>${ipsumString}</li>`
    } else if(activeButton === '<div>'){
        ipsumString = `<div>${ipsumString}</div>`
    } else if(activeButton === '<span>'){
        ipsumString = `<span>${ipsumString}</span>`
    } else {
    }
    return ipsumString;
}


//5.2 generate ipsum sentence 

async function generateIpsumSentence(numberOfWords) {

    const ipsumString = await generateIpsumString(numberOfWords);
    const ipsumSentence = convertIpsumStringtoSentence(ipsumString);
    const ipsumSentenceWithTags = addTagToIpsumString(ipsumSentence);
    generatedIpsumContainer.text(ipsumSentenceWithTags);
    return;
};

//5.3 generate different paragraph sizes 

async function createShortParagraph() {
    const shortParagraphText = await generateIpsumString(30);
    const shortParagraph = convertIpsumStringtoSentence(shortParagraphText);
    return shortParagraph;
}

async function createMediumParagraph(data) {
    let mediumParagraph = '';
    const generatedIpsum = await generateIpsumString(60);
    const lowercasedIpsum = generatedIpsum.toLowerCase();
    const stringArray = lowercasedIpsum.split(' ');
    //add punctuation and capitalization
    stringArray[1] = capitalizeAString(stringArray[1]);
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
    for (element in stringArray) {
        if (stringArray[element] == '.' || stringArray[element] == ',') {
            mediumParagraph += stringArray[element];
        } else {
            mediumParagraph += ' ' + stringArray[element];
        }
    };
    //trim space off the front 
    const trimmedParagraph = mediumParagraph.trim();
    return trimmedParagraph;
};

async function createLongParagraph(data) {
    let longParagraph = '';
    const generatedIpsum = await generateIpsumString(100);
    const lowercasedIpsum = generatedIpsum.toLowerCase();
    const stringArray = lowercasedIpsum.split(' ');
    //add punctuation and capitalization
    stringArray[1] = capitalizeAString(stringArray[1]);
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
     //add spaces 
    for (element in stringArray) {
        if (stringArray[element] == '.' || stringArray[element] == ',') {
            longParagraph += stringArray[element];
        } else {
            longParagraph += ' ' + stringArray[element];
        }
    };
    //trim space off the front 
    const trimmedParagraph = longParagraph.trim();
    return trimmedParagraph;
};

//5.4 generate ipsum paragraphs 

async function generateIpsumParagraphs(numberOfParagraphs) {

    let generatedIpsum = '';

    for (let i = 0; i < numberOfParagraphs; i++) {

        const randomSelectionNum = Math.floor(Math.random() * 3);
        let generatedParagraph = ''

        if (randomSelectionNum === 1) {
            generatedParagraph = await createShortParagraph()
        } else if (randomSelectionNum === 2) {
            generatedParagraph = await createMediumParagraph()
        } else {
            generatedParagraph = await createLongParagraph()
        }
        //add tags 
        const paragraphWithTags = addTagToIpsumString(generatedParagraph);
        generatedIpsum += paragraphWithTags.concat('\r\n\r\n');
    };
    generatedIpsumContainer.text(generatedIpsum.trim());
    return;
};

//6. load states 

function intiateLoadingState() {
    IpsumForm.addClass('display-none');
    generatedIpsumSection.removeClass('display-none');
    loadingCopy.removeClass('display-none');
}

function endLoadingState() {
    loadingCopy.addClass('display-none');
    generatedIpsumButtonContainer.removeClass('display-none');
    generatedIpsumContainer.removeClass('display-none');
    expandTextAreaHeight();
}

//7. generate ipsum section functions 

function resetApp() {
    backButtonAudio[0].play();
    generatedIpsumButtonContainer.addClass('display-none');
    generatedIpsumContainer.addClass('display-none');
    IpsumForm.removeClass('display-none');
};

function expandTextAreaHeight() {
    generatedIpsumContainer.css('height', 'inherit');
    const height = generatedIpsumContainer[0].scrollHeight;
    generatedIpsumContainer.css('height', height + 'px');
}

function copyIpsumToClipboard() {
    generatedIpsumContainer[0].select();
    generatedIpsumContainer[0].setSelectionRange(0, 99999);
    navigator.clipboard.writeText(generatedIpsumContainer[0].value);
    tooltipText.text('Copied!')
    tooltipText.addClass('tooltip-clicked')
    copyButtonAudio[0].play();
    setTimeout(() => {
        tooltipText.text("Copy to Clipboard");
        tooltipText.removeClass('tooltip-clicked')
    }, 900);
};

//8. handle form submission 

function handleFormSubmit(e) {
    e.preventDefault();
    //validate IpsumAmountControl Input 
    if (/\D/.test(IpsumAmountControl.val())) {
        alert('please enter a number');
        IpsumAmountControl.val() = '';
    } else {
         //play form submission sound
        formSubmitAudio[0].play();
        //store input value 
        const IpsumAmountControlValue = Number(IpsumAmountControl.val());
        //initiate loading state 
        intiateLoadingState();
        //check length button selection 
        if (wordsButton.hasClass('button_active')) {
            //generate sentence 
            generateIpsumSentence(IpsumAmountControlValue)
                .then(() => setTimeout(endLoadingState, 3000));
        } else if (paragraphButton.hasClass('button_active')) {
            //generate paragraphs 
            generateIpsumParagraphs(IpsumAmountControlValue)
                .then(() => setTimeout(endLoadingState, 3000));
        }
    }
}

//9. event listeners 
lengthButtonsContainer.click((e) => changeButtonClass(e, lengthButtons));
tagButtonsContainer.click((e) => changeButtonClass(e, tagButtons));
IpsumForm.submit(handleFormSubmit);
backButton.click(resetApp);
copyIpsumButton.click(copyIpsumToClipboard);

