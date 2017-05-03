var drawingDots = [];
var baseDots = [];
var checkbox;
var UPFInput;
var UPF;
var FRInput;
var FR = undefined;
var alphaInput;
var alphaCol;
var proportion;
var proportionInput;
var reset;

function setup() {
    createCanvas(800, 600);
    background(51);
    drawingDots.push(new DrawingDot);
    checkbox = createCheckbox('Toggle run', false);
    checkbox.changed(toggleLoop);
    UPF = createInput('1');
    UPF.input(UPFChanged);
    FRInput = createInput('60');
    FRInput.input(FRChanged);
    alphaInput = createSlider(0, 255, 255, 5);
    porportionInput = createSlider(0, 1, 0.5, 0.01);
    reset = createButton('reset');
    reset.mousePressed(resetBG);
    /* for (var i = 0; i < 3; i++) {
         baseDots.push(new BaseDot);
     }*/
    /* baseDots.push(new BaseDot(width / 2, 150))
     baseDots.push(new BaseDot(width / 8, 650))
     baseDots.push(new BaseDot(width - width / 8, 650))*/
    frameRate(FR);
    noLoop();
    UPF = 1;
}

function draw() {

    if (frameCount < 5) {
        background(51)
    }

    alphaCol = alphaInput.value();
    proportion = porportionInput.value();


    for (var s = 0; s < UPF; s++)
        for (var i = 0; i < drawingDots.length; i++) {
            if (baseDots[0] != undefined) {
                drawingDots[i].render();
                drawingDots[i].update();
            }
        }

    for (var i = 0; i < baseDots.length; i++) {
        baseDots[i].render();
    }

}



function DrawingDot() {
    this.pos = createVector(width - width / 8, 650);
    this.base;
    this.vel = createVector();
    this.update = function () {
        var r = floor(random(0, baseDots.length));
        this.base = baseDots[r];
        this.vel = p5.Vector.sub(this.base.pos, this.pos)
        this.vel.mult(proportion)
        this.pos.add(this.vel);
    }
    this.render = function () {
        var colr = random(255);
        var colg = random(255);
        var colb = random(255);
        stroke(colr, colg, colb, alphaCol);
        strokeWeight(1);
        point(this.pos.x, this.pos.y);
    }
}


function BaseDot(x, y) {
    this.pos = createVector(x, y);

    this.render = function () {
        stroke(0, 255, 0);
        strokeWeight(3);
        point(this.pos.x, this.pos.y);
    }
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        baseDots.push(new BaseDot(mouseX, mouseY));
        for (var i = 0; i < baseDots.length; i++) {
            baseDots[i].render();
        }
    }
}

function resetBG() {
    background(51);
}

function toggleLoop() {
    if (this.checked()) {
        loop();
    } else {
        noLoop();
    }
}

function UPFChanged() {
    UPF = this.value();
}

function FRChanged() {
    FR = this.value();
}
