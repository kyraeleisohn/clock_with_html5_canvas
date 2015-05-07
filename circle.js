function Circle(canvas, x, y, radius) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.radius = radius;
}

Circle.prototype.draw = function (color) {
    this.canvas.fillStyle = color;
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.canvas.closePath();
    this.canvas.fill();
}

Circle.prototype.getCoordinatesFromPercentage = function (percentage) {
    const OFFSET_PERCENTAGE = -0.25;

    var angle = this.percentageToAngle(OFFSET_PERCENTAGE) + this.percentageToAngle(percentage);

    return this.applyAngle(this.x, this.y, angle, this.radius);
}

Circle.prototype.percentageToAngle = function (degree) {
    return degree * 2 * Math.PI;
}

Circle.prototype.applyAngle = function (x, y, angle, distance) {
    return {
        x: x + (Math.cos(angle) * distance),
        y: y + (Math.sin(angle) * distance)
    };
};
