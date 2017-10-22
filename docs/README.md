
# Entity System

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


## Index

### Classes

* [Entity](classes/entity.md)
* [EntityManager](classes/entitymanager.md)
* [EntitySystemInstance](classes/entitysysteminstance.md)
* [ObjectPool](classes/objectpool.md)


### Interfaces

* [IEntitySystem](interfaces/ientitysystem.md)
* [IEntitySystemDefinition](interfaces/ientitysystemdefinition.md)


### Variables

* [componentNameKey](#componentnamekey)
* [systemDefinitionKey](#systemdefinitionkey)


### Functions

* [Component](#component)
* [EntitySystem](#entitysystem)
* [getComponentName](#getcomponentname)
* [getEntitySystemDefinition](#getentitysystemdefinition)



---
# Variables
<a id="componentnamekey"></a>

###  componentNameKey

**●  componentNameKey**:  *`string`*  = "$component"

*Defined in [Component.ts:46](https://github.com/gamma-framework/entities/blob/46d6513/src/Component.ts#L46)*



Private key used to register and store the component name inside the component constructor.




___

<a id="systemdefinitionkey"></a>

###  systemDefinitionKey

**●  systemDefinitionKey**:  *`string`*  = "$system"

*Defined in [EntitySystem.ts:73](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystem.ts#L73)*





___


# Functions
<a id="component"></a>

###  Component

► **Component**(name?: *`string`*): `function`



*Defined in [Component.ts:13](https://github.com/gamma-framework/entities/blob/46d6513/src/Component.ts#L13)*



Decorates an object as a component class for the entity management system. If no name is provided, the decorator will use the class name. Take in mind that if you are planning to use some form of code obfuscation like uglify, you must provide a name, because the class name will be changed.
*__export__*: 



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  Component name. |





**Returns:** `function`
) => void}






___

<a id="entitysystem"></a>

###  EntitySystem

► **EntitySystem**(definition?: *[IEntitySystemDefinition](interfaces/ientitysystemdefinition.md)*): `function`



*Defined in [EntitySystem.ts:31](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystem.ts#L31)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| definition | [IEntitySystemDefinition](interfaces/ientitysystemdefinition.md)   |  - |





**Returns:** `function`





___

<a id="getcomponentname"></a>

###  getComponentName

► **getComponentName**T(component: *`object`⎮`Function`*): `string`



*Defined in [Component.ts:35](https://github.com/gamma-framework/entities/blob/46d6513/src/Component.ts#L35)*



Gets the name of a component decorated with the @Component(name) decorator.
*__export__*: 

*__template__*: T



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** `string`







___

<a id="getentitysystemdefinition"></a>

###  getEntitySystemDefinition

► **getEntitySystemDefinition**T(entitySystem: *`object`⎮`Function`*): [IEntitySystemDefinition](interfaces/ientitysystemdefinition.md)



*Defined in [EntitySystem.ts:65](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystem.ts#L65)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entitySystem | `object`⎮`Function`   |  - |





**Returns:** [IEntitySystemDefinition](interfaces/ientitysystemdefinition.md)





___


