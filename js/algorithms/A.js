class Point {
  coord = new Coord(-1, -1);
  lengthFromStart = 0;
  heuristicLength = 0;
  totalLength = 0;
  parentPoint;

  constructor(parentPoint, coord, endCoord) {
    this.coord = coord;
    this.parentPoint = parentPoint;
    if (parentPoint != 0) {
      this.calculateLength(parentPoint, endCoord);
    }
  }

  calculateDistance(otherPointCoord) {
    return Math.sqrt(
      (this.coord.x - otherPointCoord.x) * (this.coord.x - otherPointCoord.x) +
        (this.coord.y - otherPointCoord.y) * (this.coord.y - otherPointCoord.y)
    );
  }

  calculateLength(parentPoint, endCoord) {
    this.lengthFromStart =
      parentPoint.lengthFromStart + this.calculateDistance(endCoord);
    this.heuristicLength = this.calculateDistance(endCoord);
    this.totalLength = this.lengthFromStart + this.heuristicLength;
  }
}

function comparePositions(position1, position2) {
  if (position1[0] == position2[0] && position1[1] == position2[1]) {
    return true;
  } else {
    return false;
  }
}

function enable()
{
  beginButton.disabled = false;
  endButton.disabled = false;
  cleanButton.disabled = false;
  delayRange.disabled = false;
  mazeButton.disabled = false;
  referenceLabel.innerHTML="Поиск пути закончен";
}

function AStarWhileWithDelay(
  size,
  considered,
  visited,
  startCoord,
  endCoord,
  delay
) {
  setTimeout(function () {
    if (considered.length != 0 && stopAStart!=1) {
      {
        console.log(delay);
        var minLength = Infinity;
        var pointIndex;
        for (let i = 0; i != considered.length; i++) {
          if (considered[i].totalLength < minLength) {
            minLength = considered[i].totalLength;
            pointIndex = i;
          }
        }

        var MinLengthPoint = considered.splice(pointIndex, 1)[0];
        if (
          (MinLengthPoint.coord.x != startCoord.x ||
            MinLengthPoint.coord.y != startCoord.y) &&
          (MinLengthPoint.coord.x != endCoord.x ||
            MinLengthPoint.coord.y != endCoord.y)
        ) {
          document.getElementById(
            MinLengthPoint.coord.x + "-" + MinLengthPoint.coord.y
          ).style.backgroundColor = "Aquamarine";
        }

        if (
          MinLengthPoint.coord.x == endCoord.x &&
          MinLengthPoint.coord.y == endCoord.y
        ) {
          var point = MinLengthPoint.parentPoint;
          while (
            point.coord.x != startCoord.x ||
            point.coord.y != startCoord.y
          ) {
            document.getElementById(
              point.coord.x + "-" + point.coord.y
            ).style.backgroundColor = "green";
            point = point.parentPoint;
          }
          return enable();
        }
        visited[MinLengthPoint.coord.x][MinLengthPoint.coord.y] = 1;

        positions = [
          [1, 0],
          [0, 1],
          [1, 1],
          [-1, -1],
          [-1, 0],
          [0, -1],
          [-1, 1],
          [1, -1],
        ];
        for (let position of positions) {
          var oldCoord = new Coord(
            MinLengthPoint.coord.x,
            MinLengthPoint.coord.y
          );
          var newCoord = new Coord(
            MinLengthPoint.coord.x + position[0],
            MinLengthPoint.coord.y + position[1]
          );

          if (
            newCoord.x > -1 &&
            newCoord.x < size &&
            newCoord.y > -1 &&
            newCoord.y < size &&
            visited[newCoord.x][newCoord.y] != 1 &&
            obstacles[newCoord.x][newCoord.y] != 1
          ) {
            if (
              !(
                (comparePositions(position, positions[2]) ||
                  comparePositions(position, positions[3]) ||
                  comparePositions(position, positions[6]) ||
                  comparePositions(position, positions[7])) &&
                (obstacles[oldCoord.x + position[0]][oldCoord.y] == 1 ||
                  obstacles[oldCoord.x][oldCoord.y + position[1]] == 1)
              )
            ) {
              var newPoint = new Point(MinLengthPoint, newCoord, endCoord);
              var flag = 0;

              for (let i = 0; i != considered.length; i++) {
                if (
                  newPoint.coord.x == considered[i].coord.x &&
                  newPoint.coord.y == considered[i].coord.y
                ) {
                  if (
                    newPoint.lengthFromStart > considered[i].lengthFromStart
                  ) {
                    flag = 1;

                    break;
                  } else {
                    considered[i] = newPoint;
                    flag = 1;

                    break;
                  }
                }
              }

              if (flag == 0) {
                if (
                  newPoint.coord.x != endCoord.x ||
                  newPoint.coord.y != endCoord.y
                ) {
                  document.getElementById(
                    newPoint.coord.x + "-" + newPoint.coord.y
                  ).style.backgroundColor = "SteelBlue";
                }
                considered.push(newPoint);
              }
            }
          }
        }
      }
      AStarWhileWithDelay(size, considered, visited, startCoord, endCoord, delay);
    }
    else
    {
      enable();
      referenceLabel.innerHTML="Путь не найден, установите новые начало и конец пути";
    }
  }, delay);
}

function AStar(size, obstacles, startCoord, endCoord) {
  var considered = [];
  var visited = [];

  for (let i = 0; i != size; i++) {
    visited[i] = [];
    for (let j = 0; j != size; j++) {
      visited[i][j] = 0;
    }
  }

  var startPoint = new Point(0, startCoord, 0);

  considered.push(startPoint);

  AStarWhileWithDelay(size, considered, visited, startCoord, endCoord, delay);
}
