function Dial(origo, radius, width, division, offsetAngle)
{
    this.width    = width;
    this.division = division;

    this.halfWidth   = this.width / 2;
    this.circle      = new Circle(origo, radius, offsetAngle);
    this.innerCircle = new Circle(origo, radius - this.halfWidth, offsetAngle);
    this.outerCircle = new Circle(origo, radius + this.halfWidth, offsetAngle);
}

Dial.prototype.draw = function (canvas, markColor) {
    for (var markNumber = 0; markNumber < this.division; markNumber++) {
        this.drawMark(canvas, markColor, markNumber);
    }
}

Dial.prototype.drawMark = function (canvas, markColor, markNumber) {
    var currentAngle = this.getMarkAngle(markNumber);

    if (markNumber % 5 === 0) {
        this.drawDivisionNumber(canvas, markColor, markNumber, currentAngle);
        return;
    }

    this.drawDivisionLine(canvas, markColor, currentAngle);
}

Dial.prototype.getMarkAngle = function (markNumber) {
    return (360 / this.division) * markNumber;
}

Dial.prototype.drawDivisionLine = function (canvas, markColor, currentAngle) {
    var innerCoordinate = this.innerCircle.applyAngle(currentAngle);
    var outerCoordinate = this.outerCircle.applyAngle(currentAngle);

    var line = new Line(innerCoordinate, outerCoordinate);
    line.draw(canvas, markColor);
}

Dial.prototype.drawDivisionNumber = function (canvas, markColor, number, currentAngle) {
    var textCoordinate = this.circle.applyAngle(currentAngle);

    canvas.fillStyle = markColor;
    canvas.font = this.width + 'pt Calibri';
    canvas.textAlign = 'center';
    canvas.fillText(number, textCoordinate.x, textCoordinate.y + this.halfWidth);
}

Dial.prototype.getPositionByPercentage = function (percentage) {
    return this.circle.getCoordinatesFromPercentage(percentage);
}

