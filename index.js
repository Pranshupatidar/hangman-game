const figurePart = document.querySelectorAll('.figure-part');
const wrongLetterEl = document.getElementById('wrong-letters');
const wordEl = document.getElementById('word');
const popupContainer = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playButton = document.getElementById('play-button');
const notificationContainer = document.getElementById('notification-container');

const words = ['avengers','inception','memento','interstellar','godzilla'];

const correctWord = [];
const wrongWord = [];

let selectedWord = words[Math.floor(Math.random() * words.length)];

console.log(selectedWord);

//updateWrongElements
function updateWrongEl(){
    //Show wrong letter area
    wrongLetterEl.innerHTML = `
    ${wrongWord.length > 0 ? '<p>Wrong Letters</p>' : ''}
    ${wrongWord.map(letter => `<span>${letter}</span>`)}
    `;

    //Display parts for each wrong word
    figurePart.forEach((part, index) => {
        const errors = wrongWord.length;

        if (index < errors){
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    });
     
    //Check if lost
    if(figurePart.length === wrongWord.length){
        finalMessage.innerText = 'Unfortunately! You lost';
        popupContainer.style.display = 'flex';
    }
}


//Show notification
function showNotification(){
    notificationContainer.classList.add("show");

    setTimeout(() => {
        notificationContainer.classList.remove("show");
    },2000);
}

//Show correct word
function showCorrectLetter(){
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctWord.includes(letter) ? letter : ''}
                </span>`
            ).join('')
        }   
    `;

    const innerWord = wordEl.innerText.replace(/\n/g,'');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You won';
        popupContainer.style.display = 'flex';
    }
}

//Event listener on alphabet press
window.addEventListener('keydown', e => {
    //Check if its alphabet
    let letter = e.key;
    if(e.keyCode>=65 && e.keyCode<=90){
        //check if its in selectedWord
        if(selectedWord.includes(letter)){
            //check if its already in correctWord Array
            if(!correctWord.includes(letter)){
                //push it in 
                correctWord.push(letter);
                showCorrectLetter();
            } else{
                showNotification();
            }
        }else{ //If not in selectedWord
            //check if its already in wrongWord Array
            if(!wrongWord.includes(letter)){
                //push it in 
                wrongWord.push(letter);
                updateWrongEl();
            } else{
                showNotification();
            }
        }
    }
});

//Play Again button
playButton.addEventListener('click',() => {
    //Empty the arrays
    correctWord.splice(0);
    wrongWord.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    showCorrectLetter();
    updateWrongEl();

    popupContainer.style.display = 'none';

});

showCorrectLetter();

