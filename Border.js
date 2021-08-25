class Border
{
    constructor(x,y,width,height)
    {
        var options = {isStatic: true , friction: 0, restitution: 0, density: 0.0008};
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        World.add(world,this.body);
    }

    display()
    {
        push();
        rectMode(CENTER);
        fill("black");
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
        pop();
    }
}