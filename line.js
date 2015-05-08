function Line(startPoint, endPoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
}

Line.prototype.draw = function (canvas, color) {
    canvas.beginPath();
    canvas.moveTo(this.startPoint.x, this.startPoint.y);
    canvas.lineTo(this.endPoint.x, this.endPoint.y);
    canvas.strokeStyle = color;
    canvas.stroke();
    canvas.closePath();
}