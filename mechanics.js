/*zoom tiled 390%*/
/*bloco tem 16 px tamanho total do bloco = 88px*/
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const squareArea = 88;
let frameEnemy = 0;

canvas.width = 1180;
canvas.height = 720;

c.fillStyle = "#18215D";
c.fillRect(0, 0, canvas.width, canvas.height);

const imgPlayer = new Image();
imgPlayer.src = "./assets/playerDown.png";

//////////////////////////////
//create class for interface//
//////////////////////////////

class Boundary {
  constructor({ position }) {
    this.position = position;
  }

  draw() {
    c.fillStyle = "rgba(255, 0, 0, 0)";
    c.fillRect(this.position.x, this.position.y, squareArea, squareArea);
  }
}

class Player {
  constructor({ position, player, frame }) {
    this.position = position;
    this.player = player;
    this.frame = frame;
  }
  draw() {
    c.drawImage(
      this.player,
      (this.player.width / 4) * this.frame,
      0,
      this.player.width / 4,
      this.player.height,
      this.position.x,
      this.position.y,
      this.player.width / 4,
      this.player.height
    );
  }
}

class Sprite {
  constructor({ position }) {
    this.position = position;
  }
  draw() {
    c.drawImage(map, this.position.x, this.position.y);
  }
  drawDoor() {
    c.drawImage(imgDoor, this.position.x, this.position.y);
  }
}

const mapCollision = [];
for (let i = 0; i < collisions.length; i += 40) {
  mapCollision.push(collisions.slice(i, 40 + i));
}

const boundaries = [];
const taskbinary = [];
const charade = [];
const door = [];

mapCollision.forEach((row, i) => {
  row.forEach((character, j) => {
    if (
      character == "97" ||
      character == "96" ||
      character == "93" ||
      character == "94"
    ) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * 88 + 390,
            y: i * 88 + 0,
          },
        })
      );
    }
    if (character == "96") {
      taskbinary.push(
        new Boundary({
          position: {
            x: j * 88 + 390,
            y: i * 88 + 0,
          },
        })
      );
    }
    if (character == "93") {
      charade.push(
        new Boundary({
          position: {
            x: j * 88 + 390,
            y: i * 88 + 0,
          },
        })
      );
    }
    if (character == "94") {
      door.push(
        new Boundary({
          position: {
            x: j * 88 + 390,
            y: i * 88 + 0,
          },
        })
      );
    }
  });
});

/////////////
//add image//
/////////////
const map = new Image();
map.src = "./assets/mapa.png";

const imgDoor = new Image();
imgDoor.src = "./assets/door.png";

const background = new Sprite({
  position: {
    x: 390,
    y: 0,
  },
});

const openDoor = new Sprite({
  position: {
    x: 390,
    y: 0,
  },
});

const player = new Player({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  player: imgPlayer,
  frame: 0,
});

let lastKey = "";

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function verificaCollision(player, { position }) {
  return (
    player.position.x + 48 >= position.x &&
    player.position.x <= position.x + squareArea &&
    player.position.y + 68 >= position.y &&
    player.position.y <= position.y + squareArea - 30
  );
}

function mudarFrameX() {
  if (player.frame < 3) {
    if (background.position.x % 50 == 0) {
      //   pegadas.pause();
      player.frame = player.frame + 1;
      // //   pegadas.src = audioPegadas[player.frame];
      //   pegadas.play();
    }
  } else if (background.position.x % 50 == 0) {
    // pegadas.pause();
    player.frame = 0;
    // pegadas.src = "./audio/wood02.ogg";
    // pegadas.play();
  }
}

function mudarFrameY() {
  if (player.frame < 3) {
    if (background.position.y % 50 == 0) {
      player.frame = player.frame + 1;
      //   pegadas.pause();
      // //   pegadas.src = audioPegadas[player.frame];
      //   pegadas.play();
    }
  } else if (background.position.y % 50 == 0) {
    player.frame = 0;
    // pegadas.pause();
    // pegadas.src = "./audio/wood02.ogg";
    // pegadas.play();
  }
}

const movement = [background, openDoor];

function move() {
  //////////////
  //draw image//
  //////////////
  background.draw();
  if (checksDoor) {
    openDoor.drawDoor();
    for (let i = 0; i < door.length; i++) {
      if (
        verificaCollision(player, {
          position: {
            x: door[i].position.x,
            y: door[i].position.y + 5,
          },
        })
      ) {
        document.querySelector(".end").style.display = "block";
      }
    }
  }
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  taskbinary.forEach((boundary) => {
    boundary.draw();
  });
  charade.forEach((boundary) => {
    boundary.draw();
  });
  door.forEach((boundary) => {
    boundary.draw();
  });

  player.draw();

  let check = true;
  if (keys.w.pressed && lastKey === "w") {
    for (let i = 0; i < taskbinary.length; i++) {
      if (
        verificaCollision(player, {
          position: {
            x: taskbinary[i].position.x,
            y: taskbinary[i].position.y + 5,
          },
        })
      ) {
        console.log("tasktarefa");
        numDialogo = 0;
        gettaskbinery(taskbinary[i]);
      }
    }
    for (let i = 0; i < charade.length; i++) {
      if (
        verificaCollision(player, {
          position: {
            x: charade[i].position.x,
            y: charade[i].position.y + 5,
          },
        })
      ) {
        console.log("charada");
        document.querySelector(".screen").style.display = "block";
      }
    }
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        verificaCollision(player, {
          position: {
            x: boundary.position.x,
            y: boundary.position.y + 5,
          },
        })
      ) {
        check = false;
        break;
      }
    }

    if (check) {
      movement.forEach((move) => {
        move.position.y += 5;
      });
      boundaries.forEach((boundary) => {
        boundary.position.y += 5;
      });
      taskbinary.forEach((boundary) => {
        boundary.position.y += 5;
      });
      charade.forEach((boundary) => {
        boundary.position.y += 5;
      });
      door.forEach((boundary) => {
        boundary.position.y += 5;
      });
      mudarFrameY();
    }
  } else if (keys.a.pressed && lastKey === "a") {
    for (let i = 0; i < taskbinary.length; i++) {
      if (
        verificaCollision(player, {
          position: {
            x: taskbinary[i].position.x + 5,
            y: taskbinary[i].position.y,
          },
        })
      ) {
        console.log("tasktarefa");
        numDialogo = 0;
        gettaskbinery(taskbinary[i]);
      }
    }

    for (let i = 0; i < charade.length; i++) {
      if (
        verificaCollision(player, {
          position: {
            x: charade[i].position.x + 5,
            y: charade[i].position.y,
          },
        })
      ) {
        console.log("charada");
        document.querySelector(".screen").style.display = "block";
      }
    }
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        verificaCollision(player, {
          position: {
            x: boundary.position.x + 5,
            y: boundary.position.y,
          },
        })
      ) {
        check = false;
        break;
      }
    }

    if (check) {
      movement.forEach((move) => {
        move.position.x += 5;
      });
      boundaries.forEach((boundary) => {
        boundary.position.x += 5;
      });
      taskbinary.forEach((boundary) => {
        boundary.position.x += 5;
      });
      charade.forEach((boundary) => {
        boundary.position.x += 5;
      });
      door.forEach((boundary) => {
        boundary.position.x += 5;
      });
      mudarFrameX();
    }
  } else if (keys.s.pressed && lastKey === "s") {
    for (let i = 0; i < taskbinary.length; i++) {
      if (
        verificaCollision(player, {
          position: {
            x: taskbinary[i].position.x,
            y: taskbinary[i].position.y - 5,
          },
        })
      ) {
        console.log("tasktarefa");
        numDialogo = 0;
        gettaskbinery(taskbinary[i]);
      }
    }

    for (let i = 0; i < charade.length; i++) {
      if (
        verificaCollision(player, {
          position: {
            x: charade[i].position.x,
            y: charade[i].position.y - 5,
          },
        })
      ) {
        console.log("charada");
        document.querySelector(".screen").style.display = "block";
      }
    }
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        verificaCollision(player, {
          position: {
            x: boundary.position.x,
            y: boundary.position.y - 5,
          },
        })
      ) {
        check = false;
        break;
      }
    }

    if (check) {
      movement.forEach((move) => {
        move.position.y -= 5;
      });
      boundaries.forEach((boundary) => {
        boundary.position.y -= 5;
      });
      taskbinary.forEach((boundary) => {
        boundary.position.y -= 5;
      });
      charade.forEach((boundary) => {
        boundary.position.y -= 5;
      });
      door.forEach((boundary) => {
        boundary.position.y -= 5;
      });
      mudarFrameY();
    }
  } else if (keys.d.pressed && lastKey === "d") {
    for (let i = 0; i < taskbinary.length; i++) {
      if (
        verificaCollision(player, {
          position: {
            x: taskbinary[i].position.x - 5,
            y: taskbinary[i].position.y,
          },
        })
      ) {
        console.log("tasktarefa");
        numDialogo = 0;
        gettaskbinery(taskbinary[i]);
      }
    }

    for (let i = 0; i < charade.length; i++) {
      if (
        verificaCollision(player, {
          position: {
            x: charade[i].position.x - 5,
            y: charade[i].position.y,
          },
        })
      ) {
        console.log("charada");
        document.querySelector(".screen").style.display = "block";
      }
    }
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        verificaCollision(player, {
          position: {
            x: boundary.position.x - 5,
            y: boundary.position.y,
          },
        })
      ) {
        check = false;
        break;
      }
    }

    if (check) {
      movement.forEach((move) => {
        move.position.x -= 5;
      });
      boundaries.forEach((boundary) => {
        boundary.position.x -= 5;
      });
      taskbinary.forEach((boundary) => {
        boundary.position.x -= 5;
      });
      charade.forEach((boundary) => {
        boundary.position.x -= 5;
      });
      door.forEach((boundary) => {
        boundary.position.x -= 5;
      });
      mudarFrameX();
    }
  }

  window.requestAnimationFrame(move);
}

move();

////////////
//keyboard//
////////////

window.addEventListener("keydown", (click) => {
  if (
    document.querySelector(".book").style.display != "block" &&
    document.querySelector(".screen").style.display != "block" &&
    document.querySelector(".home").style.display != "block"
  ) {
    switch (click.keyCode) {
      case 87:
        keys.w.pressed = true;
        imgPlayer.src = "./assets/playerUp.png";
        lastKey = "w";
        break;
      case 65:
        keys.a.pressed = true;
        imgPlayer.src = "./assets/playerLeft.png";
        lastKey = "a";
        break;
      case 83:
        keys.s.pressed = true;
        imgPlayer.src = "./assets/playerDown.png";
        lastKey = "s";
        break;
      case 68:
        keys.d.pressed = true;
        imgPlayer.src = "./assets/playerRight.png";
        lastKey = "d";
        break;
      case 77:
        // document.querySelector(".mapa").style.display = "block";
        break;
    }
  }
});

window.addEventListener("keyup", (click) => {
  switch (click.keyCode) {
    case 87:
      keys.w.pressed = false;
      break;
    case 65:
      keys.a.pressed = false;
      break;
    case 83:
      keys.s.pressed = false;
      break;
    case 68:
      keys.d.pressed = false;
      break;
    case 77:
      //   document.querySelector(".mapa").style.display = "none";
      break;
  }
});

setInterval(() => {
  if (frameEnemy > 0) {
    frameEnemy = -1;
  }
  frameEnemy++;
}, 700);

window.addEventListener("load", function () {
  //   document.querySelector(".load").style.display = "none";
});
