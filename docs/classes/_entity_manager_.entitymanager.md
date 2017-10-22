[Gamma Framework - Entity System](../README.md) > ["entity-manager"](../modules/_entity_manager_.md) > [EntityManager](../classes/_entity_manager_.entitymanager.md)



# Class: EntityManager

## Index

### Constructors

* [constructor](_entity_manager_.entitymanager.md#constructor)


### Properties

* [componentPools](_entity_manager_.entitymanager.md#componentpools)
* [disposedEntities](_entity_manager_.entitymanager.md#disposedentities)
* [entitySystems](_entity_manager_.entitymanager.md#entitysystems)
* [instancedEntities](_entity_manager_.entitymanager.md#instancedentities)
* [disposedComponentKey](_entity_manager_.entitymanager.md#disposedcomponentkey)


### Methods

* [createEntity](_entity_manager_.entitymanager.md#createentity)
* [disposeComponent](_entity_manager_.entitymanager.md#disposecomponent)
* [disposeEntity](_entity_manager_.entitymanager.md#disposeentity)
* [findEntitiesByComponent](_entity_manager_.entitymanager.md#findentitiesbycomponent)
* [findEntitiesByComponents](_entity_manager_.entitymanager.md#findentitiesbycomponents)
* [findEntitiesByName](_entity_manager_.entitymanager.md#findentitiesbyname)
* [findEntitiesByTag](_entity_manager_.entitymanager.md#findentitiesbytag)
* [findEntitiesByTags](_entity_manager_.entitymanager.md#findentitiesbytags)
* [getComponentPool](_entity_manager_.entitymanager.md#getcomponentpool)
* [getEntityById](_entity_manager_.entitymanager.md#getentitybyid)
* [getEntitySystemInstance](_entity_manager_.entitymanager.md#getentitysysteminstance)
* [getEntitySystemNames](_entity_manager_.entitymanager.md#getentitysystemnames)
* [getNewComponent](_entity_manager_.entitymanager.md#getnewcomponent)
* [isSystemRegistered](_entity_manager_.entitymanager.md#issystemregistered)
* [registerSystem](_entity_manager_.entitymanager.md#registersystem)
* [removeEntityFromAllSystems](_entity_manager_.entitymanager.md#removeentityfromallsystems)
* [unregisterSystem](_entity_manager_.entitymanager.md#unregistersystem)
* [updateEntity](_entity_manager_.entitymanager.md#updateentity)
* [updateSystems](_entity_manager_.entitymanager.md#updatesystems)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new EntityManager**(entityPoolAmount?: *`number`*): [EntityManager](_entity_manager_.entitymanager.md)


*Defined in entity-manager.ts:18*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| entityPoolAmount | `number`  | 20 |   - |





**Returns:** [EntityManager](_entity_manager_.entitymanager.md)

---


## Properties
<a id="componentpools"></a>

### «Private» componentPools

**●  componentPools**:  *`Dictionary`.<`string`>,.<[ObjectPool](_object_pool_.objectpool.md)`any`>* 

*Defined in entity-manager.ts:18*





___

<a id="disposedentities"></a>

### «Private» disposedEntities

**●  disposedEntities**:  *[ObjectPool](_object_pool_.objectpool.md)[Entity](_entity_.entity.md)* 

*Defined in entity-manager.ts:16*





___

<a id="entitysystems"></a>

### «Private» entitySystems

**●  entitySystems**:  *`Dictionary`.<`string`>,.<[EntitySystemInstance](_entity_system_instance_.entitysysteminstance.md)>* 

*Defined in entity-manager.ts:12*





___

<a id="instancedentities"></a>

### «Private» instancedEntities

**●  instancedEntities**:  *`ArrayList`.<[Entity](_entity_.entity.md)>* 

*Defined in entity-manager.ts:14*





___

<a id="disposedcomponentkey"></a>

### «Static» disposedComponentKey

**●  disposedComponentKey**:  *`string`*  = "__disposed"

*Defined in entity-manager.ts:10*





___


## Methods
<a id="createentity"></a>

###  createEntity

► **createEntity**(): [Entity](_entity_.entity.md)



*Defined in entity-manager.ts:105*





**Returns:** [Entity](_entity_.entity.md)





___

<a id="disposecomponent"></a>

###  disposeComponent

► **disposeComponent**T(componentInstance: *`T`*): `void`



*Defined in entity-manager.ts:190*



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

► **disposeEntity**(entity: *[Entity](_entity_.entity.md)*): `void`



*Defined in entity-manager.ts:115*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](_entity_.entity.md)   |  - |





**Returns:** `void`





___

<a id="findentitiesbycomponent"></a>

###  findEntitiesByComponent

► **findEntitiesByComponent**T(component: *`object`⎮`Function`*): `ArrayList`.<[Entity](_entity_.entity.md)>



*Defined in entity-manager.ts:219*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** `ArrayList`.<[Entity](_entity_.entity.md)>





___

<a id="findentitiesbycomponents"></a>

###  findEntitiesByComponents

► **findEntitiesByComponents**T(components: *(`Function`⎮`object`)[]*): `ArrayList`.<[Entity](_entity_.entity.md)>



*Defined in entity-manager.ts:230*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| components | (`Function`⎮`object`)[]   |  - |





**Returns:** `ArrayList`.<[Entity](_entity_.entity.md)>





___

<a id="findentitiesbyname"></a>

###  findEntitiesByName

► **findEntitiesByName**(name: *`string`*): `ArrayList`.<[Entity](_entity_.entity.md)>



*Defined in entity-manager.ts:211*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  - |





**Returns:** `ArrayList`.<[Entity](_entity_.entity.md)>





___

<a id="findentitiesbytag"></a>

###  findEntitiesByTag

► **findEntitiesByTag**(tag: *`string`*): `ArrayList`.<[Entity](_entity_.entity.md)>



*Defined in entity-manager.ts:247*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tag | `string`   |  - |





**Returns:** `ArrayList`.<[Entity](_entity_.entity.md)>





___

<a id="findentitiesbytags"></a>

###  findEntitiesByTags

► **findEntitiesByTags**T(tags: *`string`[]*): `ArrayList`.<[Entity](_entity_.entity.md)>



*Defined in entity-manager.ts:255*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tags | `string`[]   |  - |





**Returns:** `ArrayList`.<[Entity](_entity_.entity.md)>





___

<a id="getcomponentpool"></a>

### «Private» getComponentPool

► **getComponentPool**T(component: *`object`⎮`Function`*): [ObjectPool](_object_pool_.objectpool.md)`T`



*Defined in entity-manager.ts:266*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| component | `object`⎮`Function`   |  - |





**Returns:** [ObjectPool](_object_pool_.objectpool.md)`T`





___

<a id="getentitybyid"></a>

###  getEntityById

► **getEntityById**(id: *`number`*): [Entity](_entity_.entity.md)



*Defined in entity-manager.ts:206*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `number`   |  - |





**Returns:** [Entity](_entity_.entity.md)





___

<a id="getentitysysteminstance"></a>

###  getEntitySystemInstance

► **getEntitySystemInstance**T(entitySystem: *`object`⎮`Function`*): [EntitySystemInstance](_entity_system_instance_.entitysysteminstance.md)



*Defined in entity-manager.ts:66*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entitySystem | `object`⎮`Function`   |  - |





**Returns:** [EntitySystemInstance](_entity_system_instance_.entitysysteminstance.md)





___

<a id="getentitysystemnames"></a>

###  getEntitySystemNames

► **getEntitySystemNames**(): `string`[]



*Defined in entity-manager.ts:95*





**Returns:** `string`[]





___

<a id="getnewcomponent"></a>

###  getNewComponent

► **getNewComponent**T(component: *`object`⎮`Function`*): `T`



*Defined in entity-manager.ts:180*



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



*Defined in entity-manager.ts:82*



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

► **registerSystem**T(entitySystem: *`object`⎮`Function`*): [EntityManager](_entity_manager_.entitymanager.md)



*Defined in entity-manager.ts:28*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entitySystem | `object`⎮`Function`   |  - |





**Returns:** [EntityManager](_entity_manager_.entitymanager.md)





___

<a id="removeentityfromallsystems"></a>

### «Private» removeEntityFromAllSystems

► **removeEntityFromAllSystems**(entity: *[Entity](_entity_.entity.md)*): `void`



*Defined in entity-manager.ts:287*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](_entity_.entity.md)   |  - |





**Returns:** `void`





___

<a id="unregistersystem"></a>

###  unregisterSystem

► **unregisterSystem**T(entitySystem: *`object`⎮`Function`*): [EntityManager](_entity_manager_.entitymanager.md)



*Defined in entity-manager.ts:47*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entitySystem | `object`⎮`Function`   |  - |





**Returns:** [EntityManager](_entity_manager_.entitymanager.md)





___

<a id="updateentity"></a>

###  updateEntity

► **updateEntity**(entity: *[Entity](_entity_.entity.md)*): `void`



*Defined in entity-manager.ts:130*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](_entity_.entity.md)   |  - |





**Returns:** `void`





___

<a id="updatesystems"></a>

###  updateSystems

► **updateSystems**(elapsed: *`TimeSpan`*): `void`



*Defined in entity-manager.ts:100*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| elapsed | `TimeSpan`   |  - |





**Returns:** `void`





___


