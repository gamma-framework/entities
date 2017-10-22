[esystem](../README.md) > [EntitySystemInstance](../classes/entitysysteminstance.md)



# Class: EntitySystemInstance

## Index

### Constructors

* [constructor](entitysysteminstance.md#constructor)


### Methods

* [add](entitysysteminstance.md#add)
* [afterUpdate](entitysysteminstance.md#afterupdate)
* [beforeUpdate](entitysysteminstance.md#beforeupdate)
* [callInstanceMethod](entitysysteminstance.md#callinstancemethod)
* [dispose](entitysysteminstance.md#dispose)
* [getComponentInstances](entitysysteminstance.md#getcomponentinstances)
* [getComponents](entitysysteminstance.md#getcomponents)
* [getDefinition](entitysysteminstance.md#getdefinition)
* [getInstance](entitysysteminstance.md#getinstance)
* [hasEntity](entitysysteminstance.md#hasentity)
* [initialize](entitysysteminstance.md#initialize)
* [remove](entitysysteminstance.md#remove)
* [update](entitysysteminstance.md#update)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new EntitySystemInstance**(entitySystem: *`Function`*): [EntitySystemInstance](entitysysteminstance.md)


*Defined in [EntitySystemInstance.ts:14](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L14)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entitySystem | `Function`   |  - |





**Returns:** [EntitySystemInstance](entitysysteminstance.md)

---



## Methods
<a id="add"></a>

###  add

► **add**(entity: *[Entity](entity.md)*): `void`



*Defined in [EntitySystemInstance.ts:32](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L32)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](entity.md)   |  - |





**Returns:** `void`





___

<a id="afterupdate"></a>

### «Private» afterUpdate

► **afterUpdate**(): `void`



*Defined in [EntitySystemInstance.ts:105](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L105)*





**Returns:** `void`





___

<a id="beforeupdate"></a>

### «Private» beforeUpdate

► **beforeUpdate**(): `void`



*Defined in [EntitySystemInstance.ts:100](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L100)*





**Returns:** `void`





___

<a id="callinstancemethod"></a>

### «Private» callInstanceMethod

► **callInstanceMethod**(method: *`Function`*, args?: *`any`[]*): `void`



*Defined in [EntitySystemInstance.ts:126](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L126)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| method | `Function`   |  - |
| args | `any`[]   |  - |





**Returns:** `void`





___

<a id="dispose"></a>

###  dispose

► **dispose**(): `void`



*Defined in [EntitySystemInstance.ts:86](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L86)*





**Returns:** `void`





___

<a id="getcomponentinstances"></a>

### «Private» getComponentInstances

► **getComponentInstances**(entity: *[Entity](entity.md)*, args: *`any`[]*): `any`[]



*Defined in [EntitySystemInstance.ts:110](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L110)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](entity.md)   |  - |
| args | `any`[]   |  - |





**Returns:** `any`[]





___

<a id="getcomponents"></a>

###  getComponents

► **getComponents**(): `Function`[]



*Defined in [EntitySystemInstance.ts:73](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L73)*





**Returns:** `Function`[]





___

<a id="getdefinition"></a>

###  getDefinition

► **getDefinition**(): [IEntitySystemDefinition](../interfaces/ientitysystemdefinition.md)



*Defined in [EntitySystemInstance.ts:63](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L63)*





**Returns:** [IEntitySystemDefinition](../interfaces/ientitysystemdefinition.md)





___

<a id="getinstance"></a>

###  getInstance

► **getInstance**(): [IEntitySystem](../interfaces/ientitysystem.md)



*Defined in [EntitySystemInstance.ts:68](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L68)*





**Returns:** [IEntitySystem](../interfaces/ientitysystem.md)





___

<a id="hasentity"></a>

###  hasEntity

► **hasEntity**(entity: *[Entity](entity.md)*): `boolean`



*Defined in [EntitySystemInstance.ts:78](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L78)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](entity.md)   |  - |





**Returns:** `boolean`





___

<a id="initialize"></a>

### «Private» initialize

► **initialize**(): `void`



*Defined in [EntitySystemInstance.ts:91](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L91)*





**Returns:** `void`





___

<a id="remove"></a>

###  remove

► **remove**(entity: *[Entity](entity.md)*): `void`



*Defined in [EntitySystemInstance.ts:44](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L44)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](entity.md)   |  - |





**Returns:** `void`





___

<a id="update"></a>

###  update

► **update**(elapsed: *`TimeSpan`*): `void`



*Defined in [EntitySystemInstance.ts:56](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystemInstance.ts#L56)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| elapsed | `TimeSpan`   |  - |





**Returns:** `void`





___


