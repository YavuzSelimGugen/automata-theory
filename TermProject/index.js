var inp = document.getElementById("input");
inp.disabled = true;



function canvas_arrow(bin) {
    fromx = 0, fromy = 75, tox = 40, toy = 75;
    context = document.getElementById('arrowCanvas').getContext('2d');
    context.beginPath();
    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toy - fromy, tox - fromx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));

    context.font = "20px Georgia";
    context.fillText(bin, 10, 70);

    context.stroke()
    setTimeout(clearCanvas, 1000, "arrowCanvas");

    // clearCanvas("arrowCanvas")
}

function clearCanvas(id) {
    canvas = document.getElementById(id)
    const context = canvas.getContext('2d');
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawinpstack(b) {
    clearCanvas("myCanvas")
    ls = inp.value.length;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "20px Georgia";
    linecount = 150 / ls;
    let ypos;
    for (let i = ls; i >= b; i--) {
        ypos = i * linecount;
        ctx.moveTo(0, ypos);
        ctx.lineTo(200, ypos);
        if (input.value[i] == "0") {
            ctx.fillText("0", 20, ypos + 20);
        } else {
            ctx.fillText("1", 20, ypos + 20);
        }

        ctx.stroke();
    }
}

function deneme() {
    setTimeout(step1, 1000);
    setTimeout(step2, 3000);
    setTimeout(step3, 5000);
    setTimeout(step4, 7000);
    setTimeout(denemepop, 10000)
    setTimeout(PDA, 11000, inp.value)

}
function denemepop() {
    setTimeout(stpop1, 1000);
    setTimeout(stpop2, 3000);
    setTimeout(stpop3, 5000);
    setTimeout(stpop4, 7000);
}
function step(i) {
    drawinpstack(i)
    if (input.value[i] == "0") canvas_arrow(0);
    else canvas_arrow(1);
}
function step1() {
    drawinpstack(1)
    if (input.value[0] == "0") canvas_arrow(0);
    else canvas_arrow(1);
    setTimeout(stpush, 2000, 0, 0);
}
function step2() {
    drawinpstack(2)
    if (input.value[1] == "0") canvas_arrow(0);
    else canvas_arrow(1);
    setTimeout(stpush, 2000, 0, 1);
}
function step3() {
    drawinpstack(3)
    if (input.value[2] == "0") canvas_arrow(0);
    else canvas_arrow(1);
    setTimeout(stpush, 2000, 1, 2);
}
function step4() {
    drawinpstack(4)
    if (input.value[3] == "0") canvas_arrow(0);
    else canvas_arrow(1);
    setTimeout(stpush, 2000, 1, 3);
}
function step5() {
    drawinpstack(5)
    if (input.value[4] == "0") canvas_arrow(0);
    else canvas_arrow(1);
}
function stpush(bin, step) {
    var c = document.getElementById("stackCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "20px Georgia";
    ypos = (150 - (step + 1) * 20)
    ctx.moveTo(0, 20);
    ctx.fillText(bin, 45, ypos);
    ctx.stroke()
}
function stpop1() {
    clearCanvas("stackCanvas");
    var c = document.getElementById("stackCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "20px Georgia";

    ctx.moveTo(0, 0);
    ctx.fillText(0, 45, 130);
    ctx.fillText(0, 45, 110);
    ctx.fillText(1, 45, 90);
    ctx.stroke()

}
function stpop2() {
    clearCanvas("stackCanvas");
    var c = document.getElementById("stackCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "20px Georgia";

    ctx.moveTo(0, 0);
    ctx.fillText(0, 45, 130);
    ctx.fillText(0, 45, 110);
    ctx.stroke()

}
function stpop3() {
    clearCanvas("stackCanvas");
    var c = document.getElementById("stackCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "20px Georgia";

    ctx.moveTo(0, 0);
    ctx.fillText(0, 45, 130);
    ctx.stroke()

}
function stpop4() {
    clearCanvas("stackCanvas");
    var c = document.getElementById("stackCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "20px Georgia";

    ctx.moveTo(0, 0);
    ctx.stroke()

}

function removeText(x, y, txt_length, font_height, char_width) {
    let c = document.getElementById("stackCanvas");
    let ctx = c.getContext("2d");
    ctx.clearRect(x, y - font_height, char_width * txt_length, font_height);
}

//Draw input tape
function draw() {
    drawinpstack(0)
        
    let c = document.getElementById('fcuCanvas');
    let ctx = c.getContext('2d')
    ctx.font = "15px Arial";
    ctx.fillText("(0 ^ n)(1 ^ n) /n", 25, 75);
}
//Program For PDA Which Accpets Strings Of (0^n)(1^n)\n
function PDA(input) {
    let st = new Array();
    let topOfStack = -1;
    for (let i = 0; i < input.length; i++) {
        if (input[i] == '0' || input[i] == '1') {
            if (input[i] == '0') {
                st.push(input[i]);
                console.log("st push 0" + i)
                topOfStack++;
            }
            else {
                st.pop(input[i]);
                console.log("st pop" + input[i] + " - " + i)
                topOfStack--;
            }
        } else {
            break;
        }
    }
    if (topOfStack == -1) {
        // console.log("Accepted");
        document.getElementById("resA").style.color = "green";
        document.getElementById("resA").hidden = false;
        document.getElementById("resR").hidden = true;
        return 1;
    }
    else {
        // console.log("Rejected");
        document.getElementById("resR").style.color = "red";
        document.getElementById("resR").hidden = false;
        document.getElementById("resA").hidden = true;
        return 0;
    }
}
draw()
