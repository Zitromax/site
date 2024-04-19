var referenceLabel = document.getElementById("reference");

canvas.addEventListener("click", function (event) {
  drawMouseClickPoint(event);
  if (points.length >= 3) {
    referenceLabel.innerHTML = "Можно начать поиск";
  }
});

var stopGenetic = 0;

document.getElementById("clean").onclick = function () {
  stopGenetic = 1;
  clearCanvasAndPoints();

  referenceLabel.style.backgroundColor="";
  referenceLabel.innerHTML = "Поставьте точки";
};

var eraseWayButton = document.getElementById("eraseWay");
eraseWayButton.onclick = function () {
  clearCanvas();
  drawPoints(points);

  referenceLabel.innerHTML = "Можно начать поиск";
  referenceLabel.style.backgroundColor="";
};

var populationSize = 10,
  generationsNumber = 25,
  mutationChance = 15,
  delay = 150;

var populationSizeRange = document.getElementById("populationSize");

populationSizeRange.addEventListener("input", function () {
  populationSize = populationSizeRange.value;
  document.getElementById("populationSizeLabel").innerHTML = populationSize;
});

var generationsNumberRange = document.getElementById("generationsNumber");

generationsNumberRange.addEventListener("input", function () {
  generationsNumber = generationsNumberRange.value;
  document.getElementById("generationsNumberLabel").innerHTML =
    generationsNumber;
});

var mutationChanceRange = document.getElementById("mutationChance");

mutationChanceRange.addEventListener("input", function () {
  mutationChance = mutationChanceRange.value;
  document.getElementById("mutationChanceLabel").innerHTML = mutationChance;
});

var delayRange = document.getElementById("delay");

delayRange.addEventListener("input", function () {
  delay = delayRange.value;
  document.getElementById("delayLabel").innerHTML = delay;
});

var startButton = document.getElementById("start");

function disable() {
  startButton.disabled = true;
  populationSizeRange.disabled = true;
  generationsNumberRange.disabled = true;
  mutationChanceRange.disabled = true;
  delayRange.disabled = true;
  eraseWayButton.disabled = true;
}

startButton.onclick = function () {
  if (points.length >= 3) {
    stopGenetic = 0;

    genetic(points, populationSize, generationsNumber, mutationChance, delay);

    disable();

    referenceLabel.innerHTML = "Идет поиск";
    referenceLabel.style.backgroundColor="#328dca";
  } else {
    referenceLabel.style.backgroundColor = "#b22d2d";

    setTimeout(function () {
      referenceLabel.style.backgroundColor = "";
    }, 2000);
  }
};

var stopButton = document.getElementById("stop");

stopButton.onclick = function () {
  stopGenetic = 1;
};
