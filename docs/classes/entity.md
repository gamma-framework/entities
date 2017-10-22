[esystem](../README.md) > [Entity](../classes/entity.md)



# Class: Entity


Provides a way to model entities with different subcomponents, allowing modeling by composition instead of inheritance, following the pattern composition over inheritance. WARNING: Do not create instances yourself, first create a @see {EntityManager} and then use the @see {EntityManager.createEntity} method.
*__export__*: 

*__class__*: Entity


## Index

### Constructors

* [constructor](entity.md#constructor)


### Properties

* [components](entity.md#components)
* [disposed](entity.md#disposed)
* [entityId](entity.md#entityid)
* [manager](entity.md#manager)
* [name](entity.md#name)
* [tags](entity.md#tags)
* [identity](entity.md#identity)


### Accessors

* [id](entity.md#id)
* [isDisposed](entity.md#isdisposed)


### Methods

* [addComponent](entity.md#addcomponent)
* [addTag](entity.md#addtag)
* [clearComponents](entity.md#clearcomponents)
* [clearTags](entity.md#cleartags)
* [dispose](entity.md#dispose)
* [finishDispose](entity.md#finishdispose)
* [getComponentInstance](entity.md#getcomponentinstance)
* [getComponentName](entity.md#getcomponentname)
* [getComponentNames](entity.md#getcomponentnames)
* [getTags](entity.md#gettags)
* [hasComponent](entity.md#hascomponent)
* [hasComponents](entity.md#hascomponents)
* [hasTag](entity.md#hastag)
* [hasTags](entity.md#hastags)
* [initialize](entity.md#initialize)
* [removeComponent](entity.md#removecomponent)
* [removeTag](entity.md#removetag)
* [getNewEntityId](entity.md#getnewentityid)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Entity**(): [Entity](entity.md)


*Defined in [Entity.ts:98](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L98)*



Creates an instance of Entity.
*__memberof__*: Entity





**Returns:** [Entity](entity.md)

---


## Properties
<a id="components"></a>

### «Protected» components

**●  components**:  *`Dictionary`.<`string`>,.<`any`>* 

*Defined in [Entity.ts:42](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L42)*



Gets or sets the component dictionary. This dictionary contains all the registered components where: key: name of the component. value: instance of the component class.
*__type__*: {Dictionary<string, any="">}</string,>

*__memberof__*: Entity





___

<a id="disposed"></a>

### «Protected» disposed

**●  disposed**:  *`boolean`* 

*Defined in [Entity.ts:70](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L70)*



Gets or sets a value indicating if this entity has been disposed.
*__type__*: {boolean}

*__memberof__*: Entity





___

<a id="entityid"></a>

### «Protected» entityId

**●  entityId**:  *`number`* 

*Defined in [Entity.ts:30](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L30)*



Gets or sets the entity unique id.
*__type__*: {number}

*__memberof__*: Entity





___

<a id="manager"></a>

### «Protected» manager

**●  manager**:  *[EntityManager](entitymanager.md)* 

*Defined in [Entity.ts:61](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L61)*



Gets or sets a reference to the entity manager that created this entity.
*__type__*: {EntityManager}

*__memberof__*: Entity





___

<a id="name"></a>

###  name

**●  name**:  *`string`* 

*Defined in [Entity.ts:80](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L80)*



Gets or sets the entity name. This value is open to be edited by the user. Can be useful to easily find certain entities.
*__type__*: {string}

*__memberof__*: Entity





___

<a id="tags"></a>

### «Protected» tags

**●  tags**:  *`ArrayList`.<`string`>* 

*Defined in [Entity.ts:51](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L51)*



Gets or sets an array of tags applied to this instance.
*__type__*: {ArrayList<string>}</string>

*__memberof__*: Entity





___

<a id="identity"></a>

### «Static»«Private» identity

**●  identity**:  *`number`*  = 0

*Defined in [Entity.ts:21](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L21)*



Keeps tracks of the all the entities already created to give an unique id for new entities.




___


## Accessors
<a id="id"></a>

###  id


getid(): `number`

*Defined in [Entity.ts:89](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L89)*



Gets the unique id of this entity.
*__readonly__*: 

*__type__*: {number}

*__memberof__*: Entity





**Returns:** `number`



___

<a id="isdisposed"></a>

###  isDisposed


getisDisposed(): `boolean`

*Defined in [Entity.ts:98](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L98)*



Gets a value indicating if this entity has been disposed.
*__readonly__*: 

*__type__*: {boolean}

*__memberof__*: Entity





**Returns:** `boolean`



___


## Methods
<a id="addcomponent"></a>

###  addComponent

► **addComponent**T(component: *`object`⎮`Function`*): [Entity](entity.md)



*Defined in [Entity.ts:186](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L186)*



Adds a new component to the entity. The component must be decorated with the @see {Component} decorator.
*__template__*: T

*__memberof__*: Entity



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** [Entity](entity.md)





___

<a id="addtag"></a>

###  addTag

► **addTag**(tag: *`string`*): [Entity](entity.md)



*Defined in [Entity.ts:327](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L327)*



Adds a new tag to the entity. Tags can help the user to group certain type of entities, and search them easily.
*__memberof__*: Entity



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tag | `string`   |  - |





**Returns:** [Entity](entity.md)





___

<a id="clearcomponents"></a>

###  clearComponents

► **clearComponents**(): [Entity](entity.md)



*Defined in [Entity.ts:231](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L231)*



Removes all the components from the entity.
*__memberof__*: Entity





**Returns:** [Entity](entity.md)





___

<a id="cleartags"></a>

###  clearTags

► **clearTags**(): [Entity](entity.md)



*Defined in [Entity.ts:350](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L350)*





**Returns:** [Entity](entity.md)





___

<a id="dispose"></a>

###  dispose

► **dispose**(): `void`



*Defined in [Entity.ts:150](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L150)*



Disposes the entity and leve the entity ready for recycle.
*__memberof__*: Entity





**Returns:** `void`





___

<a id="finishdispose"></a>

###  finishDispose

► **finishDispose**(): `void`



*Defined in [Entity.ts:162](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L162)*



Finishes the entity diposal process. WARNING: this method is not intended to be called by the user, is intended to be called by the manager.
*__memberof__*: Entity





**Returns:** `void`





___

<a id="getcomponentinstance"></a>

###  getComponentInstance

► **getComponentInstance**T(component: *`object`⎮`Function`*): `boolean`



*Defined in [Entity.ts:297](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L297)*



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



*Defined in [Entity.ts:386](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L386)*



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



*Defined in [Entity.ts:313](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L313)*



Gets an array with all the entity components.
*__memberof__*: Entity





**Returns:** `string`[]





___

<a id="gettags"></a>

###  getTags

► **getTags**(): `string`[]



*Defined in [Entity.ts:381](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L381)*





**Returns:** `string`[]





___

<a id="hascomponent"></a>

###  hasComponent

► **hasComponent**T(component: *`object`⎮`Function`*): `boolean`



*Defined in [Entity.ts:255](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L255)*



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



*Defined in [Entity.ts:272](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L272)*



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



*Defined in [Entity.ts:356](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L356)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tag | `string`   |  - |





**Returns:** `boolean`





___

<a id="hastags"></a>

###  hasTags

► **hasTags**T(tags: *`string`[]*): `boolean`



*Defined in [Entity.ts:364](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L364)*



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

► **initialize**(manager: *[EntityManager](entitymanager.md)*): [Entity](entity.md)



*Defined in [Entity.ts:134](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L134)*



Initializes an entity and sets the parent manager.
*__memberof__*: Entity



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| manager | [EntityManager](entitymanager.md)   |  - |





**Returns:** [Entity](entity.md)





___

<a id="removecomponent"></a>

###  removeComponent

► **removeComponent**T(component: *`object`⎮`Function`*): [Entity](entity.md)



*Defined in [Entity.ts:211](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L211)*



Removes a component from the entity.
*__template__*: T

*__memberof__*: Entity



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** [Entity](entity.md)





___

<a id="removetag"></a>

###  removeTag

► **removeTag**(tag: *`string`*): [Entity](entity.md)



*Defined in [Entity.ts:337](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L337)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tag | `string`   |  - |





**Returns:** [Entity](entity.md)





___

<a id="getnewentityid"></a>

### «Static»«Private» getNewEntityId

► **getNewEntityId**(): `number`



*Defined in [Entity.ts:399](https://github.com/gamma-framework/entities/blob/46d6513/src/Entity.ts#L399)*





**Returns:** `number`





___


