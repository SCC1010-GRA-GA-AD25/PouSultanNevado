let imagenFondo1
let imagenFondo2
let imagenInicial
let personaje
let pared
let x = 0
let posY = 100
let posX = 100
let dY = 3
let estado = 0 // 0: inicio, 1: juego, 2: game over
let wallX = []
let wallY = []
let puntaje = 0
let puntajeMax = 0
let recordAnterior = 0
let musicaRecord
let musicaFondo

function preload() {
  // put preload code here
  imagenFondo1 = loadImage("./images/fondo1-navidad.png")
  imagenFondo2 = loadImage("./images/fondo2-navidad.png")
  imagenInicial = loadImage("./images/fondo-inicio.png")
  personaje = loadImage("./images/pou-normal.png")
  pared = loadImage("./images/pared.png")
  
  musicaRecord = loadSound("./sounds/AllahuAkbar.mp3")
  musicaFondo = loadSound("./sounds/music-navidad.mp3")
}

function setup() {
  // put setup code here
  createCanvas(1000,512)
  noCursor()
}

function draw() {
  // put drawing code here
  if (estado === 1) {
    background(255)
    imageMode(CORNER)
    image(imagenFondo1,x,0)
    image(imagenFondo2,x+imagenFondo1.width,0)
    x = x - 5
    if (x <= -imagenFondo1.width){
      x = 0
    }
    
    dY = dY + 1
    posY = posY + dY
    for (let i = 0; i < wallX.length; i++) {
      imageMode(CENTER)
      image(pared,wallX[i],wallY[i]-300)
      image(pared,wallX[i],wallY[i]+300)

      if (wallX[i] < 0) {
        wallX[i] = width
        wallY[i] = random(200,300)
      }

      rect(400, 5, 180, 35, 20);
      if (wallX[i] === posX) {
        puntaje = puntaje + 1
        puntajeMax = max(puntaje,puntajeMax)
      }
      
      wallX[i] = wallX[i] - 5
      
      if (posY <= -60  || posY >= height 
        || (abs(wallX[i]-posX)<60 && abs(wallY[i]-posY)>100)) {
        musicaFondo.stop()
        estado = 0
      } 
  }

    image(personaje,posX,posY,60,60)
    text("Puntaje: " + puntaje, width/2 - 60,30)
  } else if (estado === 0) {
    cursor()
    background(0)
    imageMode(CORNER)
    image(imagenInicial,0,0,1000,520)  
    
    fill(255, 215, 0);
    stroke(150, 56, 42);
    strokeWeight(3);   
    rect(700, 30, 230, 50, 20);
    textSize(24)
    fill(255)
    text("Puntaje Máximo: "+ puntajeMax, 710,65)
    
    if (puntajeMax > recordAnterior) {
      if (!musicaRecord.isPlaying()) {
        musicaRecord.play()
      }
    }
  }

}


function mousePressed() {
  if (estado === 0) {
    estado = 1
    posY = 100
    x = 0
    dY = 3
    wallX = [500, 800, 1100]
    wallY[0] = random(200,300)
    wallY[1] = random(200,300)
    wallY[2] = random(200,300)
    puntaje = 0
    recordAnterior = puntajeMax
    noCursor()
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    musicaFondo.loop()
  }
  dY = -10
}