const MINUTE_RADIUS = 20;

function Hand(origo, radius, offsetAngle, date) {
    this.origo = origo;
    this.date = date;

    this.dialCircle = new Circle(origo, radius, offsetAngle);
    this.secondCircle = new Circle(origo, radius - MINUTE_RADIUS, offsetAngle);
    this.hourCircle = new Circle(origo, radius - 100, offsetAngle);
}

Hand.prototype.draw = function (canvas, color) {
    this.drawHandFromHourToMinute(canvas, color);
    this.drawHandFromMinuteToSecond(canvas, color);
    this.drawSeconds(canvas, this.date.getSeconds());
}

Hand.prototype.drawHandFromMinuteToSecond = function (canvas, color) {
    var minutePosition = this.getMinutePosition();
    var secondPosition = this.getSecondPosition();

    canvas.beginPath();
    canvas.moveTo(minutePosition.x, minutePosition.y);
    canvas.quadraticCurveTo(this.origo.x, this.origo.y, secondPosition.x, secondPosition.y);
    canvas.lineWidth = 2;
    canvas.stroke();
    canvas.closePath();
}

Hand.prototype.drawHandFromHourToMinute = function (canvas, color) {
    var hourPosition = this.getHourPosition();
    var minutePosition = this.getMinutePosition();

    canvas.beginPath();
    canvas.moveTo(hourPosition.x, hourPosition.y);
    canvas.quadraticCurveTo(this.origo.x, this.origo.y, minutePosition.x, minutePosition.y);
    canvas.lineWidth = 5;
    canvas.stroke();
    canvas.closePath();
}

Hand.prototype.getHourPosition = function () {
    var hour = this.date.getHours();

    if (hour > 12) {
        hour -= 12;
    }

    return this.hourCircle.getCoordinatesFromPercentage(hour / 12);
}

Hand.prototype.getMinutePosition = function () {
    var minutes = this.date.getMinutes();

    return this.secondCircle.getCoordinatesFromPercentage(minutes / 60);
}

Hand.prototype.getSecondPosition = function () {
    var second = this.date.getSeconds();

    return this.secondCircle.getCoordinatesFromPercentage(second / 60);
}

Hand.prototype.drawSeconds = function (canvas, seconds) {
    const SECONDS_PER_MINUTE = 60;

    var fillColor = 'rgba(255,255,255,0.5)';
    var lineWidth = 2;
    var lineColor = '#000000';

    var origo = this.dialCircle.getCoordinatesFromPercentage(seconds / SECONDS_PER_MINUTE);

    var circle = new Circle(origo, MINUTE_RADIUS);
    circle.draw(canvas, fillColor, lineWidth, lineColor);
}

Hand.prototype.drawCircle = function (origo, radius, color) {
    var circle = new Circle(origo, radius);
    circle.draw(this.canvas, color);
}