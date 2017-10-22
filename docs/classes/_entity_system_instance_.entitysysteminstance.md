[Gamma Framework - Entity System](../README.md) > ["entity-system-instance"](../modules/_entity_system_instance_.md) > [EntitySystemInstance](../classes/_entity_system_instance_.entitysysteminstance.md)



# Class: EntitySystemInstance

## Index

### Constructors

* [constructor](_entity_system_instance_.entitysysteminstance.md#constructor)


### Methods

* [add](_entity_system_instance_.entitysysteminstance.md#add)
* [afterUpdate](_entity_system_instance_.entitysysteminstance.md#afterupdate)
* [beforeUpdate](_entity_system_instance_.entitysysteminstance.md#beforeupdate)
* [callInstanceMethod](_entity_system_instance_.entitysysteminstance.md#callinstancemethod)
* [dispose](_entity_system_instance_.entitysysteminstance.md#dispose)
* [getComponentInstances](_entity_system_instance_.entitysysteminstance.md#getcomponentinstances)
* [getComponents](_entity_system_instance_.entitysysteminstance.md#getcomponents)
* [getDefinition](_entity_system_instance_.entitysysteminstance.md#getdefinition)
* [getInstance](_entity_system_instance_.entitysysteminstance.md#getinstance)
* [hasEntity](_entity_system_instance_.entitysysteminstance.md#hasentity)
* [initialize](_entity_system_instance_.entitysysteminstance.md#initialize)
* [remove](_entity_system_instance_.entitysysteminstance.md#remove)
* [update](_entity_system_instance_.entitysysteminstance.md#update)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new EntitySystemInstance**(entitySystem: *`Function`*): [EntitySystemInstance](_entity_system_instance_.entitysysteminstance.md)


*Defined in entity-system-instance.ts:14*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entitySystem | `Function`   |  - |





**Returns:** [EntitySystemInstance](_entity_system_instance_.entitysysteminstance.md)

---



## Methods
<a id="add"></a>

###  add

► **add**(entity: *[Entity](_entity_.entity.md)*): `void`



*Defined in entity-system-instance.ts:32*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](_entity_.entity.md)   |  - |





**Returns:** `void`





___

<a id="afterupdate"></a>

### «Private» afterUpdate

► **afterUpdate**(): `void`



*Defined in entity-system-instance.ts:105*





**Returns:** `void`





___

<a id="beforeupdate"></a>

### «Private» beforeUpdate

► **beforeUpdate**(): `void`



*Defined in entity-system-instance.ts:100*





**Returns:** `void`





___

<a id="callinstancemethod"></a>

### «Private» callInstanceMethod

► **callInstanceMethod**(method: *`Function`*, args?: *`any`[]*): `void`



*Defined in entity-system-instance.ts:126*



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



*Defined in entity-system-instance.ts:86*





**Returns:** `void`





___

<a id="getcomponentinstances"></a>

### «Private» getComponentInstances

► **getComponentInstances**(entity: *[Entity](_entity_.entity.md)*, args: *`any`[]*): `any`[]



*Defined in entity-system-instance.ts:110*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](_entity_.entity.md)   |  - |
| args | `any`[]   |  - |





**Returns:** `any`[]





___

<a id="getcomponents"></a>

###  getComponents

► **getComponents**(): `Function`[]



*Defined in entity-system-instance.ts:73*





**Returns:** `Function`[]





___

<a id="getdefinition"></a>

###  getDefinition

► **getDefinition**(): [IEntitySystemDefinition](../interfaces/_entity_system_.ientitysystemdefinition.md)



*Defined in entity-system-instance.ts:63*





**Returns:** [IEntitySystemDefinition](../interfaces/_entity_system_.ientitysystemdefinition.md)





___

<a id="getinstance"></a>

###  getInstance

► **getInstance**(): [IEntitySystem](../interfaces/_entity_system_.ientitysystem.md)



*Defined in entity-system-instance.ts:68*





**Returns:** [IEntitySystem](../interfaces/_entity_system_.ientitysystem.md)





___

<a id="hasentity"></a>

###  hasEntity

► **hasEntity**(entity: *[Entity](_entity_.entity.md)*): `boolean`



*Defined in entity-system-instance.ts:78*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](_entity_.entity.md)   |  - |





**Returns:** `boolean`





___

<a id="initialize"></a>

### «Private» initialize

► **initialize**(): `void`



*Defined in entity-system-instance.ts:91*





**Returns:** `void`





___

<a id="remove"></a>

###  remove

► **remove**(entity: *[Entity](_entity_.entity.md)*): `void`



*Defined in entity-system-instance.ts:44*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](_entity_.entity.md)   |  - |





**Returns:** `void`





___

<a id="update"></a>

###  update

► **update**(elapsed: *`TimeSpan`*): `void`



*Defined in entity-system-instance.ts:56*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| elapsed | `TimeSpan`   |  - |





**Returns:** `void`





___


