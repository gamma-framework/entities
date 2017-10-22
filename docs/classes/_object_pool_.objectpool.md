[Gamma Framework - Entity System](../README.md) > ["object-pool"](../modules/_object_pool_.md) > [ObjectPool](../classes/_object_pool_.objectpool.md)



# Class: ObjectPool


Provides a way to reuse object instances wihtut the need of garbage collection, improving perfomance. The pool will automatically grow its own space if the requirements can not be successfully supplied for a specific scenario.

> TODO: Add another constructor with a lambda constructor instead of the object constructor. Investigate how a Injection Container could be integrated here.
*__export__*: 

*__class__*: ObjectPool

*__template__*: T


## Type parameters
#### T 
## Index

### Constructors

* [constructor](_object_pool_.objectpool.md#constructor)


### Methods

* [available](_object_pool_.objectpool.md#available)
* [dispose](_object_pool_.objectpool.md#dispose)
* [empty](_object_pool_.objectpool.md#empty)
* [get](_object_pool_.objectpool.md#get)
* [resizePool](_object_pool_.objectpool.md#resizepool)
* [totalSize](_object_pool_.objectpool.md#totalsize)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new ObjectPool**(objectConstructor: *`object`⎮`Function`*, resizeFactor?: *`number`*): [ObjectPool](_object_pool_.objectpool.md)


*Defined in object-pool.ts:35*



Creates an instance of ObjectPool.
*__memberof__*: ObjectPool



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| objectConstructor | `object`⎮`Function`  | - |   Object constructor that will be called when a new object is required. |
| resizeFactor | `number`  | 20 |   - |





**Returns:** [ObjectPool](_object_pool_.objectpool.md)

---



## Methods
<a id="available"></a>

###  available

► **available**(): `number`



*Defined in object-pool.ts:85*



Gets the currently available number of objects.
*__memberof__*: ObjectPool





**Returns:** `number`





___

<a id="dispose"></a>

###  dispose

► **dispose**(instance: *`T`*): `void`



*Defined in object-pool.ts:74*



Disposes an object that is not required any more. The object will be placed in the pool for future use.
*__memberof__*: ObjectPool



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| instance | `T`   |  - |





**Returns:** `void`





___

<a id="empty"></a>

###  empty

► **empty**(): `boolean`



*Defined in object-pool.ts:108*



Indicates if the pool is empty.
*__memberof__*: ObjectPool





**Returns:** `boolean`





___

<a id="get"></a>

###  get

► **get**(): `T`



*Defined in object-pool.ts:57*



Gets a new object instance from the pool. NOTE: the constructor will be called over the instance.
*__memberof__*: ObjectPool





**Returns:** `T`





___

<a id="resizepool"></a>

### «Private» resizePool

► **resizePool**(): `void`



*Defined in object-pool.ts:119*



Resizes the pool to a bigger size, and instantiate objects.
*__memberof__*: ObjectPool





**Returns:** `void`





___

<a id="totalsize"></a>

###  totalSize

► **totalSize**(): `number`



*Defined in object-pool.ts:97*



Gets the total size of elements allowed in the pool. This value will grow each time the pool is emptied.
*__memberof__*: ObjectPool





**Returns:** `number`





___


