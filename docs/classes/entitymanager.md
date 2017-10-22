[esystem](../README.md) > [EntityManager](../classes/entitymanager.md)



# Class: EntityManager

## Index

### Constructors

* [constructor](entitymanager.md#constructor)


### Properties

* [componentPools](entitymanager.md#componentpools)
* [disposedEntities](entitymanager.md#disposedentities)
* [entitySystems](entitymanager.md#entitysystems)
* [instancedEntities](entitymanager.md#instancedentities)
* [disposedComponentKey](entitymanager.md#disposedcomponentkey)


### Methods

* [createEntity](entitymanager.md#createentity)
* [disposeComponent](entitymanager.md#disposecomponent)
* [disposeEntity](entitymanager.md#disposeentity)
* [findEntitiesByComponent](entitymanager.md#findentitiesbycomponent)
* [findEntitiesByComponents](entitymanager.md#findentitiesbycomponents)
* [findEntitiesByName](entitymanager.md#findentitiesbyname)
* [findEntitiesByTag](entitymanager.md#findentitiesbytag)
* [findEntitiesByTags](entitymanager.md#findentitiesbytags)
* [getComponentPool](entitymanager.md#getcomponentpool)
* [getEntityById](entitymanager.md#getentitybyid)
* [getEntitySystemInstance](entitymanager.md#getentitysysteminstance)
* [getEntitySystemNames](entitymanager.md#getentitysystemnames)
* [getNewComponent](entitymanager.md#getnewcomponent)
* [isSystemRegistered](entitymanager.md#issystemregistered)
* [registerSystem](entitymanager.md#registersystem)
* [removeEntityFromAllSystems](entitymanager.md#removeentityfromallsystems)
* [unregisterSystem](entitymanager.md#unregistersystem)
* [updateEntity](entitymanager.md#updateentity)
* [updateSystems](entitymanager.md#updatesystems)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new EntityManager**(entityPoolAmount?: *`number`*): [EntityManager](entitymanager.md)


*Defined in [EntityManager.ts:18](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L18)*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| entityPoolAmount | `number`  | 20 |   - |





**Returns:** [EntityManager](entitymanager.md)

---


## Properties
<a id="componentpools"></a>

### «Private» componentPools

**●  componentPools**:  *`Dictionary`.<`string`>,.<[ObjectPool](objectpool.md)`any`>* 

*Defined in [EntityManager.ts:18](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L18)*





___

<a id="disposedentities"></a>

### «Private» disposedEntities

**●  disposedEntities**:  *[ObjectPool](objectpool.md)[Entity](entity.md)* 

*Defined in [EntityManager.ts:16](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L16)*





___

<a id="entitysystems"></a>

### «Private» entitySystems

**●  entitySystems**:  *`Dictionary`.<`string`>,.<[EntitySystemInstance](entitysysteminstance.md)>* 

*Defined in [EntityManager.ts:12](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L12)*





___

<a id="instancedentities"></a>

### «Private» instancedEntities

**●  instancedEntities**:  *`ArrayList`.<[Entity](entity.md)>* 

*Defined in [EntityManager.ts:14](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L14)*





___

<a id="disposedcomponentkey"></a>

### «Static» disposedComponentKey

**●  disposedComponentKey**:  *`string`*  = "__disposed"

*Defined in [EntityManager.ts:10](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L10)*





___


## Methods
<a id="createentity"></a>

###  createEntity

► **createEntity**(): [Entity](entity.md)



*Defined in [EntityManager.ts:105](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L105)*





**Returns:** [Entity](entity.md)





___

<a id="disposecomponent"></a>

###  disposeComponent

► **disposeComponent**T(componentInstance: *`T`*): `void`



*Defined in [EntityManager.ts:190](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L190)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| componentInstance | `T`   |  - |





**Returns:** `void`





___

<a id="disposeentity"></a>

###  disposeEntity

► **disposeEntity**(entity: *[Entity](entity.md)*): `void`



*Defined in [EntityManager.ts:115](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L115)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](entity.md)   |  - |





**Returns:** `void`





___

<a id="findentitiesbycomponent"></a>

###  findEntitiesByComponent

► **findEntitiesByComponent**T(component: *`object`⎮`Function`*): `ArrayList`.<[Entity](entity.md)>



*Defined in [EntityManager.ts:219](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L219)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** `ArrayList`.<[Entity](entity.md)>





___

<a id="findentitiesbycomponents"></a>

###  findEntitiesByComponents

► **findEntitiesByComponents**T(components: *(`Function`⎮`object`)[]*): `ArrayList`.<[Entity](entity.md)>



*Defined in [EntityManager.ts:230](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L230)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| components | (`Function`⎮`object`)[]   |  - |





**Returns:** `ArrayList`.<[Entity](entity.md)>





___

<a id="findentitiesbyname"></a>

###  findEntitiesByName

► **findEntitiesByName**(name: *`string`*): `ArrayList`.<[Entity](entity.md)>



*Defined in [EntityManager.ts:211](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L211)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  - |





**Returns:** `ArrayList`.<[Entity](entity.md)>





___

<a id="findentitiesbytag"></a>

###  findEntitiesByTag

► **findEntitiesByTag**(tag: *`string`*): `ArrayList`.<[Entity](entity.md)>



*Defined in [EntityManager.ts:247](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L247)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tag | `string`   |  - |





**Returns:** `ArrayList`.<[Entity](entity.md)>





___

<a id="findentitiesbytags"></a>

###  findEntitiesByTags

► **findEntitiesByTags**T(tags: *`string`[]*): `ArrayList`.<[Entity](entity.md)>



*Defined in [EntityManager.ts:255](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L255)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tags | `string`[]   |  - |





**Returns:** `ArrayList`.<[Entity](entity.md)>





___

<a id="getcomponentpool"></a>

### «Private» getComponentPool

► **getComponentPool**T(component: *`object`⎮`Function`*): [ObjectPool](objectpool.md)`T`



*Defined in [EntityManager.ts:266](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L266)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** [ObjectPool](objectpool.md)`T`





___

<a id="getentitybyid"></a>

###  getEntityById

► **getEntityById**(id: *`number`*): [Entity](entity.md)



*Defined in [EntityManager.ts:206](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L206)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `number`   |  - |





**Returns:** [Entity](entity.md)





___

<a id="getentitysysteminstance"></a>

###  getEntitySystemInstance

► **getEntitySystemInstance**T(entitySystem: *`object`⎮`Function`*): [EntitySystemInstance](entitysysteminstance.md)



*Defined in [EntityManager.ts:66](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L66)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entitySystem | `object`⎮`Function`   |  - |





**Returns:** [EntitySystemInstance](entitysysteminstance.md)





___

<a id="getentitysystemnames"></a>

###  getEntitySystemNames

► **getEntitySystemNames**(): `string`[]



*Defined in [EntityManager.ts:95](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L95)*





**Returns:** `string`[]





___

<a id="getnewcomponent"></a>

###  getNewComponent

► **getNewComponent**T(component: *`object`⎮`Function`*): `T`



*Defined in [EntityManager.ts:180](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L180)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** `T`





___

<a id="issystemregistered"></a>

###  isSystemRegistered

► **isSystemRegistered**T(entitySystem: *`object`⎮`Function`*): `boolean`



*Defined in [EntityManager.ts:82](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L82)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entitySystem | `object`⎮`Function`   |  - |





**Returns:** `boolean`





___

<a id="registersystem"></a>

###  registerSystem

► **registerSystem**T(entitySystem: *`object`⎮`Function`*): [EntityManager](entitymanager.md)



*Defined in [EntityManager.ts:28](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L28)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entitySystem | `object`⎮`Function`   |  - |





**Returns:** [EntityManager](entitymanager.md)





___

<a id="removeentityfromallsystems"></a>

### «Private» removeEntityFromAllSystems

► **removeEntityFromAllSystems**(entity: *[Entity](entity.md)*): `void`



*Defined in [EntityManager.ts:287](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L287)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](entity.md)   |  - |





**Returns:** `void`





___

<a id="unregistersystem"></a>

###  unregisterSystem

► **unregisterSystem**T(entitySystem: *`object`⎮`Function`*): [EntityManager](entitymanager.md)



*Defined in [EntityManager.ts:47](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L47)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entitySystem | `object`⎮`Function`   |  - |





**Returns:** [EntityManager](entitymanager.md)





___

<a id="updateentity"></a>

###  updateEntity

► **updateEntity**(entity: *[Entity](entity.md)*): `void`



*Defined in [EntityManager.ts:130](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L130)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](entity.md)   |  - |





**Returns:** `void`





___

<a id="updatesystems"></a>

###  updateSystems

► **updateSystems**(elapsed: *`TimeSpan`*): `void`



*Defined in [EntityManager.ts:100](https://github.com/gamma-framework/entities/blob/46d6513/src/EntityManager.ts#L100)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| elapsed | `TimeSpan`   |  - |





**Returns:** `void`





___


