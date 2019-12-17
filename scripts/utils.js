

/*
GLOBAL VARIABLES
 */
const characterURI = 'https://anapioficeandfire.com/api/characters';
const characterIds = {
    583: {id: 583, image: 'assets/card-jon-snow.jpg', token: 'assets/token-jon-snow.png'},
    271: {id: 271, image: 'assets/card-daenerys.jpg', token: 'assets/token-daenerys.png'},
    148: {id: 148, image: 'assets/card-arya.jpg', token: 'assets/token-arya.png'},
    957: {id: 957, image: 'assets/card-sansa.jpg', token: 'assets/token-sansa.png'},
    213: {id: 213, image: 'assets/card-bran.jpg', token: 'assets/token-bran.png'},
    529: {id: 529, image: 'assets/card-jaime.jpg', token: 'assets/token-jaime.png'},
    954: {id: 954, image: 'assets/card-samwell.jpg', token: 'assets/token-samwell.png'},
    1052: {id: 1052, image: 'assets/card-tyrion.jpg', token: 'assets/token-tyrion.png'},
    238: {id: 238, image: 'assets/card-cersei.jpg', token: 'assets/token-cersei.png'},
    743: {id: 743, image: 'assets/card-melisandre.jpg', token: 'assets/token-melisandre.png'},
};

/*
HELPERS
 */
const createDivElement = function() {
    return document.createElement('div');
};
const createImageElement = function() {
    return document.createElement('img');
};
const elementById = function (id) {
    return document.querySelector(`#${id}`);
};

/*
DOM SELECTORS
 */
const characterRow = elementById('charactersRow');
const characterToken = elementById('characterToken');


/*
RENDER FUNCTIONS
 */
const renderCharacters = function (characters) {
    characters.forEach(character => {
        characterRow.innerHTML += `
    <div class="col-md-3">
        <div class="card h-100" tabindex="0">
            <img src="${character.image}" class="card-img-top" alt="character-image" data-char-name="${character.name}">
            <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="card-text">${character.titles}</p>
            </div>
        </div>
    </div>    
    `
    });
};

const renderCharacterToken = function(character) {
    if (!character) {
        return;
    }
    const charTokenImage = createImageElement();
    charTokenImage.setAttribute('src', character.token);
    charTokenImage.setAttribute('alt', character.name);
    characterToken.appendChild(charTokenImage);

    const previous = parseInt(LocalStorage.get(StorageKeys.PREVIOUS_BOARD_NUMBER));
    const current = parseInt(LocalStorage.get(StorageKeys.CURRENT_BOARD_NUMBER));
    moveCharacterToken(character, previous, current);
};

const moveCharacterToken = function(character, previous, current) {

    if (isNaN(previous) || isNaN(current)) {
        return;
    }
    const characterToken = createImageElement();
    characterToken.setAttribute('src', character.token);

    const container = elementById('board-tile-' + current);
    container.appendChild(characterToken);

    removeCharacterToken(previous);
};

const removeCharacterToken = function(previous) {

    if (previous < 1) {
        return
    }

    const container = elementById('board-tile-' + previous);
    const nodes = container.childNodes;
    let image;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName === 'IMG') {
            image = nodes[i];
        }
    }
    if (image) {
        container.removeChild(image);
    }
};

const getNumberOfStepsBack = function(currentBoardNumber, dice) {
    const stepsToGoal = 30 - currentBoardNumber;
    const numberOfStepsBack = dice - stepsToGoal;
    return 30 - numberOfStepsBack;
};
/*
UTILS
 */

const findCharacter = function(name, characterArray) {
  return characterArray.find( char => {
      return char.name === name;
  })
};

const createStepArray = function(pStart, pEnd) {
    const array = [];
    const start = pStart ? pStart : 1;
    for(let i = start; i <= pEnd; i++) {
        array.push(i);
    }
    return array;
};

const sleep = function(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
};

const sleepAsync = function(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

(function(){
    console.log('===== UTILS LOADED =====');
})();
