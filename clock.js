var clock = new Clock();

Clock.prototype.initCanvas = function (canvasId) {
    canvas = document.getElementById(canvasId);
    canvas = canvas.getContext("2d");
}
Clock.prototype.initDraw = function (canvasId) {
    initCanvas(canvasId);
    draw();
    timerHandle = setInterval(draw, 5);
}

function Clock() {
    var canvas;
    var timerHandle;

    function initDraw(canvasId) {
        initCanvas(canvasId);
        draw();
        timerHandle = setInterval(draw, 5);
    }

    function draw() {
        drawFrame();

        var date = new Date();

        drawHours(date.getHours());
        drawMinutes(date.getMinutes());
        drawSeconds(date.getSeconds());
    }

    function initCanvas(canvasId) {
        canvas = document.getElementById(canvasId);
        canvas = canvas.getContext("2d");
    }

    function drawFrame() {
        var x = 250;
        var y = 250;
        var radius = 250;
        var color = '#FF00FF';

        drawCircle(x, y, radius, color);
    }

    function drawHours(hours) {
        const HOUR_PER_DAY = 12;

        if (hours > HOUR_PER_DAY) {
            hours -= HOUR_PER_DAY;
        }

        var radius = 40;
        var color = '#FF0044';

        var coordinates = getCoordinatesFromPercentage(hours / HOUR_PER_DAY);

        drawCircle(coordinates.x, coordinates.y, radius, color);
    }

    function drawMinutes(minutes) {
        const MINUTES_PER_HOUR = 60;

        var radius = 30;
        var color = '#440044';

        var coordinates = getCoordinatesFromPercentage(minutes / MINUTES_PER_HOUR);

        drawCircle(coordinates.x, coordinates.y, radius, color);
    }

    function drawSeconds(seconds) {
        const SECONDS_PER_MINUTE = 60;

        var radius = 20;
        var color = '#FF2244';

        var coordinates = getCoordinatesFromPercentage(seconds / SECONDS_PER_MINUTE);

        drawCircle(coordinates.x, coordinates.y, radius, color);
    }

    function getCoordinatesFromPercentage(percentage) {
        const RADIUS = 250;
        const OFFSET_PERCENTAGE = -0.25;

        var angle = percentageToAngle(OFFSET_PERCENTAGE) + percentageToAngle(percentage);

        return applyAngle(250, 250, angle, RADIUS);
    }

    function percentageToAngle(degree) {
        return degree * 2 * Math.PI;
    }

    function applyAngle(x, y, angle, distance) {
        return {
            x: x + (Math.cos(angle) * distance),
            y: y + (Math.sin(angle) * distance)
        };
    };

    function drawCircle(x, y, radius, color) {
        canvas.fillStyle = color;
        canvas.beginPath();
        canvas.arc(x, y, radius, 0, Math.PI * 2);
        canvas.closePath();
        canvas.fill();
    }
}

