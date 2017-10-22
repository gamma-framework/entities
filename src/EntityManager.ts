import { ObjectPool } from "./ObjectPool";
import { Entity } from "./Entity";
import { Dictionary, ObjectExtensions, ArrayList, TimeSpan } from "@miracledevs/paradigm-ui-web-shared";
import { getComponentName } from "./Component";
import { IEntitySystemDefinition, getEntitySystemDefinition } from "./EntitySystem";
import { EntitySystemInstance } from "./EntitySystemInstance";

export class EntityManager
{
    static readonly disposedComponentKey: string = "__disposed";

    private entitySystems: Dictionary<string, EntitySystemInstance>;

    private instancedEntities: ArrayList<Entity>;

    private disposedEntities: ObjectPool<Entity>;

    private componentPools: Dictionary<string, ObjectPool<any>>;

    constructor(entityPoolAmount: number = 20)
    {
        this.entitySystems = new Dictionary<string, EntitySystemInstance>();
        this.instancedEntities = new ArrayList<Entity>();
        this.disposedEntities = new ObjectPool<Entity>(Entity, entityPoolAmount);
        this.componentPools = new Dictionary<string, ObjectPool<any>>();
    }

    registerSystem<T>(entitySystem: { new(...args: any[]): T } | Function): EntityManager
    {
        if (ObjectExtensions.isNull(entitySystem))
            throw new Error("Entity system can not be null.");

        var definition = getEntitySystemDefinition(entitySystem);

        if (ObjectExtensions.isNull(definition))
            throw new Error("The provided class is not an entity system.");

        if (this.entitySystems.containsKey(definition.name))
            throw new Error("Entity system already registered.");

        var instance = new EntitySystemInstance(entitySystem);
        this.entitySystems.add(instance.getDefinition().name, instance);

        return this;
    }

    unregisterSystem<T>(entitySystem: { new(...args: any[]): T } | Function): EntityManager
    {
        if (ObjectExtensions.isNull(entitySystem))
            throw new Error("Entity system can not be null.");

        var definition = getEntitySystemDefinition(entitySystem);

        if (ObjectExtensions.isNull(definition))
            throw new Error("The provided class is not an entity system.");

        if (!this.entitySystems.containsKey(definition.name))
            throw new Error("Entity system not registered.");

        this.entitySystems.get(definition.name).dispose();
        this.entitySystems.remove(definition.name);

        return this;
    }

    getEntitySystemInstance<T>(entitySystem: { new(...args: any[]): T } | Function): EntitySystemInstance
    {
        if (ObjectExtensions.isNull(entitySystem))
            throw new Error("Entity system can not be null.");

        var definition = getEntitySystemDefinition(entitySystem);

        if (ObjectExtensions.isNull(definition))
            throw new Error("The provided class is not an entity system.");

        if (!this.entitySystems.containsKey(definition.name))
            throw new Error("Entity system not registered.");

        return this.entitySystems.get(definition.name);
    }

    isSystemRegistered<T>(entitySystem: { new(...args: any[]): T } | Function): boolean
    {
        if (ObjectExtensions.isNull(entitySystem))
            throw new Error("Entity system can not be null.");

        var definition = getEntitySystemDefinition(entitySystem);

        if (ObjectExtensions.isNull(definition))
            throw new Error("The provided class is not an entity system.");

        return this.entitySystems.containsKey(definition.name);
    }

    getEntitySystemNames(): string[]
    {
        return this.entitySystems.getKeys().getInnerArray().slice();
    }

    updateSystems(elapsed: TimeSpan): void
    {
        this.entitySystems.forEach(x => x.value.update(elapsed));
    }

    createEntity(): Entity
    {
        var entity = this.disposedEntities.get().initialize(this);
        this.instancedEntities.add(entity);

        this.updateEntity(entity);

        return entity;
    }

    disposeEntity(entity: Entity): void
    {
        if (ObjectExtensions.isNull(entity))
            throw new Error("Can not dispose a null entity.");

        if (entity.isDisposed)
            throw new Error("Can not dispose a disposed entity.");

        this.instancedEntities.remove(entity);
        entity.finishDispose();
        this.disposedEntities.dispose(entity);

        this.removeEntityFromAllSystems(entity);
    }

    updateEntity(entity: Entity): void
    {
        if (ObjectExtensions.isNull(entity))
            throw new Error("Can not update a null entity.");

        if (entity.isDisposed)
            throw new Error("Can not update a disposed entity.");

        this.entitySystems.forEach(system =>
        {
            var components = system.value.getComponents();

            // if the system does not depend on any
            // component, and does not have the entity
            // already, add it to the system.
            if (components.length === 0 &&
                !system.value.hasEntity(entity))
            {
                system.value.add(entity);
                return;
            }

            // if the system dependencies are satisfied
            // by the entity, and the system does not
            // have the entity already, add it to the system.
            if (components.length > 0 &&
                !system.value.hasEntity(entity) &&
                entity.hasComponents(components))
            {
                system.value.add(entity);
                return;
            }

            // if the system already has the entity,
            // and the dependencies are not satisfied
            // any more, remove the entity.
            if (components.length > 0 &&
                system.value.hasEntity(entity) &&
                !entity.hasComponents(components))
            {
                system.value.remove(entity);
                return;
            }

            // entities won't be removed from dependent-less unless
            // the entity itself is removed, because it will always
            // satisfy the system.
        });
    }

    getNewComponent<T>(component: { new(...args: any[]): T } | Function): T
    {
        if (ObjectExtensions.isNull(component))
            throw new Error("The component can no be null.");

        var componentInstance = this.getComponentPool(component).get();
        delete componentInstance[EntityManager.disposedComponentKey];
        return componentInstance;
    }

    disposeComponent<T>(componentInstance: T): void
    {
        if (ObjectExtensions.isNull(componentInstance))
            throw new Error("Can not dispose a null or undefined component.");

        if (!ObjectExtensions.isNull(componentInstance[EntityManager.disposedComponentKey]))
            throw new Error("Can not dispose a disposed component.");

        var component = componentInstance.constructor;

        this.getComponentPool(component)
            .dispose(componentInstance);

        componentInstance[EntityManager.disposedComponentKey] = true;
    }

    getEntityById(id: number): Entity
    {
        return this.instancedEntities.firstOrDefault(x => x.id === id);
    }

    findEntitiesByName(name: string): ArrayList<Entity>
    {
        if (ObjectExtensions.isNull(name))
            throw new Error("Name can not be null.");

        return this.instancedEntities.where(x => x.name === name);
    }

    findEntitiesByComponent<T>(component: { new(...args: any[]): T } | Function): ArrayList<Entity>
    {
        if (ObjectExtensions.isNull(component))
            throw new Error("Component can not be null.");

        if (ObjectExtensions.isNull(getComponentName(component)))
            throw new Error("Invalid component type.");

        return this.instancedEntities.where(x => x.hasComponent(component));
    }

    findEntitiesByComponents<T>(components: ({ new(...args: any[]): T } | Function)[]): ArrayList<Entity>
    {
        if (ObjectExtensions.isNull(components))
            throw new Error("The components array can not be null.");

        if (components.length === 0)
            throw new Error("The components array can not be empty.");

        for (var i = 0; i < components.length; i++)
        {
            if (ObjectExtensions.isNull(getComponentName(components[i])))
                throw new Error("Invalid component type.");
        }

        return this.instancedEntities.where(x => x.hasComponents(components));
    }

    findEntitiesByTag(tag: string): ArrayList<Entity>
    {
        if (ObjectExtensions.isNull(tag))
            throw new Error("Tag can not be null.");

        return this.instancedEntities.where(x => x.hasTag(tag));
    }

    findEntitiesByTags<T>(tags: string[]): ArrayList<Entity>
    {
        if (ObjectExtensions.isNull(tags))
            throw new Error("The tags array can not be null.");

        if (tags.length === 0)
            throw new Error("The tags array can not be empty.");

        return this.instancedEntities.where(x => x.hasTags(tags));
    }

    private getComponentPool<T>(component: { new(...args: any[]): T } | Function): ObjectPool<T>
    {
        var componentName = getComponentName(component);
        var pool: ObjectPool<T> = null;

        if (ObjectExtensions.isNull(componentName))
            throw new Error("Can not get the component name.");

        if (!this.componentPools.containsKey(componentName))
        {
            pool = new ObjectPool(component);
            this.componentPools.add(componentName, pool);
        }
        else
        {
            pool = this.componentPools.get(componentName) as ObjectPool<T>;
        }

        return pool;
    }

    private removeEntityFromAllSystems(entity: Entity): void
    {
        this.entitySystems.forEach(system =>
        {
            if (!system.value.hasEntity(entity))
                return;

            system.value.remove(entity);
        });
    }
}