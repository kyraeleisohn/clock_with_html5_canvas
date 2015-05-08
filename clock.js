const RADIUS = 250;

const ORIGO = {
    x : 300,
    y : 300
}

const CANVAS = {
    width : 600,
    height : 600
}

const DIAL_DIVISION = 60;

const OFFSET_ANGLE = -90;

function Clock(canvasId) {
    this.canvas = this.getCanvas(canvasId);
    this.dial   = this.getDial();
}

Clock.prototype.getCanvas = function (canvasId) {
    var canvas = document.getElementById(canvasId);

    return canvas.getContext("2d");
}

Clock.prototype.getDial = function () {
    var width = 20;

    return new Dial(ORIGO, RADIUS, width, DIAL_DIVISION, OFFSET_ANGLE);
}

Clock.prototype.start = function () {
    this.draw();
    var t = this;
    this.timerHandle = setInterval(function(){t.draw();}, 5);
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

Clock.prototype.drawDial = function () {
    var color = '#000000';
    this.dial.draw(this.canvas, color);
}

Clock.prototype.drawHours = function (hours) {
    const HOUR_PER_DAY = 12;

    if (hours > HOUR_PER_DAY) {
        hours -= HOUR_PER_DAY;
    }

    var radius = 40;
    var color = '#FF0044';

    var origo = this.dial.getPositionByPercentage(hours / HOUR_PER_DAY);

    this.drawCircle(origo, radius, color);
}

Clock.prototype.drawMinutes = function (minutes) {
    const MINUTES_PER_HOUR = 60;

    var radius = 30;
    var color = '#440044';

    var origo = this.dial.getPositionByPercentage(minutes / MINUTES_PER_HOUR);

    this.drawCircle(origo, radius, color);
}

Clock.prototype.drawSeconds = function (seconds) {
    const SECONDS_PER_MINUTE = 60;

    var radius = 20;
    var fillColor = 'rgba(255,255,255,0.5)';
    var lineWidth = 2;
    var lineColor = '#000000';

    var origo = this.dial.getPositionByPercentage(seconds / SECONDS_PER_MINUTE);

    var circle = new Circle(origo, radius);
    circle.draw(this.canvas, fillColor, lineWidth, lineColor);
}

Clock.prototype.drawCircle = function (origo, radius, color) {
    var circle = new Circle(origo, radius);
    circle.draw(this.canvas, color);
}


