var state = [[0, 0, 0],
             [0, 0, 0],
             [0, 0, 0]];

// Player Props
var player1 = {
  name: 'player 1',
  value: 'x',
  color: 'rgb(58, 149, 209)',
  win: 'Winner Player 1'
};

var player2 = {
  name: 'player 2',
  value: 'o',
  color: 'rgb(151, 209, 58)',
  win: 'Winner Player 2'
};

// Choose player
var player;
var nextPlayer;
var choosePlayer = (counter) => {
  if (counter % 2 === 0) {
    player = player1;
    nextPlayer = player2;
  } else {
    player = player2;
    nextPlayer = player1;
  }
}

// winning image
var gif = document.createElement('img');
gif.setAttribute('src', 'https://media.giphy.com/media/1GTZA4flUzQI0/giphy.gif');
gif.setAttribute('class', 'gif');
gif.hidden = true;
var win = document.getElementById('win');
win.prepend(gif);

// Game
var counter = 0;
var win = false;
var playerBtn = document.getElementsByClassName('player')[0];
var table = document.getElementsByClassName('table')[0];

table.addEventListener('click', (event) => {
  event.preventDefault();
  choosePlayer(counter);
  var position = event.target.id;
  var cell = event.target;
  // change position id, first value of id is row, second value is column
  position = position.split('');
  currentRow = Number(position[0]);
  currentCol = Number(position[1]);
  var statePos = state[currentRow][currentCol];
  if (statePos === 0 && !win) {
    state[currentRow][currentCol] = player.value;
    cell.innerHTML = player.value;
    cell.style.color = player.color;
    if (winRow(currentRow) || winCol(currentCol) || winDiag(currentRow, currentCol)) {
      playerBtn.innerHTML = player.win;
      win = true;
      gif.hidden = false;
    } else if (counter === 8) {
      playerBtn.innerHTML = 'TIE';
    } else {
      playerBtn.innerHTML = nextPlayer.name
      playerBtn.style.backgroundColor = nextPlayer.color;
    }
    counter++;
  }
})

//Reseting state
var reset = document.getElementsByClassName('btn');
reset[0].addEventListener('click', function (event) {
  event.preventDefault();
  // reset state
  state = [[0, 0, 0],
           [0, 0, 0],
           [0, 0, 0]];
  // playerBtn 1 button displayed
  playerBtn.innerHTML = player1.name
  playerBtn.style.backgroundColor = player1.color;
  // reset counter
  counter = 0;
  // reset win to false;
  win = false;
  // reset hidden gif;
  gif.hidden = true;
  // delete all td innerHTML
  var cells = document.getElementsByTagName('td');
  cells = Array.from(cells);
  cells.forEach((cell) => {
    cell.innerHTML = '';
  })
})


// check row wins
var winRow = function (row) {
  var result = false;
  var total = '';
  for (let i = 0; i < state[row].length; i++) {
    total += state[row][i];
  }
  if (total === 'xxx' || total === 'ooo') {
    result = true;
  }
  return result;
};

// check col wins
var winCol = function (col) {
  var result = false;
  var total = '';
  for (let i = 0; i < state.length; i++) {
    total += state[i][col];
  }
  if (total === 'xxx' || total === 'ooo') {
    result = true;
  }
  return result;
};

// check diag wins
var winDiag = function (row, col) {
  var result = false;
  var total = '';
  var minorDiagColIndex = row + col; // needs to be 2
  var majorDiagColIndex = col - row; // needs to be 0
  if (minorDiagColIndex !== 2 && majorDiagColIndex !== 0) {
    return result;
  }
  // minor
  if (minorDiagColIndex === 2) {
    for (let i = 0; i < state.length; i++) {
      total += state[i][minorDiagColIndex - i];
    }
  }
  // major
  if (majorDiagColIndex === 0) {
    for (let i = 0; i < state.length; i++) {
      total += state[i][i];
    }
  }
  if (total === 'xxx' || total === 'ooo') {
    result = true;
  }
  return result;
};

