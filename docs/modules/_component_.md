[Gamma Framework - Entity System](../README.md) > ["component"](../modules/_component_.md)



# External module: "component"

## Index

### Variables

* [componentNameKey](_component_.md#componentnamekey)


### Functions

* [Component](_component_.md#component)
* [getComponentName](_component_.md#getcomponentname)



---
## Variables
<a id="componentnamekey"></a>

###  componentNameKey

**●  componentNameKey**:  *`string`*  = "$component"

*Defined in component.ts:46*



Private key used to register and store the component name inside the component constructor.




___


## Functions
<a id="component"></a>

###  Component

► **Component**(name?: *`string`*): `function`



*Defined in component.ts:13*



Decorates an object as a component class for the entity management system. If no name is provided, the decorator will use the class name. Take in mind that if you are planning to use some form of code obfuscation like uglify, you must provide a name, because the class name will be changed.
*__export__*: 



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  Component name. |





**Returns:** `function`
) => void}






___

<a id="getcomponentname"></a>

###  getComponentName

► **getComponentName**T(component: *`object`⎮`Function`*): `string`



*Defined in component.ts:35*



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


