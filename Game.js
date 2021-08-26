class Game 
{
  constructor(){}

  getState()
  {
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    });
  }

  update(state)
  {
    database.ref('/').update({
      gameState: state
    });
  }

  async start()
  {
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");

      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form();
      form.display();
    }
    mBall1 = new Ball(285,300,20);
    mBall2 = new Ball(315,300,20);
    mBalls = [mBall1.body, mBall2.body];

    downButton = createButton("down");
    upButton = createButton("up");
    leftButton = createButton("left");
    rightButton = createButton("right");

    upButton.hide();
    downButton.hide();
    leftButton.hide();
    rightButton.hide();

    upButton.position( displayWidth/2+135, displayHeight/2-190);
    downButton.position( displayWidth/2+127 , displayHeight/2-50);
    leftButton.position( displayWidth/2 +60 , displayHeight/2 -120);
    rightButton.position( displayWidth/2+200, displayHeight/2 -120);

    border1 = new Border(0,300,100,600);
    border2 = new Border(600,300,100,600);
    border3 = new Border(300,0,600,100);
    border4 = new Border(300,600,600,100);
  }

  play()
  {
    form.hide();
    textSize(30);
    text("Game Start", 120, 100);
    Player.getPlayerInfo();

    upButton.show();
    downButton.show();
    leftButton.show();
    rightButton.show();

    if(allPlayers !== undefined)
    {
      background("white");

      var index = 0;

      for(var plr in allPlayers)
      {
        index += 1;
        
        Matter.Body.applyForce(mBalls[index-1], mBalls[index-1].position, {x: allPlayers[plr].velocityX, y: allPlayers[plr].velocityY });
        Matter.Body.applyForce(mBalls[index-1], mBalls[index-1].position, {x: allPlayers[plr].velocityX, y: allPlayers[plr].velocityY });

        if(index === player.index)
        {
          push();
          fill("yellow");
          ellipseMode(RADIUS);
          ellipse(mBalls[index-1].position.x, mBalls[index-1].position.y, 25,25);
          pop();

          push();
          fill("black");
          textSize(20);
          text("x: " + Math.round(mBalls[index-1].velocity.x), 60,75);
          text("y: " + Math.round(mBalls[index-1].velocity.y), 60,100);
          pop();
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null)
    {
      player.velocityY -=0.004;
      player.update();
    }else
    {
      player.velocityY = 0;
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null)
    {
      player.velocityY +=0.004;
      player.update();
    }else
    {
      player.velocityY = 0;
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null)
    {
      player.velocityX -=0.004;
      player.update();
    }else
    {
      player.velocityX = 0;
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null)
    {
      player.velocityX +=0.004; 
      player.update();
    }else
    {
      player.velocityX = 0;
    }    


    upButton.mousePressed(()=>{
      if(player.index !== null)
      {
        player.velocityY -=0.004;
        player.update();
      }
    });

    downButton.mousePressed(()=>{
      if(player.index !== null)
      {
        player.velocityY +=0.004;
        player.update();
      }
    });

    leftButton.mousePressed(()=>{
      if(player.index !== null)
      {
        player.velocityX -=0.004;
        player.update();
      }
    });

    rightButton.mousePressed(()=>{
      if(player.index !== null)
      {
        player.velocityX +=0.004;
        player.update();
      }
    });
    
    drawSprites();
    mBall1.display();
    mBall2.display();

    border1.display();
    border2.display();
    border3.display();
    border4.display();
  }

}

