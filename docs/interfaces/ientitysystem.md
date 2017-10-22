[esystem](../README.md) > [IEntitySystem](../interfaces/ientitysystem.md)



# Interface: IEntitySystem


## Methods
<a id="afterupdate"></a>

### «Optional» afterUpdate

► **afterUpdate**(): `void`



*Defined in [EntitySystem.ts:15](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystem.ts#L15)*





**Returns:** `void`





___

<a id="beforeupdate"></a>

### «Optional» beforeUpdate

► **beforeUpdate**(): `void`



*Defined in [EntitySystem.ts:11](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystem.ts#L11)*





**Returns:** `void`





___

<a id="dispose"></a>

### «Optional» dispose

► **dispose**(): `void`



*Defined in [EntitySystem.ts:19](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystem.ts#L19)*





**Returns:** `void`





___

<a id="entityadded"></a>

### «Optional» entityAdded

► **entityAdded**(entity: *[Entity](../classes/entity.md)*): `void`



*Defined in [EntitySystem.ts:9](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystem.ts#L9)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](../classes/entity.md)   |  - |





**Returns:** `void`





___

<a id="entityremoved"></a>

### «Optional» entityRemoved

► **entityRemoved**(entity: *[Entity](../classes/entity.md)*): `void`



*Defined in [EntitySystem.ts:17](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystem.ts#L17)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| entity | [Entity](../classes/entity.md)   |  - |





**Returns:** `void`





___

<a id="initialize"></a>

### «Optional» initialize

► **initialize**(): `void`



*Defined in [EntitySystem.ts:7](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystem.ts#L7)*





**Returns:** `void`





___

<a id="update"></a>

### «Optional» update

► **update**(elapsed: *`TimeSpan`*, entity: *[Entity](../classes/entity.md)*, ...componentInstances: *`any`[]*): `void`



*Defined in [EntitySystem.ts:13](https://github.com/gamma-framework/entities/blob/46d6513/src/EntitySystem.ts#L13)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| elapsed | `TimeSpan`   |  - |
| entity | [Entity](../classes/entity.md)   |  - |
| componentInstances | `any`[]   |  - |





**Returns:** `void`





___


