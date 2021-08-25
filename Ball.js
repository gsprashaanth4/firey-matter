class Ball
{
    constructor(x,y,radius)
    {
        var options = {isStatic:false , friction:0, restitution:0, density:0.0008};
        this.body = Bodies.circle(x,y,radius,options);
        this.radius = radius;
        World.add(world,this.body);
    }

    display()
    {
        push();
        ellipseMode(RADIUS);
        fill("red");
        ellipse(this.body.position.x, this.body.position.y, this.radius, this.radius);
        pop();
    }
}