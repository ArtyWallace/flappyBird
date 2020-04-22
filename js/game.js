let cvs = document.querySelector("#canvas"),
    ctx = cvs.getContext("2d");

let bird = new Image(),
    bg = new Image(),
    fg = new Image(),
    pipeUp = new Image(),
    pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

let gap = 90;

document.addEventListener("keydown", () => {
    yPosBird -= 25; 
});

let pipe = [
    {
        x : cvs.width,
        y : 0
    }
];


let xPosBird = 10,
    yPosBird = 150,
    grav = 1.5,
    score = 0;

let draw = () => {
    ctx.drawImage(bg, 0, 0);

    for (i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x === 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if (xPosBird + bird.width >= pipe[i].x
            && xPosBird <= pipe[i].x + pipeUp.width
            && (yPosBird <= pipe[i].y + pipeUp.height
            || yPosBird + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPosBird + bird.height >= cvs.height - fg.height) {
                location.reload();
        }

        if (pipe[i].x === 5) {
            score++;
        }
    }
    
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPosBird, yPosBird);

    yPosBird += grav;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Your score: " + score, 10, cvs.height - 20);
    
    requestAnimationFrame(draw);
};

pipeBottom.onload = draw;

