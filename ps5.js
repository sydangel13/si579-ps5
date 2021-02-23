var granimInstance = new Granim({
    element: '#canvas-image-blending',
    direction: 'top-bottom',
    isPausedWhenNotInView: true,
    image : {
        source: "images/nature.jpg",
        blendingMode: 'hard-light',
    },
    states : {
        "default-state": {
            gradients: [
                ['#29323c', '#485563'],
                ['#FF6B6B', '#556270'],
                ['#80d3fe', '#7ea0c4'],
                ['#f0ab51', '#eceba3']
            ],
            transitionSpeed: 7000
        }
    }
});

window.addEventListener("load", daysUntilSummer);

function daysUntilSummer(){
    // const num_days = document.getElementById("countdown");
    let sum_days = moment([2021, 6, 20]).fromNow();
    document.getElementById("countdown").innerHTML = sum_days
}

console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));



var summer_words = [{word: "Swimming", size: "50"}, {word: "Hiking", size: "20"}, {word: "Sunshine", size: "54"}, {word: "Happy", size: "65"}, {word: "Drinking", size: "75"}, {word: "Heat", size: "50"}, {word: "fun", size: "65"}, {word: "sleeping", size: "37"}, {word: "popsicles", size: "30"}]

var margin = {top: 35, right: 35, bottom: 35, left: 35},
    width = 960 - margin.left - margin.right,
    height =  750 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


var layout = d3.layout.cloud()
  .size([width, height])
  .words(summer_words.map(function(d) { return {text: d.word, size:d.size}; }))
  .padding(15)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size; })      // font size of words
  .on("end", draw);
layout.start();

function draw(words) {
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .style("fill", " #C70039")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
}

// this word cloud code was modified from d3js page on word clouds 