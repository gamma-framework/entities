[Gamma Framework - Entity System](../README.md) > ["entity-system"](../modules/_entity_system_.md) > [IEntitySystem](../interfaces/_entity_system_.ientitysystem.md)



# Interface: IEntitySystem


## Methods
<a id="afterupdate"></a>

### «Optional» afterUpdate

► **afterUpdate**(): `void`



*Defined in entity-system.ts:15*





**Returns:** `void`





___

<a id="beforeupdate"></a>

### «Optional» beforeUpdate

► **beforeUpdate**(): `void`



*Defined in entity-system.ts:11*





**Returns:** `void`





___

<a id="dispose"></a>

### «Optional» dispose

► **dispose**(): `void`



*Defined in entity-system.ts:19*





**Returns:** `void`





___

<a id="entityadded"></a>

### «Optional» entityAdded

► **entityAdded**(entity: *[Entity](../classes/_entity_.entity.md)*): `void`



*Defined in entity-system.ts:9*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](../classes/_entity_.entity.md)   |  - |





**Returns:** `void`





___

<a id="entityremoved"></a>

### «Optional» entityRemoved

► **entityRemoved**(entity: *[Entity](../classes/_entity_.entity.md)*): `void`



*Defined in entity-system.ts:17*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](../classes/_entity_.entity.md)   |  - |





**Returns:** `void`





___

<a id="initialize"></a>

### «Optional» initialize

► **initialize**(): `void`



*Defined in entity-system.ts:7*





**Returns:** `void`





___

<a id="update"></a>

### «Optional» update

► **update**(elapsed: *`TimeSpan`*, entity: *[Entity](../classes/_entity_.entity.md)*, ...componentInstances: *`any`[]*): `void`



*Defined in entity-system.ts:13*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| elapsed | `TimeSpan`   |  - |
| entity | [Entity](../classes/_entity_.entity.md)   |  - |
| componentInstances | `any`[]   |  - |





**Returns:** `void`





___


