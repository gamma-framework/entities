# Gamma Framework - Entity System

This library provides an easy and lightweight entity system with object pooling
and an easy to use approach, similar to angular decoration procedure.

Examples
---

```typescript

@Component({ name: "position" })
export class Position
{
    x: number;
    y: number;
}

@Component({ name: "velocity" })
export class Velocity
{
    x: number;
    y: number;
}

@EntitySystem({
    name: "velocitySystem",
    dependencies: [Position, Velocity]
})
export class VelocitySystem implements IEntitySystem
{
    update(elapsed: TimeSpan, entity: Entity, position: Position, velocity: Velocity): void
    {
        // todo: calculate velocity and alter position.
    }
}

...

var manager = new EntityManager();

manager.registerSystem(VelocitySystem);

var entity = manager.createEntity()
                    .addComponent(Position);
                    .addComponent(Velocity);

// app loop
while(true){
    manager.updateSystems(elapsed);
}
```

Installing The Library
---
```
npm install --save @gamma-framework/entities
```


Building The Library
---

At least for now, the solution will utilize gulp to build and run tests,
but could change in the future to webpack or other packers.
To build the solution just type:
```
npm run build
```
or
```
gulp
```

Testing the Library
---
Testing the library is also pretty stright forward:
```
npm run test
```
or
```
gulp test
```

Building the Documentation
```
npm run typedoc
```