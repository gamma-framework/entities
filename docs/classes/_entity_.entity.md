[Gamma Framework - Entity System](../README.md) > ["entity"](../modules/_entity_.md) > [Entity](../classes/_entity_.entity.md)



# Class: Entity


Provides a way to model entities with different subcomponents, allowing modeling by composition instead of inheritance, following the pattern composition over inheritance. WARNING: Do not create instances yourself, first create a @see {EntityManager} and then use the @see {EntityManager.createEntity} method.
*__export__*: 

*__class__*: Entity


## Index

### Constructors

* [constructor](_entity_.entity.md#constructor)


### Properties

* [components](_entity_.entity.md#components)
* [disposed](_entity_.entity.md#disposed)
* [entityId](_entity_.entity.md#entityid)
* [manager](_entity_.entity.md#manager)
* [name](_entity_.entity.md#name)
* [tags](_entity_.entity.md#tags)
* [identity](_entity_.entity.md#identity)


### Accessors

* [id](_entity_.entity.md#id)
* [isDisposed](_entity_.entity.md#isdisposed)


### Methods

* [addComponent](_entity_.entity.md#addcomponent)
* [addTag](_entity_.entity.md#addtag)
* [clearComponents](_entity_.entity.md#clearcomponents)
* [clearTags](_entity_.entity.md#cleartags)
* [dispose](_entity_.entity.md#dispose)
* [finishDispose](_entity_.entity.md#finishdispose)
* [getComponentInstance](_entity_.entity.md#getcomponentinstance)
* [getComponentName](_entity_.entity.md#getcomponentname)
* [getComponentNames](_entity_.entity.md#getcomponentnames)
* [getTags](_entity_.entity.md#gettags)
* [hasComponent](_entity_.entity.md#hascomponent)
* [hasComponents](_entity_.entity.md#hascomponents)
* [hasTag](_entity_.entity.md#hastag)
* [hasTags](_entity_.entity.md#hastags)
* [initialize](_entity_.entity.md#initialize)
* [removeComponent](_entity_.entity.md#removecomponent)
* [removeTag](_entity_.entity.md#removetag)
* [getNewEntityId](_entity_.entity.md#getnewentityid)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Entity**(): [Entity](_entity_.entity.md)


*Defined in entity.ts:98*



Creates an instance of Entity.
*__memberof__*: Entity





**Returns:** [Entity](_entity_.entity.md)

---


## Properties
<a id="components"></a>

### «Protected» components

**●  components**:  *`Dictionary`.<`string`>,.<`any`>* 

*Defined in entity.ts:42*



Gets or sets the component dictionary. This dictionary contains all the registered components where: key: name of the component. value: instance of the component class.
*__type__*: {Dictionary<string, any="">}</string,>

*__memberof__*: Entity





___

<a id="disposed"></a>

### «Protected» disposed

**●  disposed**:  *`boolean`* 

*Defined in entity.ts:70*



Gets or sets a value indicating if this entity has been disposed.
*__type__*: {boolean}

*__memberof__*: Entity





___

<a id="entityid"></a>

### «Protected» entityId

**●  entityId**:  *`number`* 

*Defined in entity.ts:30*



Gets or sets the entity unique id.
*__type__*: {number}

*__memberof__*: Entity





___

<a id="manager"></a>

### «Protected» manager

**●  manager**:  *[EntityManager](_entity_manager_.entitymanager.md)* 

*Defined in entity.ts:61*



Gets or sets a reference to the entity manager that created this entity.
*__type__*: {EntityManager}

*__memberof__*: Entity





___

<a id="name"></a>

###  name

**●  name**:  *`string`* 

*Defined in entity.ts:80*



Gets or sets the entity name. This value is open to be edited by the user. Can be useful to easily find certain entities.
*__type__*: {string}

*__memberof__*: Entity





___

<a id="tags"></a>

### «Protected» tags

**●  tags**:  *`ArrayList`.<`string`>* 

*Defined in entity.ts:51*



Gets or sets an array of tags applied to this instance.
*__type__*: {ArrayList<string>}</string>

*__memberof__*: Entity





___

<a id="identity"></a>

### «Static»«Private» identity

**●  identity**:  *`number`*  = 0

*Defined in entity.ts:21*



Keeps tracks of the all the entities already created to give an unique id for new entities.




___


## Accessors
<a id="id"></a>

###  id


getid(): `number`

*Defined in entity.ts:89*



Gets the unique id of this entity.
*__readonly__*: 

*__type__*: {number}

*__memberof__*: Entity





**Returns:** `number`



___

<a id="isdisposed"></a>

###  isDisposed


getisDisposed(): `boolean`

*Defined in entity.ts:98*



Gets a value indicating if this entity has been disposed.
*__readonly__*: 

*__type__*: {boolean}

*__memberof__*: Entity





**Returns:** `boolean`



___


## Methods
<a id="addcomponent"></a>

###  addComponent

► **addComponent**T(component: *`object`⎮`Function`*): [Entity](_entity_.entity.md)



*Defined in entity.ts:186*



Adds a new component to the entity. The component must be decorated with the @see {Component} decorator.
*__template__*: T

*__memberof__*: Entity



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** [Entity](_entity_.entity.md)





___

<a id="addtag"></a>

###  addTag

► **addTag**(tag: *`string`*): [Entity](_entity_.entity.md)



*Defined in entity.ts:327*



Adds a new tag to the entity. Tags can help the user to group certain type of entities, and search them easily.
*__memberof__*: Entity



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tag | `string`   |  - |





**Returns:** [Entity](_entity_.entity.md)





___

<a id="clearcomponents"></a>

###  clearComponents

► **clearComponents**(): [Entity](_entity_.entity.md)



*Defined in entity.ts:231*



Removes all the components from the entity.
*__memberof__*: Entity





**Returns:** [Entity](_entity_.entity.md)





___

<a id="cleartags"></a>

###  clearTags

► **clearTags**(): [Entity](_entity_.entity.md)



*Defined in entity.ts:350*





**Returns:** [Entity](_entity_.entity.md)





___

<a id="dispose"></a>

###  dispose

► **dispose**(): `void`



*Defined in entity.ts:150*



Disposes the entity and leve the entity ready for recycle.
*__memberof__*: Entity





**Returns:** `void`





___

<a id="finishdispose"></a>

###  finishDispose

► **finishDispose**(): `void`



*Defined in entity.ts:162*



Finishes the entity diposal process. WARNING: this method is not intended to be called by the user, is intended to be called by the manager.
*__memberof__*: Entity





**Returns:** `void`





___

<a id="getcomponentinstance"></a>

###  getComponentInstance

► **getComponentInstance**T(component: *`object`⎮`Function`*): `boolean`



*Defined in entity.ts:297*



Gets the instance of a given component.
*__template__*: T

*__memberof__*: Entity



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** `boolean`





___

<a id="getcomponentname"></a>

### «Private» getComponentName

► **getComponentName**T(component: *`object`⎮`Function`*): `string`



*Defined in entity.ts:386*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** `string`





___

<a id="getcomponentnames"></a>

###  getComponentNames

► **getComponentNames**(): `string`[]



*Defined in entity.ts:313*



Gets an array with all the entity components.
*__memberof__*: Entity





**Returns:** `string`[]





___

<a id="gettags"></a>

###  getTags

► **getTags**(): `string`[]



*Defined in entity.ts:381*





**Returns:** `string`[]





___

<a id="hascomponent"></a>

###  hasComponent

► **hasComponent**T(component: *`object`⎮`Function`*): `boolean`



*Defined in entity.ts:255*



Indicates if the entity has a given component.
*__template__*: T

*__memberof__*: Entity



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** `boolean`





___

<a id="hascomponents"></a>

###  hasComponents

► **hasComponents**T(components: *(`Function`⎮`object`)[]*): `boolean`



*Defined in entity.ts:272*



Indicates if the entity has all the given components.
*__template__*: T

*__memberof__*: Entity



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| components | (`Function`⎮`object`)[]   |  - |





**Returns:** `boolean`





___

<a id="hastag"></a>

###  hasTag

► **hasTag**(tag: *`string`*): `boolean`



*Defined in entity.ts:356*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tag | `string`   |  - |





**Returns:** `boolean`





___

<a id="hastags"></a>

###  hasTags

► **hasTags**T(tags: *`string`[]*): `boolean`



*Defined in entity.ts:364*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tags | `string`[]   |  - |





**Returns:** `boolean`





___

<a id="initialize"></a>

###  initialize

► **initialize**(manager: *[EntityManager](_entity_manager_.entitymanager.md)*): [Entity](_entity_.entity.md)



*Defined in entity.ts:134*



Initializes an entity and sets the parent manager.
*__memberof__*: Entity



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| manager | [EntityManager](_entity_manager_.entitymanager.md)   |  - |





**Returns:** [Entity](_entity_.entity.md)





___

<a id="removecomponent"></a>

###  removeComponent

► **removeComponent**T(component: *`object`⎮`Function`*): [Entity](_entity_.entity.md)



*Defined in entity.ts:211*



Removes a component from the entity.
*__template__*: T

*__memberof__*: Entity



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** [Entity](_entity_.entity.md)





___

<a id="removetag"></a>

###  removeTag

► **removeTag**(tag: *`string`*): [Entity](_entity_.entity.md)



*Defined in entity.ts:337*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tag | `string`   |  - |





**Returns:** [Entity](_entity_.entity.md)





___

<a id="getnewentityid"></a>

### «Static»«Private» getNewEntityId

► **getNewEntityId**(): `number`



*Defined in entity.ts:399*





**Returns:** `number`





___


