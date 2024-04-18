
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function createMaze(size) {
  reset();

  for (let i = 0; i != obstacles.length; i++) {
    for (let j = 0; j != obstacles.length; j++) {
      obstacles[i][j] = 1;
      document.getElementById(i + "-" + j).style.backgroundColor = "black";
    }
  }

  initialCell = new Coord(getRandomNumber(size - 1), getRandomNumber(size - 1));
  obstacles[initialCell.x][initialCell.y] = 0;
  document.getElementById(
    initialCell.x + "-" + initialCell.y
  ).style.backgroundColor = "white";

  var cellsForCleaning = [];

  for (let position of [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ]) {
    var cell = new Coord(
      initialCell.x + position[0],
      initialCell.y + position[1]
    );
    if (
      cell.x >= 0 &&
      cell.x <= size - 1 &&
      cell.y >= 0 &&
      cell.y <= size - 1
    ) {
      cellsForCleaning.push(cell);
    }
  }

  while (cellsForCleaning.length != 0) {
    var randIndex = getRandomNumber(cellsForCleaning.length - 1);

    var cell = cellsForCleaning.splice(randIndex, 1)[0];
    obstacles[cell.x][cell.y] = 0;

    document.getElementById(cell.x + "-" + cell.y).style.backgroundColor =
      "white";

    walls = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    positions = [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ];
    var cellNearbyFound = 0;

    while (cellNearbyFound == 0 && positions.length != 0) {
      var randIndex = getRandomNumber(positions.length - 1);
      var newPos = new Coord(
        cell.x + positions[randIndex][0],
        cell.y + positions[randIndex][1]
      );

      if (
        newPos.x >= 0 &&
        newPos.x <= size - 1 &&
        newPos.y >= 0 &&
        newPos.y <= size - 1 &&
        obstacles[newPos.x][newPos.y] == 0
      ) {
        wall = new Coord(
          cell.x + walls[randIndex][0],
          cell.y + walls[randIndex][1]
        );
        obstacles[wall.x][wall.y] = 0;
        document.getElementById(wall.x + "-" + wall.y).style.backgroundColor =
          "white";
        cellNearbyFound = 1;
      }
      positions.splice(randIndex, 1);
      walls.splice(randIndex, 1);
    }

    for (let position of [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ]) {
      var cellForCleaning = new Coord(
        cell.x + position[0],
        cell.y + position[1]
      );
      if (
        cellForCleaning.x >= 0 &&
        cellForCleaning.x <= size - 1 &&
        cellForCleaning.y >= 0 &&
        cellForCleaning.y <= size - 1 &&
        obstacles[cellForCleaning.x][cellForCleaning.y] != 0
      ) {
        cellsForCleaning.push(cellForCleaning);
      }
    }
  }

  while (beginCoord.x == endCoord.x && beginCoord.y == endCoord.y) {
    beginCoord = new Coord(
      getRandomNumber(size - 1),
      getRandomNumber(size - 1)
    );
    endCoord = new Coord(getRandomNumber(size - 1), getRandomNumber(size - 1));
  }


  obstacles[beginCoord.x][beginCoord.y]=0;
  obstacles[endCoord.x][endCoord.y]=0;

  beginWasSet = 1;
  endWasSet = 1;

  document.getElementById(
    beginCoord.x + "-" + beginCoord.y
  ).style.backgroundColor = "blue";
  document.getElementById(endCoord.x + "-" + endCoord.y).style.backgroundColor =
    "red";
}
