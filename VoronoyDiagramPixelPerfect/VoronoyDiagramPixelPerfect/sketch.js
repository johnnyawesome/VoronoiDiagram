/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

let points = [];

function setup() {
  angleMode(DEGREES);
  createCanvas(650, 650, P2D);
  background(0);
  stroke(0, 255, 0);
  initPoints();
  noFill();
  stroke(255, 0, 0);
  strokeWeight(5);
  displayCells();
  displayPoints();
}

//Initialize the random points
//Give each point s random X and Y value and a color
function initPoints() {
  const colors = [
    "Crimson", "GreenYellow", "Orchid", "DarkOrange", "DeepPink",
    "Turquoise", "Lime", "Fuchsia", "Gold", "MediumVioletRed",
    "DarkRed", "Green", "MediumPurple", "Yellow", "OrangeRed",];
  for (let i = 0; i < 10; i++)
    points.push({ x: Math.round(random(10, 640)), y: Math.round(random(10, 640)), color: colors[i] })
}

//Display the random points
function displayPoints() {
  fill(0);
  stroke(255, 0, 0);
  points.forEach(point => {
    ellipse(point.x, point.y, 10);
  });
}

//Display the (colored) cells around the points
function displayCells() {

  //Create an Image
  let finalImage = createImage(650, 650);
  //Load all Pixels
  finalImage.loadPixels();

  for (let i = 0; i <= 650; i++) {
    for (let j = 0; j <= 650; j++) {

      let allDist = [];
      points.forEach(point => {
        allDist.push({ point: point, dist: Math.round(dist(j, i, point.x, point.y)) });
      });
      let min = 1000;
      for (let k = 0; k < allDist.length; k++) {
        if (allDist[k].dist < min) {
          min = allDist[k].dist;
          stroke(allDist[k].point.color);
          finalImage.set(j, i, color(allDist[k].point.color));
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
  if (points.length > 20) points.splice(0)
  background(0);
  stroke(0, 255, 0);
  initPoints();
  noFill();
  stroke(255, 0, 0);
  strokeWeight(5);
  displayCells();
  displayPoints();
}

function draw() {
}