let cells = [];
let cellStatus = [];

let interval;

$().ready(onReady);

function onReady() {
  createGrid();
  createCells();
  createStart();
}

function createGrid() {
  const $grid = $('<div>', {
    class: 'grid'
  });
  $('#root').append($grid);
}

function createCells() {
  const $grid = $('.grid');

  for (let i = 0; i < 2500; i++) {
    const $cell = $('<div>', {
      id: i,
      class: 'cell'
    }).click(handleClick);

    cellStatus[i] = false;
    cells[i] = $cell;

    $grid.append($cell);
  }

  function handleClick(e) {
    const $cell = $(e.target);
    const id = e.target.id;

    cellStatus[id] = cellStatus[id] ? false : true;
    $cell.toggleClass('alive');
  }
}

function createStart() {
  const $start = $('<button>', {
    class: 'start',
    text: 'Start / Stop'
  }).click(runLife);
  $('#root').append($start);
}

function runLife() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  } else {
    interval = setInterval(determineFate, 500);
  }
}

function determineFate() {
  const newCellStatus = [];
  
  for (let i = 0; i < cells.length; i++) {
    const adj = getLivingNeighbors(i);
    if (cellStatus[i]) {
      if (adj < 2 || adj > 3) {
        newCellStatus[i] = false;
        $(cells[i]).toggleClass('alive');
      } else {
        newCellStatus[i] = true;
      }
    } else {
      if (adj === 3) {
        newCellStatus[i] = true;
        $(cells[i]).toggleClass('alive');
      } else {
        newCellStatus[i] = false;
      }
    }
  }
  cellStatus = newCellStatus;
}

function getLivingNeighbors(id) {
  let rowLen = 50;
  let adj = 0;

  if (cellStatus[id - rowLen - 1]) adj++;
  if (cellStatus[id - rowLen]) adj++;
  if (cellStatus[id - rowLen + 1]) adj++;
  if (cellStatus[id + 1]) adj++;
  if (cellStatus[id - 1]) adj++;
  if (cellStatus[id + rowLen - 1]) adj++;
  if (cellStatus[id + rowLen]) adj++;
  if (cellStatus[id + rowLen + 1]) adj++;

  return adj;
}
