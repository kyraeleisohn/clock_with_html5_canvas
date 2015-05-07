const RADIUS = 250;

const ORIGO = {
    x : 300,
    y : 300
}

const CANVAS = {
    width : 600,
    height : 600
}

function Clock(canvasId) {
    var canvas;
    var timerHandle;

    this.initCanvas(canvasId);

    // TODO: put this into the dial after i know how to use extend.
    this.dialCircle = new Circle(this.canvas, ORIGO.x, ORIGO.y, RADIUS);
}

Clock.prototype.initCanvas = function (canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas = this.canvas.getContext("2d");
}

Clock.prototype.initDraw = function (canvasId) {

    this.draw();
    var t = this;
    this.timerHandle = setInterval(function(){t.draw();}, 5);
}

Clock.prototype.drawDial = function () {
    var color = '#FF00FF';
    var width = 20;
    var dial = new Dial(this.canvas, ORIGO.x, ORIGO.y, RADIUS, width);
    dial.draw(color);
}

Clock.prototype.draw = function () {
    this.clearCanvas();
    this.drawDial();

    var date = new Date();

    this.drawHours(date.getHours());
    this.drawMinutes(date.getMinutes());
    this.drawSeconds(date.getSeconds());
}

Clock.prototype.clearCanvas = function () {
    this.canvas.clearRect (0, 0, CANVAS.width, CANVAS.height);
}

Clock.prototype.drawHours = function (hours) {
    const HOUR_PER_DAY = 12;

    if (hours > HOUR_PER_DAY) {
        hours -= HOUR_PER_DAY;
    }

    var radius = 40;
    var color = '#FF0044';

    var coordinates = this.dialCircle.getCoordinatesFromPercentage(hours / HOUR_PER_DAY);

    this.drawCircle(coordinates.x, coordinates.y, radius, color);
}

Clock.prototype.drawMinutes = function (minutes) {
    const MINUTES_PER_HOUR = 60;

    var radius = 30;
    var color = '#440044';

    var coordinates = this.dialCircle.getCoordinatesFromPercentage(minutes / MINUTES_PER_HOUR);

    this.drawCircle(coordinates.x, coordinates.y, radius, color);
}

Clock.prototype.drawSeconds = function (seconds) {
    const SECONDS_PER_MINUTE = 60;

    var radius = 20;
    var color = '#FF2244';

    var coordinates = this.dialCircle.getCoordinatesFromPercentage(seconds / SECONDS_PER_MINUTE);

    this.drawCircle(coordinates.x, coordinates.y, radius, color);
}

Clock.prototype.drawCircle = function (x, y, radius, color) {
    var circle = new Circle(this.canvas, x, y, radius);
    circle.draw(color);
}


