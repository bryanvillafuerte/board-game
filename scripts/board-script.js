/*
GLOBAL VARS
 */
const delayMilliSeconds = 600;
const pubSub = PubSubInstance.getInstance();

/* The following functions are used to create board tiles and number them from 1-30 */
function createBoard() {
    function createBoardTiles1() {
        var numbers = [25,26,27,28,29,30]
        var numberInsert = "";
        var i;
    
        for (i = 0; i < numbers.length; i++) {
            var row = document.getElementById("boardContainer1");
    
            var boardTile = document.createElement("div");
            boardTile.setAttribute("class", "board-tile");

            if (i % 2 === 0) {
                boardTile.classList.add("board-tile-Odd");
            }
    
            numberInsert = numbers[i];
            var boardTileNumber = document.createElement("h2");
            boardTileNumber.textContent = numberInsert;
            boardTile.setAttribute("id", 'board-tile-' + numberInsert);
    
            boardTile.appendChild(boardTileNumber);
    
            row.appendChild(boardTile);
        }
    }

    function createBoardTiles2() {
        var numbers = [24,23,22,21,20,19]
        var numberInsert = "";
        var i;
    
        for (i = 0; i < numbers.length; i++) {
            var row = document.getElementById("boardContainer2");
    
            var boardTile = document.createElement("div");
            boardTile.setAttribute("class", "board-tile");
    
            if (i % 2 !== 0) {
                boardTile.classList.add("board-tile-Odd");
            }
    
            numberInsert = numbers[i];
            var boardTileNumber = document.createElement("h2");
            boardTileNumber.textContent = numberInsert;
            boardTile.setAttribute("id", 'board-tile-' + numberInsert);
    
            boardTile.appendChild(boardTileNumber);
    
            row.appendChild(boardTile);
        }
    }

    function createBoardTiles3() {
        var numbers = [13,14,15,16,17,18]
        var numberInsert = "";
        var i;
    
        for (i = 0; i < numbers.length; i++) {
            var row = document.getElementById("boardContainer3");
    
            var boardTile = document.createElement("div");
            boardTile.setAttribute("class", "board-tile");
    
            if (i % 2 === 0) {
                boardTile.classList.add("board-tile-Odd");
            }
    
            numberInsert = numbers[i];
            var boardTileNumber = document.createElement("h2");
            boardTileNumber.textContent = numberInsert;
            boardTile.setAttribute("id", 'board-tile-' + numberInsert);
    
            boardTile.appendChild(boardTileNumber);
    
            row.appendChild(boardTile);
        }
    }

    function createBoardTiles4() {
        var numbers = [12,11,10,9,8,7]
        var numberInsert = "";
        var i;
    
        for (i = 0; i < numbers.length; i++) {
            var row = document.getElementById("boardContainer4");
    
            var boardTile = document.createElement("div");
            boardTile.setAttribute("class", "board-tile");
    
            if (i % 2 !== 0) {
                boardTile.classList.add("board-tile-Odd");
            }
    
            numberInsert = numbers[i];
            var boardTileNumber = document.createElement("h2");
            boardTileNumber.textContent = numberInsert;
            boardTile.setAttribute("id", 'board-tile-' + numberInsert);
    
            boardTile.appendChild(boardTileNumber);
    
            row.appendChild(boardTile);
        }
    }

    function createBoardTiles5() {
        var numbers = [1,2,3,4,5,6]
        var numberInsert = "";
        var i;
    
        for (i = 0; i < numbers.length; i++) {
            var row = document.getElementById("boardContainer5");
    
            var boardTile = document.createElement("div");
            boardTile.setAttribute("class", "board-tile");
    
            if (i % 2 === 0) {
                boardTile.classList.add("board-tile-Odd");
            }
    
            numberInsert = numbers[i];
            var boardTileNumber = document.createElement("h2");
            boardTileNumber.textContent = numberInsert;
            boardTile.setAttribute("id", 'board-tile-' + numberInsert);
    
            boardTile.appendChild(boardTileNumber);
    
            row.appendChild(boardTile);
        }
    }


    createBoardTiles1();
    createBoardTiles2();
    createBoardTiles3();
    createBoardTiles4();
    createBoardTiles5();
}



/* Dice Rolloer */
var dice1 = {
    sides: 6,
    roll: function () {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    }
}

function printNumber(number) {
    var placeholder = document.getElementById('diceNumber');
    placeholder.innerHTML = number;
    LocalStorage.set(StorageKeys.DICE, number);
}

var button = document.getElementById('rollerButton');
button.onclick = function() {
    var result = dice1.roll();
    pubSub.publish(ActionEvents.DICE_ROLL, result);
    printNumber(result);

    var alert = document.getElementById("diceAlert")
    alert.textContent = "You have rolled a " + result + "!";

};

const saveBoardNumber = function(boardNumber, current) {
    const curr = () => LocalStorage.set(StorageKeys.CURRENT_BOARD_NUMBER, boardNumber);
    const prev = () => LocalStorage.set(StorageKeys.PREVIOUS_BOARD_NUMBER, boardNumber);
    current ? curr() : prev();
};

const applyRenderingValues = function(character, currentBoardNumber, toMove) {
    // save current
    saveBoardNumber(toMove, true);
    // save previous
    saveBoardNumber(currentBoardNumber, false);
    // execute move
    moveCharacterToken(character, currentBoardNumber, toMove);
};

const applyRulesEngine = function (toMove) {
    return new Promise((resolve, reject) => {
        let message = '';
        if (toMove === 5) {
            message = 'Lord Walder Frey has lured you to a wedding where he massacred a lot of men as revenge against Kind Rob Stark for breaking the pact between their houses. You managed to escape this deadly fate. Move back 3 spaces.';
            resolve([3, message]);
        } else if (toMove === 12) {
                message = 'Some of the wildlings managed to climb over the wall and venture into the land of the seven kingdoms. You were caught off guard and had to flee your post on the wall. Move back 2 spaces.';
                resolve([2, message]);
        } else if (toMove === 15) {
                message = 'On your way to Highgarden, you were ambushed by the Dothraki horde. They are very vicious and barbaric. Having no other choice, you decided to fall back and regroup. Move back 4 spaces.';
                resolve([4, message]);

        } else if (toMove === 20) {
                message = 'The Night King has already raised his army of white walkers and attacked the village of Hardhome. Through a very desperate effort, you were able to get a hold of a boat and save yourself from being turned into a white walker. Move back 6 spaces.';
                resolve([6, message]);
        } else if (toMove === 27) {
                message = 'As you make your final approach to the iron throne, your enemies’ last attempt to thwart your plans came to you with a loud bang. A huge explosion blew you away and all you can see are green flames surrounding you. You have failed to take over King’s Landing. Move back to start.';
                resolve([26, message]);
        }else {
            resolve([0, '']);
        }
    });
};

const onMoveCharacterToken = async function(dice) {
    const currentBoardNumber = parseInt(LocalStorage.get(StorageKeys.CURRENT_BOARD_NUMBER));
    const character = LocalStorage.get(StorageKeys.CHARACTER);
    let tmpMove = dice + currentBoardNumber;

    const toMove = tmpMove > 30 ? [currentBoardNumber, getNumberOfStepsBack(currentBoardNumber, dice)] : [currentBoardNumber, tmpMove];
    const steps = createStepArray(currentBoardNumber, toMove[1]);

    if (steps.length > 2) {
        let count = 0;
        let delay = (steps.length - 1) * delayMilliSeconds;

        const handle = setInterval(() => {
            count += 1;
            const cbn = steps[count] - 1;
            // console.log(`count: ${count} cbn${cbn} step${steps[count]}`);
            applyRenderingValues(character, cbn, steps[count]);
            if (count >= steps.length - 1) {
                clearInterval(handle)
            }
        }, delayMilliSeconds);

        await sleepAsync(delay);
    }else {
        applyRenderingValues(character, toMove[0], toMove[1]);
    }


    if(tmpMove === 30) {
        await sleepAsync(500);
        alert('You have seized the Iron Throne!');
        location.href = 'final.html';
        return;
    }

    const backMove = await applyRulesEngine(toMove[1]);
    if (backMove[0]) {
        await sleepAsync(500);
        alert(backMove[1]);
        pubSub.publish(ActionEvents.BACK_MOVE, [character, toMove[1], toMove[1] - backMove[0]]);
    }

};

const addListeners = function() {
    pubSub.subscribe(ActionEvents.DICE_ROLL, onMoveCharacterToken);
    pubSub.subscribe(ActionEvents.BACK_MOVE, (backMove) => {
        setTimeout(() => {
            applyRenderingValues(backMove[0], backMove[1], backMove[2]);
        }, 500);
    })
};

const initValues = function() {
    const currentBoardNumber = parseInt(LocalStorage.get(StorageKeys.CURRENT_BOARD_NUMBER));
    if (!currentBoardNumber) {
        saveBoardNumber(0, true);
    }
    const dice = parseInt(LocalStorage.get(StorageKeys.DICE));
    if (dice) {
        printNumber(dice);
    }
};

const main = function () {
    const character = LocalStorage.get(StorageKeys.CHARACTER);
    createBoard();

    initValues();
    addListeners();
    renderCharacterToken(character);

};

(function () {
    main();
})();

