import { ObjectExtensions, FunctionExtensions, ArrayList, TimeSpan } from "@miracledevs/paradigm-ui-web-shared";
import { getComponentName } from "./component";
import { Entity } from "./entity";
import { IEntitySystemDefinition, IEntitySystem, getEntitySystemDefinition } from "./entity-system";

export class EntitySystemInstance
{
    private entitySystem: Function;

    private definition: IEntitySystemDefinition;

    private entities: ArrayList<Entity>;

    private instance: IEntitySystem;

    constructor(entitySystem: Function)
    {
        if (ObjectExtensions.isNull(entitySystem))
            throw new Error("Entity System can not be null");

        var definition = getEntitySystemDefinition(entitySystem);

        if (ObjectExtensions.isNull(definition))
            throw new Error("Can not get the entity system definition.");

        this.entitySystem = entitySystem;
        this.definition = definition;
        this.entities = new ArrayList<Entity>();
        this.initialize();
    }

    add(entity: Entity): void
    {
        if (ObjectExtensions.isNull(entity))
            throw new Error("The entity can not be null.");

        if (entity.isDisposed)
            throw new Error("Can not add a disposed entity.");

        this.entities.add(entity);
        this.callInstanceMethod(this.instance.entityAdded, [entity]);
    }

    remove(entity: Entity): void
    {
        if (ObjectExtensions.isNull(entity))
            throw new Error("The entity can not be null.");

        if (!this.hasEntity(entity))
            throw new Error("The entity was not added to the system, and can not be removed.");

        this.entities.remove(entity);
        this.callInstanceMethod(this.instance.entityRemoved, [entity]);
    }

    update(elapsed: TimeSpan): void
    {
        this.beforeUpdate();
        this.entities.forEach(x => this.callInstanceMethod(this.instance.update, this.getComponentInstances(x, [elapsed])));
        this.afterUpdate();
    }

    getDefinition(): IEntitySystemDefinition
    {
        return this.definition;
    }

    getInstance(): IEntitySystem
    {
        return this.instance;
    }

    getComponents(): Function[]
    {
        return this.definition.dependencies;
    }

    hasEntity(entity: Entity): boolean
    {
        if (ObjectExtensions.isNull(entity))
            throw new Error("The entity can not be null.");

        return this.entities.indexOf(entity) >= 0;
    }

    dispose(): void
    {
        this.callInstanceMethod(this.instance.dispose);
    }

    private initialize(): void
    {
        // TODO: add an injection service to resolve the entity system,
        this.instance = ((this.definition.constructorFunction as any)() ||
            new (this.definition.constructorFunction as any)()) as IEntitySystem;

        this.callInstanceMethod(this.instance.initialize);
    }

    private beforeUpdate(): void
    {
        this.callInstanceMethod(this.instance.beforeUpdate);
    }

    private afterUpdate(): void
    {
        this.callInstanceMethod(this.instance.afterUpdate);
    }

    private getComponentInstances(entity: Entity, args: any[]): any[]
    {
        var components = args;

        components.push(entity);

        // TODO: maybe adding methods of instance retrieval by name
        //       can improve the speed of this step.
        for (var component of this.definition.dependencies)
        {
            components.push(entity.getComponentInstance(component));
        }

        return components;
    }

    private callInstanceMethod(method: Function, args?: any[]): void
    {
        if (!ObjectExtensions.isNull(method))
        {
            method.apply(this.instance, args);
        }
    }
}