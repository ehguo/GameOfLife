let cells = [];
let cellStatus = [];

let interval;

$().ready(onReady);

function onReady() {
  createHeader();
  createGrid();
  createCells();
  createStart();
  createPresets();
}

function createHeader() {
  const $header = $('<div>', {
    class: 'header',
    text: 'The Game of Life'
  });

  const $ruleInfo = $('<div>', {
    class: 'rule-info'
  }).hide()
    .append($('<div>', {
      class: 'rule-text',
      text: '1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.'
    }))
    .append($('<div>', {
      class: 'rule-text',
      text: '2. Any live cell with two or three live neighbours lives on to the next generation.'
    }))
    .append($('<div>', {
      class: 'rule-text',
      text: '3. Any live cell with more than three live neighbours dies, as if by overpopulation.'
    }))
    .append($('<div>', {
      class: 'rule-text',
      text: '4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.'
    }));

  const $rules = $('<div>', {
    class: 'rules',
    text: '-> Rules <-'
  }).click(handleClick);

  $('#root').append($header).append($ruleInfo).append($rules);

  function handleClick() {
    $ruleInfo.toggle();
  }
}

function createGrid() {
  const $grid = $('<div>', {
    class: 'grid'
  });
  $('#root').append($grid);
}

function createCells() {
  const $grid = $('.grid');

  for (let i = 0; i < 2601; i++) {
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
    class: 'button',
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
  let rowLen = 51;
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

function createPresets() {
  const $presets = $('<div>', {
    class: 'presets',
    text: 'Upcoming Feature!'
  }).hide();

  const $presetButton = $('<button>', {
    class: 'button',
    text: 'Presets'
  }).click(handleClick);

  $('#root').append($presets).append($presetButton);

  function handleClick(e) {
    $('.presets').toggle();
  }
}
