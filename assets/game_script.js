/*zoom tiled 550%*/
/*bloco tem 12 px tamanho total do bloco = 88px*/
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const squareArea = 88;
const videoInicial = document.querySelector(".videoInicio");
let frameEnemy = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function creditos_reveal() {
  document.querySelector(".btn_creditos").classList.toggle("active");
  document.querySelector(".img_title").classList.toggle("active");
  document.querySelector(".container_creditos").classList.toggle("active");
}

function play() {
  document.querySelector("#container_home").style.display = "none";
  // document.querySelector(".videoInicio").style.display = "block";
  // videoInicial.play();
}
// videoInicial.addEventListener("ended", function () {
//   videoInicial.style.display = "none";
// });

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const player = new Image();
player.src = "./img/playerDown.png";

//////////////////////////////
//create class for interface//
//////////////////////////////

class Boundary {
  constructor({ position }) {
    this.position = position;
  }

  draw() {
    c.fillStyle = "rgba(0, 0, 0, 0)";
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
    c.drawImage(image, this.position.x, this.position.y);
  }
  drawWall() {
    c.drawImage(wall, this.position.x, this.position.y);
  }
}

class Enemy {
  constructor({ position, image, name }) {
    this.position = position;
    this.image = image;
    this.name = name;
  }

  draw() {
    c.drawImage(
      this.image,
      (this.image.width / 2) * frameEnemy,
      0,
      this.image.width / 2,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / 2,
      this.image.height
    );
  }
}

/////////////
//collision//
/////////////

const mapCollision = [];
for (let i = 0; i < collisions.length; i += 70) {
  mapCollision.push(collisions.slice(i, 70 + i));
}

const boundaries = [];

mapCollision.forEach((row, i) => {
  row.forEach((character, j) => {
    if (character == "1864") {
      boundaries.push(
        new Boundary({
          position: {
            x: j * 88 + -100,
            y: i * 88 + -400,
          },
        })
      );
    }
  });
});

/////////////
//add image//
/////////////
const image = new Image();
image.src = "./img/mapaDungeon.png";

const wall = new Image();
wall.src = "./img/mapaDungeonParedes.png";

const enemy = new Image();
enemy.src = "./img/enemyteste.png";

const imgGalileu = new Image();
imgGalileu.src = "./img/galileu.png";

const galileu = new Enemy({
  position: {
    x: 3500,
    y: 500,
  },
  image: imgGalileu,
  name: "Galileu",
});

const inimigo2Img = new Image();
inimigo2Img.src = "./img/siameses.png";

const imgLobisomem = new Image();
imgLobisomem.src = "./img/lobisomem.png";

const lobisomen = new Enemy({
  position: {
    //{x: -4535 + , y: -185}
    x: 5220,
    y: 100,
  },
  image: imgLobisomem,
  name: "Lobisomen",
});

const imgBonzy = new Image();
imgBonzy.src = "./img/bonzy.png";

const bonzyBuddy = new Enemy({
  position: {
    //{x: -4535 + , y: -185}
    x: 300,
    y: 4500,
  },
  image: imgBonzy,
  name: "Bonzy Buddy",
});

const siameses = new Enemy({
  position: {
    //{x: -4535 + , y: -185}
    x: 300,
    y: 600,
  },
  image: inimigo2Img,
  name: "Siameses",
});

const bossImg = new Image();
bossImg.src = "./img/boss.png";

const boss = new Enemy({
  position: {
    x: 5250,
    y: 2274,
  },
  image: bossImg,
  name: "Cientista",
});

const background = new Sprite({
  position: {
    x: -100,
    y: -400,
  },
});

const playerteste = new Player({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  player: player,
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

function verificaCollision(playerteste, { position }) {
  return (
    playerteste.position.x + 48 >= position.x &&
    playerteste.position.x <= position.x + squareArea &&
    playerteste.position.y + 68 >= position.y &&
    playerteste.position.y <= position.y + squareArea - 30
  );
}

const audioPegadas = [
  "./audio/wood02.ogg",
  "./audio/wood01.ogg",
  "./audio/wood02.ogg",
  "./audio/wood03.ogg",
];
const pegadas = new Audio();

function mudarFrameX() {
  if (playerteste.frame < 3) {
    if (background.position.x % 50 == 0) {
      pegadas.pause();
      playerteste.frame = playerteste.frame + 1;
      pegadas.src = audioPegadas[playerteste.frame];
      pegadas.play();
    }
  } else if (background.position.x % 50 == 0) {
    pegadas.pause();
    playerteste.frame = 0;
    pegadas.src = "./audio/wood02.ogg";
    pegadas.play();
  }
}

function mudarFrameY() {
  if (playerteste.frame < 3) {
    if (background.position.y % 50 == 0) {
      playerteste.frame = playerteste.frame + 1;
      pegadas.pause();
      pegadas.src = audioPegadas[playerteste.frame];
      pegadas.play();
    }
  } else if (background.position.y % 50 == 0) {
    playerteste.frame = 0;
    pegadas.pause();
    pegadas.src = "./audio/wood02.ogg";
    pegadas.play();
  }
}

const movement = [background, galileu, lobisomen, bonzyBuddy, siameses, boss];
const inimigos = [galileu, lobisomen, bonzyBuddy, siameses];

function move() {
  //////////////
  //draw image//
  //////////////
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  galileu.draw();
  lobisomen.draw();
  bonzyBuddy.draw();
  siameses.draw();
  playerteste.draw();
  background.drawWall();
  if (numInimigosMortos == 4) {
    boss.draw();
  }

  for (let i = 0; i < inimigos.length; i++) {
    if (
      verificaCollision(playerteste, {
        position: {
          x: inimigos[i].position.x,
          y: inimigos[i].position.y,
        },
      })
    ) {
      caixaDialogoVerifica(inimigos[i]);
      keys.w.pressed = false;
      keys.a.pressed = false;
      keys.s.pressed = false;
      keys.d.pressed = false;
    }
  }

  let check = true;
  if (keys.w.pressed && lastKey === "w") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        verificaCollision(playerteste, {
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
      mudarFrameY();
    }
  } else if (keys.a.pressed && lastKey === "a") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        verificaCollision(playerteste, {
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
      mudarFrameX();
    }
  } else if (keys.s.pressed && lastKey === "s") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        verificaCollision(playerteste, {
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
      mudarFrameY();
    }
  } else if (keys.d.pressed && lastKey === "d") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        verificaCollision(playerteste, {
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
    document.querySelector(".combatModal").style.display != "block" &&
    document.querySelector(".telaConversa").style.display != "block"
  ) {
    switch (click.keyCode) {
      case 87:
        keys.w.pressed = true;
        player.src = "./img/playerUp.png";
        lastKey = "w";
        break;
      case 65:
        keys.a.pressed = true;
        player.src = "./img/playerLeft.png";
        lastKey = "a";
        break;
      case 83:
        keys.s.pressed = true;
        player.src = "./img/playerDown.png";
        lastKey = "s";
        break;
      case 68:
        keys.d.pressed = true;
        player.src = "./img/playerRight.png";
        lastKey = "d";
        break;
      case 77:
        document.querySelector(".mapa").style.display = "block";
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
      document.querySelector(".mapa").style.display = "none";
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
  document.querySelector(".load").style.display = "none";
});
