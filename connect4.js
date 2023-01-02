/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  let row =[]
  for(let x=0; x<WIDTH; x++){
    row.push(null)
  }
  for(i =0; i<HEIGHT; i++){
     board[i] = new Array(row)
  }
  
  
  
    // console.log(board)
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.querySelector("#board")
  
  // TODO: add comment for this code
  // creating row element saving to variable called top; 
  // setting id attribute called column-top to created row element;
  // adding click event to the created row element
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  // creating WIDTH number of cell elements and saving to variable called headcell
  // setting id attribute of index to created cell elements 
  // appending created cell elements to row element 
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  // appending created row element with appended cells to the selected html table with id of board.
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    // create HEIGHT number of row element and save to const row
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      // create WIDTH number of cell elements to all the rows and save to const cell
      const cell = document.createElement("td");
      // setting id attribute to each element of y,x coordinates
      cell.setAttribute("id", `${y}-${x}`);
      // append cell elements to row elements
      row.append(cell);
    }
    // append created rows with appended cells to the selected html table with id of board. 
    htmlBoard.append(row);
  }
 
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let i= HEIGHT-1; i>=0 ; i--){
    if (!Number.isInteger(board[i][x])) {
      return i;
    }
  }
  return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let newDiv = document.createElement("div");
  newDiv.classList.add("piece");
  newDiv.classList.add(`p${currPlayer}`)
  let getTd = document.getElementById(`${y}-${x}`)
  getTd.append(newDiv)
  
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  return alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  const lastRow = board[0]
  let lastRowTF= lastRow.every(function(x){
    if(x){
     return x
    }
 })
  function checkForTie(){
    if(lastRowTF){
      return endGame("Its a tie!")
    }
  }
  
  

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1 
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
