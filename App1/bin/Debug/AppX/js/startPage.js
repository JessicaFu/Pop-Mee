var GEN_COLORS = ["#71A9FF", "#FFCCFF", "#D65CFF", "#FF9933", "#FF5050", "#99FF66", "#00FFCC",
    "#3366CC", "#9933FF", "#009999", "#336699", "#99FF33", "#990000", "#CCCCFF", "#FF33CC",
    "#FF0066", "#FFFF00", "#CC00CC", "#FF6699", "#FFCCCC", "#FF6666", "#FFCC99", "#33CCFF"];
var numCircles = 7;
var level = 1;
var root;
var bg;
var docX;
var docY;
var score = 0;

/**********************Start page*********/
function init() {
    root = $(document.getElementById("root"));
    bg = $(document.getElementById("bg"));
    docX = root.width() / 2;
    docY = root.height() / 2;

    var iconCircle = makeCircle(300, docY - 150, docX - 150, 10, "#0099FF");
    iconCircle.css({
        "opacity": "0",
        "font-size": "400%",
        "color": "#FF99FF",
        "font-weight": "900",
        "line-height": "300px"
    });
    iconCircle.attr("align", "center");
    iconCircle.text("POP MEE");
    root.append(iconCircle);
    iconCircle.animate({
        "opacity": "1",
    }, 4000);
    
    var borderColor;
    var textColor;
    iconCircle.click(function () {
        root.animate({
            "opacity": "0"
        }, 1300, function () {
            root.remove();
            newLevel();
        });
    });
    iconCircle.on("mouseover", function () {
        borderColor = randomizeColor(GEN_COLORS);
        textColor = randomizeColor(GEN_COLORS);
        iconCircle.css({
            "border-color": borderColor,
            "color": textColor
        });
    });
    iconCircle.on("mousedown", function () {
        iconCircle.css({
            "background-color": borderColor,
            "color": "white"
        });
    });
    iconCircle.on("mouseup", function () {
        iconCircle.css({
            "border-color": borderColor,
            "color": textColor,
            "background-color": "white"
        });
    });
    iconCircle.on("mouseleave", function () {
        iconCircle.css({
            "border-color": borderColor,
            "color": textColor,
            "background-color": "white"
        });
    });

    var options = {};
    options.diameter = 100; //size of circle 100;
    options.minSpeed = 10000; //10000;
    options.maxSpeed = 2500; //2500
    options.numCircles = 20;
    options.parent = root;
    options.colorArray = GEN_COLORS; //colors to randomize from
    createCircles(options, "0.2", false, true);
}

/*Create circles */
function createCircles(options, opacity, isCallback, isBackground) {
    //number of circle divs on the page at the same time
    var numCircles = options.numCircles;
    var count = options.pred ? 1 : numCircles; //if pred exists, it should be removed and replaced 
    options.pred = true;
    //parent div to append the circle divs
    var parent = options.parent;

    //circle properties
    var diameter = options.diameter; //size of circle 100;
    var minSpeed = options.minSpeed; //10000;
    var maxSpeed = options.maxSpeed; //2500
    var colorArray = options.colorArray; //colors to randomize from

    var circle;
    while (count > 0) {
        circle = makeCircle(diameter, docY * 2, randomizeXPos(diameter), 5, randomizeColor(colorArray));
        if (!isBackground){
            circle.on("mousedown", (function (myCircle) {
                return function () {
                    myCircle.css({
                        "background-color": myCircle.attr("color")
                    });
                    score++;
                    $("#scoreText").text(score.toString());
                    setTimeout(function () {
                        myCircle.remove();
                    }, 100);
                   
                };
            })(circle));
        }
        parent.append(circle);
        circle.css({
            "opacity": opacity
        });
        circle.animate({
            "top": "-" + diameter * 2 + "px"
        }, randomizeSpeed(maxSpeed, minSpeed), 
            function () {
                if (isCallback){
                    isCallback.remove();
                }
                createCircles(options, opacity, circle, isBackground);
            });
        count--;
    }
}

/*****************Util*******************/

function makeCircle(diameter, top, left, border, color) {
    var circle = $(document.createElement("div"));

    circle.css({
        "width": diameter + "px",
        "height": diameter + "px",
        "top": top + "px",
        "left": left+"px",
        "border": border+ "px solid "+color,
        "border-radius": (diameter / 2 + 5) + "px " + (diameter / 2 + 5) + "px " + (diameter / 2 + 5) + "px " + (diameter / 2 + 5) + "px",
        "position": "absolute",
    });
    circle.attr("color", color);
    return circle;
}

function randomizeColor(colorArray) {
    var rand = Math.floor(Math.random() * colorArray.length);
    return colorArray[rand];
}

function randomizeSpeed(lowerBound, upperBound) {
    var rand = Math.floor(Math.random() * (upperBound-lowerBound+1)) + lowerBound;
    return rand;
}

function randomizeXPos(diameter) {
    var max = docX * 2 - diameter;
    var min = 0;
    var rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return rand;
}

function randomizeTime() {

}
/****************Levels*****************/

function newLevel(){
    var levelDiv = $(document.createElement("div"));
    levelDiv.css({
        "background-color":"white",
        "position":"absolute",
        "width":"100%",
        "height":"100%",
        "top":"0%",
        "left":"0%",
        "padding": "0",
        "margin": "0"
    });
    var levelBanner = $(document.createElement("div"));
    levelBanner.css({
        "background-color": "white", 
        "position": "absolute",
        "width": "100%",
        "height": "25%",
        "top": " 37%",
        "border-top": "5px solid #0099FF",
        "border-bottom": "5px solid #0099FF",
        "right": "100%",
        "padding": "0",
        "margin": "0",
        "font-size": "400%",
        "color": "#0099FF",
        "font-weight": "900",
        "text-align":"center",
        "line-height": docX/4+"px"
    });
    levelBanner.text("LEVEL "+level);
    levelDiv.append(levelBanner);
    bg.append(levelDiv);
    levelBanner.animate({
        "right": "0%"
    }, 2000, function () {
        setTimeout(function () {
            levelBanner.animate({
                "right": "100%"
            }, 2000, function () {
                startLevel(levelDiv);
            });
        }, 1000);
    });
}

function startLevel(page) {
    createScorePanel(page);
    var options = {};
    options.diameter = 100; //size of circle 100;
    options.minSpeed = 10000; //10000;
    options.maxSpeed = 2500; //2500
    options.colorArray = GEN_COLORS; //colors to randomize from
    options.numCircles = numCircles;
    options.parent = page;
    createCircles(options, "1", false, false);
    //createSquare();
}

function createScorePanel(page) {
    var panel = $(document.createElement("div"));
    panel.css({
        "height": "50px",
        "width": "250px",
        "background-color": "white",
        "border": "2px solid #0099FF",
        "border-radius": "7px 7px 7px 7px",
        "top": "20px",
        "right": "20px",
        "line-height": "100px",
        "font-size": "200%",
        "color": "#FF99FF",
        "font-weight": "900",
        "position": "absolute",
        "z-index": "9999999"
    });

    var innerPanel = $(document.createElement("div"));
    innerPanel.css({
        "width": "auto",
        "height": "50px",
        "position": "relative",
        "top": "10%"

    });
    var livesDiv1 = $(document.createElement("image"));
    livesDiv1.attr({
        "src": "/images/heart.jpg",
        "id": "lives1"
    })
    livesDiv1.css({
        "margin-left": "10px",
        "max-width": "80%",
        "top": "0%",
        "max-height": "80%",
        "float":"left"
    });
    var livesDiv2 = $(document.createElement("image"));
    livesDiv2.attr({
        "src":"/images/heart.jpg",
        "id": "lives2"
    });
    livesDiv2.css({
        "margin-left": "10px",
        "max-width": "80%",
        "top": "0%",
        "max-height": "80%",
        "float": "left"
    });
    var livesDiv3 = $(document.createElement("image"));
    livesDiv3.attr({
        "src":"/images/heart.jpg",
        "id": "lives3"
    })
    livesDiv3.css({
        "margin-left": "10px",
        "max-width": "80%",
        "top": "0%",
        "max-height": "80%",
        "float": "left"
    });

    var circle = makeCircle(20, 5, 0, 5, "#FFCCFF");
    circle.css({
        "position": "relative",
        "float": "left",
        "margin-left": "5%"
    });

    var score = $(document.createElement("div"));
    score.css({
        "position": "relative",
        "float": "left",
        "top": "10px",
        "margin-left": "3px",
        "font-size": "80%",
        "color": "#0099FF",
        "font-weight": "300",
        "line-height": "20px"
    });
    score.attr("id", "scoreText");
    score.text("0");
    innerPanel.append(livesDiv1).append(livesDiv2).append(livesDiv3).append(circle).append(score);
    panel.append(innerPanel);
    page.append(panel);
    
}