
img = "";
STATUS = "";
objects = [];

function preload() {
    img = loadImage('dog_cat.jpg');
}

function setup() {

    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO)
    video.size(380,380)
    video.hide();
    

    objectDetecter = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "status: object detecting"
}
function start(){

objectDetecter = ml5.objectDetector('cocossd', modelLoaded)
document.getElementById("status").innerHTML = "status: object detecting"  

}

function draw() {

    image(video, 0, 0, 380, 380);
    if (STATUS != "") {

        r = random(250)
        b = random(250)
        g = random(250)
        objectDetecter.detect(video, gotResult)

        for (i = 0; i < objects.length; i++) {
       
            document.getElementById("status").innerHTML = "Status : object detecting";
            document.getElementById("NO_OBJ").innerHTML="Number of object detected: "+ objects.length;
            fill(r,g,b)
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].x);
            noFill();
            stroke(r,g,b)
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height );
        }
    }
}



function modelLoaded() {

    console.log("modelLoaded");
    STATUS = true;
}

function gotResult(error, results) {
    if (error) {
        console.log("error");
    }
    else {
        console.log(results);
        objects = results;
    }

}



