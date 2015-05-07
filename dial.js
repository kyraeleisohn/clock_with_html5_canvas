function Dial(canvas, x, y, radius, width)
{
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.width = width;
}

Dial.prototype.draw = function (color) {
    var division = 60;
    var halfWidth = this.width / 2;
    var circle = new Circle(this.canvas, this.x, this.y, this.radius);
    var innerCircle = new Circle(this.canvas, this.x, this.y, this.radius - halfWidth);
    var outerCircle = new Circle(this.canvas, this.x, this.y, this.radius + halfWidth);

    for (var i = 0; i < division; i++) {
        var oneStepPercentage = ((360 / division) * i) / 360;

        if (i % 5 === 0) {
            var textCoordinate = circle.getCoordinatesFromPercentage(oneStepPercentage);
            this.canvas.font = this.width + 'pt Calibri';
            this.canvas.textAlign = 'center';
            this.canvas.fillText(i, textCoordinate.x, textCoordinate.y + halfWidth);
        }
        else {
            var innerCoordinate = innerCircle.getCoordinatesFromPercentage(oneStepPercentage);
            var outerCoordinate = outerCircle.getCoordinatesFromPercentage(oneStepPercentage);

            this.canvas.beginPath();
            this.canvas.moveTo(innerCoordinate.x, innerCoordinate.y);
            this.canvas.lineTo(outerCoordinate.x, outerCoordinate.y);
            this.canvas.stroke();
            this.canvas.closePath();
        }
    }
}

