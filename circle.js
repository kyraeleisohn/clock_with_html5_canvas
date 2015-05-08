function Circle(origo, radius, offsetAngle) {
    this.origo = origo;
    this.radius = radius;
    this.offsetAngle = offsetAngle ? offsetAngle : 0;
}

Circle.prototype.draw = function (canvas, fillColor, lineWidth, lineColor) {

    canvas.beginPath();
    canvas.arc(this.origo.x, this.origo.y, this.radius, 0, Math.PI * 2);
    canvas.fillStyle = fillColor;
    canvas.fill();
    canvas.lineWidth = lineWidth;
    canvas.strokeStyle = lineColor;
    canvas.stroke();
    canvas.closePath();
}

Circle.prototype.getCoordinatesFromPercentage = function (percentage) {
    var angle = this.percentageToAngle(percentage);

    return this.applyDegree(angle);
}

Circle.prototype.percentageToAngle = function (percentage) {
    return this.angleToDegree(360 * percentage);
}

Circle.prototype.angleToDegree = function (angle) {
    return (angle / 360) * 2 * Math.PI;
}

Circle.prototype.applyAngle = function (angle) {
    return this.applyDegree(this.angleToDegree(angle));
}

Circle.prototype.applyDegree = function (degree) {
    degree += this.angleToDegree(this.offsetAngle);
    return {
        x: this.origo.x + (Math.cos(degree) * this.radius),
        y: this.origo.y + (Math.sin(degree) * this.radius)
    };
};
