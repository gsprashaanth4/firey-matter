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

      form = new Form()
      form.display();
    }
    mBall1 = new Ball(285,300,20);
    mBall2 = new Ball(315,300,20);
    mBalls = [mBall1.body, mBall2.body];

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
    player.getCarsAtEnd();

    if(allPlayers !== undefined)
    {
      background("white");

      var index = 0;

      //the starting point if the series of the cars......from the line of line of player cars.its the starting point of the series of player cars
      var x = 200;
      var y = 200;

      var vx = 0;
      var vy = 0;

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
      player.velocityY -=0.001;
      player.update();
    }else
    {
      player.velocityY = 0;
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null)
    {
      player.velocityY +=0.001;
      player.update();
    }else
    {
      player.velocityY = 0;
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null)
    {
      player.velocityX -=0.001;
      player.update();
    }else
    {
      player.velocityX = 0;
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null)
    {
      player.velocityX +=0.001; 
      player.update();
    }else
    {
      player.velocityX = 0;
    }    
 
    if(player.distanceY > 3260)
    {
      gameState = 2;
      player.rank += 1; 
      Player.updateCarsAtEnd(player.rank);
    }
    
    drawSprites();
    mBall1.display();
    mBall2.display();

    border1.display();
    border2.display();
    border3.display();
    border4.display();


  }

  end()
  {
    console.log("game over");
    text("you've won", 20,20);
    console.log(player.rank);
    window.alert("you're rank: " + player.rank);
  }

}

