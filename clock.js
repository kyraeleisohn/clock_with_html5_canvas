const RADIUS = 250;
const ORIGO = {
    x : 300,
    y : 300
}
const CANVAS = {
    width : 600,
    height : 600
}

function Clock() {
    var canvas;
    var timerHandle;
}

Clock.prototype.initCanvas = function (canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas = this.canvas.getContext("2d");
}

Clock.prototype.initDraw = function (canvasId) {
    this.initCanvas(canvasId);
    this.draw();
    var t = this;
    this.timerHandle = setInterval(function(){t.draw();}, 5);
}

Clock.prototype.drawFrame = function () {
    var color = '#FF00FF';

    this.drawCircle(ORIGO.x, ORIGO.y, RADIUS, color);
}

Clock.prototype.draw = function () {
    this.clearCanvas();
    this.drawFrame();

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

    var coordinates = this.getCoordinatesFromPercentage(hours / HOUR_PER_DAY);

    this.drawCircle(coordinates.x, coordinates.y, radius, color);
}

Clock.prototype.drawMinutes = function (minutes) {
    const MINUTES_PER_HOUR = 60;

    var radius = 30;
    var color = '#440044';

    var coordinates = this.getCoordinatesFromPercentage(minutes / MINUTES_PER_HOUR);

    this.drawCircle(coordinates.x, coordinates.y, radius, color);
}

Clock.prototype.drawSeconds = function (seconds) {
    const SECONDS_PER_MINUTE = 60;

    var radius = 20;
    var color = '#FF2244';

    var coordinates = this.getCoordinatesFromPercentage(seconds / SECONDS_PER_MINUTE);

    this.drawCircle(coordinates.x, coordinates.y, radius, color);
}

Clock.prototype.getCoordinatesFromPercentage = function (percentage) {
    const OFFSET_PERCENTAGE = -0.25;

    var angle = this.percentageToAngle(OFFSET_PERCENTAGE) + this.percentageToAngle(percentage);

    return this.applyAngle(ORIGO.x, ORIGO.y, angle, RADIUS);
}

Clock.prototype.percentageToAngle = function (degree) {
    return degree * 2 * Math.PI;
}

Clock.prototype.applyAngle = function (x, y, angle, distance) {
    return {
        x: x + (Math.cos(angle) * distance),
        y: y + (Math.sin(angle) * distance)
    };
};

Clock.prototype.drawCircle = function (x, y, radius, color) {
    this.canvas.fillStyle = color;
    this.canvas.beginPath();
    this.canvas.arc(x, y, radius, 0, Math.PI * 2);
    this.canvas.closePath();
    this.canvas.fill();
}

Clock.prototype.constructor = function Clock() {
    var canvas;
    var timerHandle;
}


