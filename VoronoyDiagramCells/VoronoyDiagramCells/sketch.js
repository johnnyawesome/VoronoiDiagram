/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

let points = [];
let dispPoints = false;

function setup() {
  angleMode(DEGREES);
  createCanvas(100, 100, P2D);
  background(0);
  stroke(0, 255, 0);
  initPoints();
  stroke(255, 0, 0);
  strokeWeight(1);
  displayCells();
  //displayPoints();
}

//Initialize the random points
//Give each point s random X and Y value and a color
function initPoints() {
  const colors = [
    "Crimson", "GreenYellow", "Orchid", "DarkOrange", "DeepPink",
    "Turquoise", "Lime", "Fuchsia", "Gold", "MediumVioletRed",
    "DarkRed", "Green", "MediumPurple", "Yellow", "OrangeRed",];
  for (let i = 0; i < 6; i++)
    points.push({
      x: Math.round(random(10, 100)),
      y: Math.round(random(10, 100)),
      xMove: random(-1, 1),
      yMove: random(-1, 1),
      color: colors[i]
    })
}

//Display the random points
function displayPoints() {
  fill(255, 0, 0);
  //stroke(255, 0, 0);
  points.forEach(point => {
    ellipse(point.x, point.y, 3);
  });
}

//Display the (colored) cells around the points
function displayCells() {

  //Create an Image
  let finalImage = createImage(100, 100);
  //Load all Pixels
  finalImage.loadPixels();

  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100; j++) {

      let allDist = [];
      points.forEach(point => {
        allDist.push({ point: point, dist: Math.round(dist(j, i, point.x, point.y)) });
      });
      let min = 1000;
      for (let k = 0; k < allDist.length; k++) {
        if (allDist[k].dist < min) {
          min = allDist[k].dist;
          finalImage.set(j, i, color(0, map(allDist[k].dist, 0, 40, 255, 0), 0));
        }
      }
    }
  }
  //Update the image with the calculated pixels
  finalImage.updatePixels();
  //Display the image
  image(finalImage, 0, 0);
}

//If mouse clicked, add more points or reset the array
function mouseClicked() {
  dispPoints ? dispPoints = false : dispPoints = true
}

function animateRandomPoints() {
  points.forEach((point, index) => {
    if (point.x >= 100) points[index].xMove = -0.3
    if (point.y >= 100) points[index].yMove = -0.3
    if (point.x <= 0) points[index].xMove = +0.3
    if (point.y <= 0) points[index].yMove = +0.3
    points[index].x += points[index].xMove;
    points[index].y += points[index].yMove;
  })

}

function draw() {
  animateRandomPoints();
  displayCells();
  if (dispPoints) displayPoints();
}