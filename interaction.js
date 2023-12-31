let numDialogo = 0;
const dialogo = document.querySelector(".dialogo");
let checksDoor = false;

const scrollingContent = document.querySelector(".end");

function scrollDown() {
  if (document.querySelector(".end").style.display == "block") {
    scrollingContent.scrollTop += 1;
  }
}

setInterval(scrollDown, 50);

function credit() {
  document.querySelector(".credit").classList.toggle("active");
}

function play() {
  document.querySelector(".home").style.display = "none";
  document.querySelector("canvas").style.display = "block";
}

function password() {
  let passwordScreen = document.getElementById("passwordFirsth").value;
  let passwordEnd = document.getElementById("passwordEnd").value;

  if (passwordScreen == 10000010) {
    document.querySelector(".password").style.display = "none";
    document.querySelector(".windows").style.display = "block";
  }
  if (passwordEnd == "ccccc") {
    document.querySelector(".windows").style.display = "none";
    document.querySelector(".congratulations").style.display = "flex";
    checksDoor = true;
  }
}

function sair() {
  document.querySelector(".screen").style.display = "none";
}

function questions() {
  document.querySelector(".content-questions").classList.toggle("active");
}

function passwordEnd() {
  document.querySelector(".charad-container").classList.toggle("active");
}

function menu() {
  document.querySelector(".menu").style.display = "block";
  document.querySelector(".text-player").style.display = "none";
}

function textarea() {
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".text-player").style.display = "block";
}

function mensagemdDialogo(numCasa) {
  if (numCasa[numDialogo] == undefined) {
    document.querySelector(".telaConversa").style.display = "none";
    numDialogo = 0;
  }
  dialogo.innerHTML = numCasa[numDialogo];
}

function gettaskbinery(taskof) {
  let task = taskbinary.indexOf(taskof);
  document.querySelector(".telaConversa").style.display = "block";
  switch (task) {
    case 0:
      numCasa = textTaskBinary.taskFirst;
      mensagemdDialogo(numCasa);
      break;
    case 1:
      numCasa = textTaskBinary.taskSecond;
      mensagemdDialogo(numCasa);
      break;
    case 2:
      numCasa = textTaskBinary.taskThird;
      mensagemdDialogo(numCasa);
      break;
    case 3:
      numCasa = textTaskBinary.taskFourth;
      mensagemdDialogo(numCasa);
      break;
  }
}

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    numDialogo++;
    console.log("Tarefa rodando");
    mensagemdDialogo(numCasa);
  }
  if (event.keyCode === 89) {
    console.log("abrir menu");
    document.querySelector(".book").classList.toggle("active");
  }
  if (event.keyCode === 77) {
    document.querySelector(".mapa").classList.toggle("active");
  }
});
