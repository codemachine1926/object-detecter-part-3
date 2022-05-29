ac_img = "";
status = "";
object = [];
function preload() {
    ac_img = loadImage("ac_i.jpg");
}

function setup() {
    canvas = createCanvas(600,400);
    canvas.position(400,150);

    document.getElementById("status").innerHTML = "Status : Objects are getting detected";
    modelload = ml5.objectDetector("cocossd", modelloaded);
}

function back() {
    window.location = "index.html";
}
function modelloaded() {
    console.log("model is loaded");
    status = true;
    modelload.detect(ac_img, gotresult);
}
function gotresult(error,results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}
function draw() {
    image(ac_img,0,0,600,400);

    if(status != "") {
        for(i = 0; i < object.length; i++) {
            confi = Math.floor(object[i].confidence * 100);
            document.getElementById("status").innerHTML = "Status : Objects are detected";
            document.getElementById("object").innerHTML = "No. of Objects : " + object.length;
            fill("black");
            text(object[i].label + "  " + confi + "%",object[i].x + 10,object[i].y + 10);
            noFill();
            stroke("red");
            strokeWeight(2);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}