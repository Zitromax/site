function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

class Chromosome {
  way = [];
  size = 0;
  wayLength = -1;

  constructor(size) {
    this.size = size;
  }

  calculateDistance(point1, point2) {
    return Math.sqrt(
      (point1.x - point2.x) * (point1.x - point2.x) +
        (point1.y - point2.y) * (point1.y - point2.y)
    );
  }

  generateRandWay() {
    var accessibleVertices = [];
    for (let i = 0; i != this.size; i++) {
      accessibleVertices.push(i);
    }

    for (let i = 0; i != this.size; i++) {
      this.way.push(
        accessibleVertices.splice(
          getRandomNumber(accessibleVertices.length - 1),
          1
        )[0]
      );

      if (i != 0) {
        this.wayLength += this.calculateDistance(
          points[this.way[i]],
          points[this.way[i - 1]]
        );
      }
    }

    this.wayLength += this.calculateDistance(
      points[this.way[0]],
      points[this.way[this.way.length - 1]]
    );
  }

  calculateWayLength() {
    this.wayLength = 0;
    for (let i = 1; i != this.size; i++) {
      this.wayLength += this.calculateDistance(
        points[this.way[i]],
        points[this.way[i - 1]]
      );
    }
    this.wayLength += this.calculateDistance(
      points[this.way[0]],
      points[this.way[this.way.length - 1]]
    );
  }
}

function rewriting(chromo1, chromo2, chromoSize, breakPoint) {
  genesUsed = Array(chromoSize);
  genesUsed.fill(0);

  var newChromo = new Chromosome(chromoSize);

  for (let i = 0; i != chromoSize; i++) {
    if (i < breakPoint) {
      newChromo.way.push(chromo1.way[i]);
      genesUsed[chromo1.way[i]] = 1;
    } else {
      if (genesUsed[chromo2.way[i]] != 1) {
        newChromo.way.push(chromo2.way[i]);
        genesUsed[chromo2.way[i]] = 1;
      }
    }
  }

  if (newChromo.way.length != chromoSize) {
    for (let i = 0; i != chromoSize; i++) {
      if (genesUsed[chromo1.way[i]] != 1) {
        newChromo.way.push(chromo1.way[i]);
      }
    }
  }

  newChromo.calculateWayLength();

  return newChromo;
}

function crossing(chromo1, chromo2, chromoSize) {
  let newChromos = [];
  var breakPoint = getRandomNumber(chromoSize - 1);
  newChromos[0] = rewriting(chromo1, chromo2, chromoSize, breakPoint);
  newChromos[1] = rewriting(chromo2, chromo1, chromoSize, breakPoint);

  return newChromos;
}

function mutation(chromo, chromoSize, mutationChance) {
  var chance = getRandomNumber(100);

  let newChromo = chromo;

  if (chance < mutationChance) {
    var randGen1 = 0;
    var randGen2 = 0;

    while (randGen1 == randGen2) {
      randGen1 = getRandomNumber(chromoSize - 1);
      randGen2 = getRandomNumber(chromoSize - 1);
    }

    var gen = newChromo.way[randGen1];

    newChromo.way[randGen1] = newChromo.way[randGen2];
    newChromo.way[randGen2] = gen;
  }

  newChromo.calculateWayLength();
  return newChromo;
}

function enable() {
  startButton.disabled = false;
  populationSizeRange.disabled = false;
  generationsNumberRange.disabled = false;
  mutationChanceRange.disabled = false;
  delayRange.disabled = false;
  eraseWayButton.disabled = false;
}

function GeneticForWithDelay(
  index,
  delay,
  color,
  populationSize,
  generationsNumber,
  mutationChance,
  population,
  chromoSize
) {
  setTimeout(function () {
    if (index != generationsNumber && stopGenetic != 1) {
      clearCanvas();

      var randParent1 = 0;
      var randParent2 = 0;

      while (randParent1 == randParent2) {
        randParent1 = getRandomNumber(populationSize - 1);
        randParent2 = getRandomNumber(populationSize - 1);
      }

      var newChromos = crossing(
        population[randParent1],
        population[randParent2],
        chromoSize
      );

      newChromos[0] = mutation(newChromos[0], chromoSize, mutationChance);
      newChromos[1] = mutation(newChromos[1], chromoSize, mutationChance);

      population.push(newChromos[0]);
      population.push(newChromos[1]);

      population.sort(function (a, b) {
        return a.wayLength - b.wayLength;
      });

      population.pop();
      population.pop();

      drawPoints(points);

      var newColor;
      switch (color) {
        case "green":
          newColor = "blue";
          break;
        case "blue":
          newColor = "red";
          break;
        case "red":
          newColor = "green";
          break;
      }
      drawWay(population[0].way, newColor);

      GeneticForWithDelay(
        index + 1,
        delay,
        newColor,
        populationSize,
        generationsNumber,
        mutationChance,
        population,
        chromoSize
      );
    } else {
      enable();
      if (stopGenetic == 1) {
        referenceLabel.innerHTML = "Поиск остановлен";
      } else {
        referenceLabel.innerHTML = "Поиск закончен";
      }
    }
  }, delay);
}

function genetic(
  points,
  populationSize,
  generationsNumber,
  mutationChance,
  delay
) {
  let population = [];

  var chromoSize = points.length;

  for (let i = 0; i != populationSize; i++) {
    var chromosome = new Chromosome(chromoSize);
    chromosome.generateRandWay();
    population.push(chromosome);
  }

  GeneticForWithDelay(
    0,
    delay,
    "green",
    populationSize,
    generationsNumber,
    mutationChance,
    population,
    chromoSize
  );
}
