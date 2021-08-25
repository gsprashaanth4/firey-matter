class Form 
{
  constructor() 
  {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.resetButton = createButton('reset data');
    this.greeting = createElement('h3');
    this.title = createElement('h3');
  }

  hide()
  {
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display()
  {
    this.title.html("FireBase incorporated in Matter.js");
    this.title.position(displayWidth/2.3-385, (displayHeight/2.5)-80);

    this.input.position((displayWidth/2)-420, (displayHeight/2)-110);
    this.button.position((displayWidth/2)-360, (displayHeight/2)-70);
    this.resetButton.position(displayWidth/2-125 , displayHeight/2+167);

    this.button.mousePressed(()=>
    {
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name + ", please wait until other players join the game")
      this.greeting.position((displayWidth/2)-560, (displayHeight/2)-100);
    });
    
    this.resetButton.mousePressed(()=>{
      player.updateCount(0);
    });
    
  }
}
