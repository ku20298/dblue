function loadImage(event) {
    var file = event.target.files;
    var reader = new FileReader();

    reader.readAsDataURL(file[0]);

    reader.onload = function () {
        var src = reader.result;
        drawCanvas(src);
    };
}

function drawCanvas(source) {
    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        var context = canvas.getContext("2d");
        var image = new Image();
        image.src = source;
        image.onload = function () {
            /*
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
            */
            
            if (image.width > 700) {
                canvas.width = 700;
                canvas.height = Math.floor(image.height * (700 / image.width));
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
            }else {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
            }
            
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data
            console.log(canvas.width*canvas.height)
            for (var i = 0, l = canvas.width * canvas.height * 4; i < l; i += 4) {
                var r = data[i] / 255;
                var g = data[i + 1] / 255;
                var b = data[i + 2] / 255;
                imageData = checkColor(r, g, b, i, imageData);
            }
        
            context.putImageData(imageData, 0, 0);
        };
    }
}

var dR = 0.0 / 255.0;
var dG = 210.0 / 255.0;
var dB = 255.0 / 255.0;

function checkColor(r, g, b, i, imageData) {
    var distance = Math.sqrt((dR - r) * (dR - r) + (dG - g) * (dG - g) + (dB - b) * (dB - b));
    var data = imageData.data;

    if (distance < 0.62) {
        console.log("d");
        data[i] = 1;
        data[i + 1] = 51;
        data[i + 2] = 206;
        data[i + 3] = 255;
    }

    return imageData;
}
