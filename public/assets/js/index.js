
/* table of contents

1. dom queries 
   1.1 length buttons 
   1.2 tag buttons 
   1.3 ipsum form 
   1.4 load state 
   1.5 generate ipsum section
   1.6 audio clips 

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

//1.6 audio clips 
const formButtonAudio = $('#form-button-audio');
const formSubmitAudio = $('#form-submit-audio');
const copyButtonAudio = $('#copy-button-audio');
const backButtonAudio = $('#back-button-audio');


//CHANGE BUTTON COLORS AND TOGGLE ACTIVE BUTTON CLASSES

function toggleButtonClass(e, buttons) {
    e.preventDefault();                             
    buttons.removeClass('button_active');
    buttons.addClass('button_inactive');
    $(e.target).addClass('button_active');
    formButtonAudio[0].play();
}


function changeButtonColor(e, buttons) {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('button_active');
            buttons[i].classList.add('button_inactive');
        }
        e.target.classList.remove('button_inactive');
        e.target.classList.add('button_active');
        formButtonAudio.play();
    }
};

lengthButtonsContainer.click(function(e) {toggleButtonClass(e, lengthButtons)});
tagButtonsContainer.click(function(e) {toggleButtonClass(e, tagButtons)});


