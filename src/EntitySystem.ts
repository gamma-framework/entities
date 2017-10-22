import { ObjectExtensions, FunctionExtensions, ArrayList, TimeSpan } from "@miracledevs/paradigm-ui-web-shared";
import { getComponentName } from "./Component";
import { Entity } from "./Entity";

export interface IEntitySystem
{
    initialize?(): void;

    entityAdded?(entity: Entity): void;

    beforeUpdate?(): void;

    update?(elapsed: TimeSpan, entity: Entity, ...componentInstances: any[]): void;

    afterUpdate?(): void;

    entityRemoved?(entity: Entity): void;

    dispose?(): void;
}

export interface IEntitySystemDefinition
{
    name?: string;

    constructorFunction?: Function;

    dependencies?: Function[];
}

export function EntitySystem(definition?: IEntitySystemDefinition): <T>(component: { new(...args: any[]): T }) => void
{
    return <T>(entitySystem: { new(...args: any[]): T }): void =>
    {
        if (ObjectExtensions.isNull(entitySystem))
            throw new Error("Can not decorate a null or undefined value as a component.");

        if (!ObjectExtensions.isNull(getEntitySystemDefinition(entitySystem)))
            throw new Error("Can not decorate a previously decorated component.");

        if (ObjectExtensions.isNull(definition))
            definition = {} as IEntitySystemDefinition;

        if (ObjectExtensions.isNull(definition.dependencies))
            definition.dependencies = [];

        for (var component of definition.dependencies)
        {
            if (ObjectExtensions.isNull(getComponentName(component)))
            {
                throw new Error(`The dependency '${FunctionExtensions.getFunctionName(component)}' is not a component.`);
            }
        }

        if (ObjectExtensions.isNull(definition.name))
            definition.name = FunctionExtensions.getFunctionName(entitySystem);

        if (ObjectExtensions.isNull(definition.constructorFunction))
            definition.constructorFunction = entitySystem;

        entitySystem[systemDefinitionKey] = definition;
    }
}

export function getEntitySystemDefinition<T>(entitySystem: { new(...args: any[]): T } | Function): IEntitySystemDefinition
{
    if (ObjectExtensions.isNull(entitySystem) || ObjectExtensions.isNull(entitySystem[systemDefinitionKey]))
        return null;

    return entitySystem[systemDefinitionKey];
}

const systemDefinitionKey: string = "$system";