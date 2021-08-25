var canvas;
var backGround;
var mBalls, mBall1, mBall2
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
const Mouse = Matter.Mouse;

var engine;
var world;

var form, player, game;

var form, team, game;
var matterBall;

var border1, border2, border3, border4;

function preload(){}

function setup()
{
  canvas = createCanvas(600,600);
  engine = Engine.create();
  world = engine.world;  
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw()
{
  background("white");
  Engine.update(engine);
  drawSprites();
  
  if(playerCount === 2)
  {
    game.update(1);
  }

  if(gameState === 1)
  {
    clear();
    game.play();
  }

  if(gameState === 2)
  {
    game.end();
  }

  if(playerCount === 0)
  {
    game.update(0);
  }
}


