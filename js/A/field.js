class Coord {
  x = -1;
  y = -1;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

var numCells = 5;

var beginSet = 0;
var endSet = 0;
var beginWasSet = 0;
var endWasSet = 0;

var beginCoord = new Coord();
var endCoord = new Coord();
var obstacles = [];

var beginButton = document.getElementById("begin");
beginButton.onclick = function () {
  beginSet = beginSet ? 0 : 1;
  endSet = 0;
};
var endButton = document.getElementById("end");
endButton.onclick = function () {
  endSet = endSet ? 0 : 1;
  beginSet = 0;
};

var referenceLabel = document.getElementById("reference");

function canStartSearching() {
  if (beginWasSet == 1 && endWasSet == 1) {
    referenceLabel.innerHTML = "Можно начать поиск пути";
  }
}

function chooseBeginOrEnd() {
  referenceLabel.innerHTML = "Установите начало и конец пути";
}


var stopAStart=0;

function reset() {
  stopAStart=1;
  document.querySelector("table").remove();
  beginCoord = new Coord();
  endCoord = new Coord();
  beginSet = 0;
  endSet = 0;
  beginWasSet = 0;
  endWasSet = 0;
  var cells = [];
  obstacles = [];
  referenceLabel.innerHTML = "Установите начало и конец пути";

  for (let i = 0; i != numCells; i++) {
    cells.push([]);
    obstacles.push([]);
    for (let j = 0; j != numCells; j++) {
      obstacles[i][j] = 0;
    }
  }

  var table = document.createElement("table");
  document.body.append(table);

  for (let j = 0; j < numCells; j++) {
    for (let i = 0; i < numCells; i++) {
      var td = document.createElement("td");
      td.style.background = "white";

      const tableSize = 250;

      var cellSize = (10 * tableSize) / (11 * numCells + 1);
      td.style.padding = cellSize + "px";

      var borderSize = cellSize / 10;
      var borderWidth = borderSize + "px";
      td.style.border = borderWidth + " solid black";

      td.onclick = function (event) {
        var target = event.currentTarget.style;

        if (target.backgroundColor == "blue") {
          target.backgroundColor = "white";
          beginWasSet = 0;
          chooseBeginOrEnd();
        } else if (target.backgroundColor == "red") {
          target.backgroundColor = "white";
          endWasSet = 0;
          chooseBeginOrEnd();
        } else if (beginSet == 1) {
          target.backgroundColor = "blue";
          beginSet = 0;

          if (beginWasSet == 1) {
            cells[beginCoord.y][beginCoord.x].style.backgroundColor = "white";
          }

          beginCoord.x = parseInt(event.currentTarget.id[0]);
          beginCoord.y = parseInt(event.currentTarget.id[2]);
          beginWasSet = 1;

          canStartSearching();
        } else if (endSet == 1) {
          target.backgroundColor = "red";
          endSet = 0;

          if (endWasSet == 1) {
            cells[endCoord.y][endCoord.x].style.backgroundColor = "white";
          }

          endCoord.x = parseInt(event.currentTarget.id[0]);
          endCoord.y = parseInt(event.currentTarget.id[2]);
          endWasSet = 1;

          canStartSearching();
        } else if (target.backgroundColor == "white") {
          target.backgroundColor = "black";
          obstacles[event.currentTarget.id[0]][event.currentTarget.id[2]] = 1;
        } else {
          target.backgroundColor = "white";
          obstacles[event.currentTarget.id[0]][event.currentTarget.id[2]] = 0;
        }
      };

      td.id = j + "-" + i;
      cells[i][j] = td;
    }
  }

  for (let i = 0; i < numCells; i++) {
    var tr = document.createElement("tr");
    tr.className = "row";
    table.append(tr);

    for (let j = 0; j < numCells; j++) {
      tr.append(cells[i][j]);
    }
  }
}

reset();

var input = document.getElementById("numCells");
input.addEventListener("input", function () {
  numCells = input.value;
  reset();
});

var cleanButton = document.getElementById("clean");
cleanButton.onclick = reset;

var delay = 300;
var delayText = document.getElementById("printDelay");

var delayRange = document.getElementById("delay");
delayRange.addEventListener("input", function () {
  delay = delayRange.value;
  delayText.innerHTML = delay;
});

var mazeButton = document.getElementById("maze");
mazeButton.addEventListener("click", function () {
  createMaze(numCells);
  referenceLabel.innerHTML = "Можно начать поиск пути";
});

function disable() {
  beginButton.disabled = true;
  endButton.disabled = true;
  cleanButton.disabled = true;
  delayRange.disabled = true;
  mazeButton.disabled = true;
  referenceLabel.innerHTML = "Идёт поиск пути";
}

document.getElementById("start").onclick = function () {
  if (beginWasSet == 1 && endWasSet == 1) {
    stopAStart=0;
    AStar(numCells, obstacles, beginCoord, endCoord);
    disable();
  }
  else
  {
    referenceLabel.style.backgroundColor="yellow";
    setTimeout(function(){
      referenceLabel.style.backgroundColor="";
    },2000);
  }
};
