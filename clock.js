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
    var color = '#000000';

    var date = new Date();

    var hand = new Hand(ORIGO, RADIUS, OFFSET_ANGLE, date);
    hand.draw(this.canvas, color);
}

Clock.prototype.clearCanvas = function () {
    this.canvas.clearRect (0, 0, CANVAS.width, CANVAS.height);
}

Clock.prototype.drawDial = function () {
    var color = '#000000';
    this.dial.draw(this.canvas, color);
}


