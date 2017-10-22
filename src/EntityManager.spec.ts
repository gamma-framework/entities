import { EntityManager } from "./EntityManager";
import { Component } from "./Component";
import { ObjectExtensions, FunctionExtensions, ArrayList, TimeSpan } from "@miracledevs/paradigm-ui-web-shared";
import { Entity } from "./Entity";
import { EntitySystem, IEntitySystem, getEntitySystemDefinition } from "./EntitySystem";

@Component("firstComponent")
class FirstComponentClass
{
}

@Component("secondComponent")
class SecondComponentClass
{
}

class NonComponentClass
{
}

@EntitySystem({
    name: "firstEntitySystem",
    dependencies: [FirstComponentClass, SecondComponentClass]
})
class FirstEntitySystem implements IEntitySystem
{
    public updated: boolean;

    constructor()
    {
        this.updated = false;
    }

    update(elapsed: TimeSpan, entity: Entity, firstComponent: FirstComponentClass, secondComponent: SecondComponentClass): void
    {
        expect(elapsed).not.toBeNull();
        expect(elapsed).not.toBeUndefined();

        expect(entity).not.toBeNull();
        expect(entity).not.toBeUndefined();
        expect(entity.constructor).toBe(Entity);

        expect(firstComponent).not.toBeNull();
        expect(firstComponent).not.toBeUndefined();
        expect(firstComponent.constructor).toBe(FirstComponentClass);

        expect(secondComponent).not.toBeNull();
        expect(secondComponent).not.toBeUndefined();
        expect(secondComponent.constructor).toBe(SecondComponentClass);

        this.updated = true;
    }
}

@EntitySystem()
class SecondEntitySystem
{
    updated: boolean;

    constructor()
    {
        this.updated = false;
    }

    update(elapsed: TimeSpan, entity: Entity): void
    {
        expect(elapsed).not.toBeNull();
        expect(elapsed).not.toBeUndefined();

        expect(entity).not.toBeNull();
        expect(entity).not.toBeUndefined();
        expect(entity.constructor).toBe(Entity);

        this.updated = true;
    }
}

class NonEntitySystem
{
}

describe("Entity Manager", () =>
{
    describe("constructor", () =>
    {
        it("should instantiate the entity manager", () =>
        {
            expect(() => new EntityManager()).not.toThrow();
        });

        it("should instantiate the entity manager with a different pool size", () =>
        {
            expect(() => new EntityManager(100)).not.toThrow();
        });
    });

    describe("Entity Systems", () =>
    {
        describe("register system", () =>
        {
            it("should register an entity system", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.registerSystem(FirstEntitySystem)).not.toThrow();
                expect(manager.isSystemRegistered(FirstEntitySystem)).toBeTruthy();
                expect(manager.getEntitySystemInstance(FirstEntitySystem)).not.toBeNull();
                expect(manager.getEntitySystemInstance(FirstEntitySystem)).not.toBeUndefined();
            });

            it("shouldn't register a null entity system", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.registerSystem(null)).toThrow();
            });

            it("shouldn't register an undefined entity system", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.registerSystem(undefined)).toThrow();
            });

            it("shouldn't register a non entity system class", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.registerSystem(NonEntitySystem)).toThrow();
            });

            it("shouldn't register twice an entity system", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.registerSystem(FirstEntitySystem)).not.toThrow();
                expect(() => manager.registerSystem(FirstEntitySystem)).toThrow();
            });
        });

        describe("unregister system", () =>
        {
            it("should unregister an entity system", () =>
            {
                var manager = new EntityManager();
                manager.registerSystem(FirstEntitySystem);

                expect(() => manager.unregisterSystem(FirstEntitySystem)).not.toThrow();
                expect(manager.isSystemRegistered(FirstEntitySystem)).toBeFalsy()
                expect(() => manager.getEntitySystemInstance(FirstEntitySystem)).toThrow();
            });

            it("shouldn't unregister a null entity system", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.unregisterSystem(null)).toThrow();
            });

            it("shouldn't unregister an undefined entity system", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.unregisterSystem(undefined)).toThrow();
            });

            it("shouldn't unregister a non entity system class", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.unregisterSystem(NonEntitySystem)).toThrow();
            });

            it("shouldn't unregister an entity system that wasn't registered before.", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.unregisterSystem(FirstEntitySystem)).toThrow();
            });
        });

        describe("get system instance", () =>
        {
            it("should get a system instance", () =>
            {
                var manager = new EntityManager();
                manager.registerSystem(FirstEntitySystem);
                expect(manager.getEntitySystemInstance(FirstEntitySystem)).not.toBeNull();
                expect(manager.getEntitySystemInstance(FirstEntitySystem)).not.toBeUndefined();
            });

            it("shouldn't get an instance from a null system", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.getEntitySystemInstance(null)).toThrow();
            });

            it("shouldn't get an instance from an undefined system", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.getEntitySystemInstance(undefined)).toThrow();
            });

            it("shouldn't get an instance from a non system class", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.getEntitySystemInstance(NonEntitySystem)).toThrow();
            });
        });

        describe("is system registered", () =>
        {
            it("should tell if a system is registered", () =>
            {
                var manager = new EntityManager();
                manager.registerSystem(FirstEntitySystem);
                expect(manager.isSystemRegistered(FirstEntitySystem)).toBeTruthy();
            });

            it("should tell if a system is not registered", () =>
            {
                var manager = new EntityManager();
                expect(manager.isSystemRegistered(FirstEntitySystem)).toBeFalsy();
            });

            it("shouldn't tell if a system is registered from a null system", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.isSystemRegistered(null)).toThrow();
            });

            it("shouldn't tell if a system is registered from an undefined system", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.isSystemRegistered(undefined)).toThrow();
            });

            it("shouldn't tell if a system is registered from a non system class", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.isSystemRegistered(NonEntitySystem)).toThrow();
            });
        });

        describe("get entity system names", () =>
        {
            it("should retrieve all the entity system names", () =>
            {
                var manager = new EntityManager();

                manager.registerSystem(FirstEntitySystem)
                    .registerSystem(SecondEntitySystem);

                var names = manager.getEntitySystemNames();

                expect(names.length).toBe(2);
                expect(names[0]).toBe(getEntitySystemDefinition(FirstEntitySystem).name);
                expect(names[1]).toBe(getEntitySystemDefinition(SecondEntitySystem).name);
            });

            it("should be immutable", () =>
            {
                var manager = new EntityManager();

                manager.registerSystem(FirstEntitySystem)
                    .registerSystem(SecondEntitySystem);

                var names = manager.getEntitySystemNames();
                names.pop();
                names.pop();
                names = manager.getEntitySystemNames();

                expect(names.length).toBe(2);
                expect(names[0]).toBe(getEntitySystemDefinition(FirstEntitySystem).name);
                expect(names[1]).toBe(getEntitySystemDefinition(SecondEntitySystem).name);
            });

            it("should be empty if no entity systems were added", () =>
            {
                var manager = new EntityManager();
                var names = manager.getEntitySystemNames();

                expect(names).not.toBeNull();
                expect(names).not.toBeUndefined();
                expect(names.length).toBe(0);
            });
        });

        describe("update entity systems", () =>
        {
            it("should update all the system entities", () =>
            {
                var manager = new EntityManager();

                manager.registerSystem(FirstEntitySystem)
                    .registerSystem(SecondEntitySystem);

                var entity = manager.createEntity()
                    .addComponent(FirstComponentClass)
                    .addComponent(SecondComponentClass);

                expect(manager.getEntitySystemInstance(FirstEntitySystem).hasEntity(entity)).toBeTruthy();
                expect(manager.getEntitySystemInstance(SecondEntitySystem).hasEntity(entity)).toBeTruthy();

                expect(() => manager.updateSystems(TimeSpan.zero)).not.toThrow();

                expect((manager.getEntitySystemInstance(FirstEntitySystem).getInstance() as FirstEntitySystem).updated).toBeTruthy();
                expect((manager.getEntitySystemInstance(SecondEntitySystem).getInstance() as SecondEntitySystem).updated).toBeTruthy();
            });

            it("should update without errors even if not system was registered", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.updateSystems(TimeSpan.zero)).not.toThrow();
            });
        });
    });

    describe("Entities", () =>
    {
        describe("create entity", () =>
        {
            it("should instante a new entity", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.createEntity()).not.toThrow();
            });

            it("should instante more entities than the pool initial size", () =>
            {
                var manager = new EntityManager(5);

                for (var i = 0; i < 10; i++)
                {
                    expect(() => manager.createEntity()).not.toThrow();
                }
            });

            it("should get the same type of entity that was previously disposed", () =>
            {
                var manager = new EntityManager();

                var entity = manager.createEntity();
                manager.disposeEntity(entity);
                entity = manager.createEntity();

                expect(ObjectExtensions.getTypeName(entity)).toBe(FunctionExtensions.getFunctionName(Entity));
            });
        });

        describe("dispose entity", () =>
        {
            it("should dispose an entity", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.disposeEntity(manager.createEntity())).not.toThrow();
            });

            it("should dispose entity contents", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();

                entity.addComponent(FirstComponentClass);
                entity.addTag("tag");

                expect(() => manager.disposeEntity(entity)).not.toThrow();
                expect(entity.getComponentNames().length).toBe(0);
                expect(entity.getTags().length).toBe(0);
            });

            it("shouldn't dispose a null entity", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.disposeEntity(null)).toThrow();
            });

            it("shouldn't dispose an undefined entity", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.disposeEntity(undefined)).toThrow();
            });

            it("shouldn't let to dispose an entity twice", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();
                expect(() => manager.disposeEntity(entity)).not.toThrow();
                expect(() => manager.disposeEntity(entity)).toThrow();
            });
        });

        describe("update entities", () =>
        {
            it("should fail trying to update null entities", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.updateEntity(null)).toThrow();
            });

            it("should fail trying to update undefined entities", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.updateEntity(undefined)).toThrow();
            });

            it("should fail trying to update disposed entities", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();
                manager.disposeEntity(entity);

                expect(() => manager.updateEntity(entity)).toThrow();
            });

            it("update should add entities to systems", () =>
            {
                var manager = new EntityManager();

                manager.registerSystem(FirstEntitySystem)
                    .registerSystem(SecondEntitySystem);

                var entity = manager.createEntity().addComponent(FirstComponentClass);

                expect(manager.getEntitySystemInstance(FirstEntitySystem).hasEntity(entity)).toBeFalsy();
                expect(manager.getEntitySystemInstance(SecondEntitySystem).hasEntity(entity)).toBeTruthy();

                entity.addComponent(SecondComponentClass);

                expect(manager.getEntitySystemInstance(FirstEntitySystem).hasEntity(entity)).toBeTruthy();
            });

            it("update should remove entities from systems", () =>
            {
                var manager = new EntityManager();

                manager.registerSystem(FirstEntitySystem)
                    .registerSystem(SecondEntitySystem);

                var entity = manager.createEntity()
                    .addComponent(FirstComponentClass)
                    .addComponent(SecondComponentClass);

                expect(manager.getEntitySystemInstance(FirstEntitySystem).hasEntity(entity)).toBeTruthy();
                expect(manager.getEntitySystemInstance(SecondEntitySystem).hasEntity(entity)).toBeTruthy();

                entity.removeComponent(SecondComponentClass);

                expect(manager.getEntitySystemInstance(FirstEntitySystem).hasEntity(entity)).toBeFalsy();
            });
        });

        describe("get a new component from the pool", () =>
        {
            it("should create a new component", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();
                var component = null;

                expect(() => component = manager.getNewComponent(FirstComponentClass)).not.toThrow();

                expect(component).not.toBeNull();
                expect(component).not.toBeUndefined();
            });

            it("should create more than one component", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();
                var component = null;

                expect(() => component = manager.getNewComponent(FirstComponentClass)).not.toThrow();
                expect(component).not.toBeNull();
                expect(component).not.toBeUndefined();

                expect(() => component = manager.getNewComponent(SecondComponentClass)).not.toThrow();
                expect(component).not.toBeNull();
                expect(component).not.toBeUndefined();
            });

            it("should fail if a class that is not a component is passed", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();

                expect(() => manager.getNewComponent(NonComponentClass)).toThrow();
            });

            it("should fail if a null component is passed", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();

                expect(() => manager.getNewComponent(null)).toThrow();
            });

            it("should fail if an undefined component is passed", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();

                expect(() => manager.getNewComponent(undefined)).toThrow();
            });

            it("shouldn't have the __disposed flag in it", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();

                var component = manager.getNewComponent(FirstComponentClass);
                manager.disposeComponent(component);
                component = manager.getNewComponent(FirstComponentClass);

                expect(component[EntityManager.disposedComponentKey]).toBeUndefined();
            });

            it("should get the same type of the component that was previously disposed", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();

                var component = manager.getNewComponent(FirstComponentClass);
                manager.disposeComponent(component);
                component = manager.getNewComponent(FirstComponentClass);

                expect(ObjectExtensions.getTypeName(component)).toBe(FunctionExtensions.getFunctionName(FirstComponentClass));
            });
        });

        describe("dispose component", () =>
        {
            it("should dispose a component", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();

                var component = manager.getNewComponent(FirstComponentClass);

                expect(() => manager.disposeComponent(component)).not.toThrow();
            });

            it("shouldn't dispose a null component", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();

                expect(() => manager.disposeComponent(null)).toThrow();
            });

            it("shouldn't dispose an undefined component", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();

                expect(() => manager.disposeComponent(undefined)).toThrow();
            });

            it("shouldn't let to dispose component twice", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();

                var component = manager.getNewComponent(FirstComponentClass);

                expect(() => manager.disposeComponent(component)).not.toThrow();
                expect(() => manager.disposeComponent(component)).toThrow();
            });

            it("dispose an entity should eliminate the entity from all the systems", () =>
            {
                var manager = new EntityManager();

                manager.registerSystem(FirstEntitySystem)
                    .registerSystem(SecondEntitySystem);

                var entity = manager.createEntity()
                    .addComponent(FirstComponentClass)
                    .addComponent(SecondComponentClass);

                manager.disposeEntity(entity);

                expect(manager.getEntitySystemInstance(FirstEntitySystem).hasEntity(entity)).toBeFalsy();
                expect(manager.getEntitySystemInstance(SecondEntitySystem).hasEntity(entity)).toBeFalsy();
            });
        });

        describe("get entity by id", () =>
        {
            it("should get an entity by id", () =>
            {
                var manager = new EntityManager();
                var entity = manager.createEntity();
                var other = null;
                expect(() => other = manager.getEntityById(entity.id)).not.toThrow();
                expect(other).toBe(entity);
            });

            it("shouldn't get an entity that wasnt created by id", () =>
            {
                var manager = new EntityManager();
                expect(manager.getEntityById(0)).toBeNull();
            });
        });

        describe("find entities by name", () =>
        {
            it("should find entities by name", () =>
            {
                var manager = new EntityManager();

                var entity1 = manager.createEntity();
                var entity2 = manager.createEntity();
                var entity3 = manager.createEntity();
                var entities: ArrayList<Entity> = null;

                entity1.name = "entity";
                entity2.name = "other entity";
                entity3.name = "entity";

                expect(() => entities = manager.findEntitiesByName(entity1.name)).not.toThrow();
                expect(entities).not.toBeNull();
                expect(entities).not.toBeUndefined();
                expect(entities.count()).toBe(2);
                expect(entities.get(0)).toBe(entity1);
                expect(entities.get(1)).toBe(entity3);
            });

            it("shouldn't find entites by name that weren't created", () =>
            {
                var manager = new EntityManager();

                var entity1 = manager.createEntity();
                var entity2 = manager.createEntity();
                var entity3 = manager.createEntity();
                var entities: ArrayList<Entity> = null;

                entity1.name = "entity";
                entity2.name = "other entity";
                entity3.name = "entity";

                expect(() => entities = manager.findEntitiesByName("")).not.toThrow();
                expect(entities).not.toBeNull();
                expect(entities).not.toBeUndefined();
                expect(entities.count()).toBe(0);
            });

            it("should throw if name is null", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByName(null)).toThrow();
            });

            it("should throw if name is undefined", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByName(undefined)).toThrow();
            });
        });

        describe("find entities by component", () =>
        {
            it("should find entities by component", () =>
            {
                var manager = new EntityManager();

                var entity1 = manager.createEntity();
                var entity2 = manager.createEntity();
                var entity3 = manager.createEntity();
                var entities: ArrayList<Entity> = null;

                entity1.addComponent(FirstComponentClass).addComponent(SecondComponentClass);
                entity2.addComponent(FirstComponentClass);
                entity3.addComponent(SecondComponentClass);

                expect(() => entities = manager.findEntitiesByComponent(FirstComponentClass)).not.toThrow();
                expect(entities).not.toBeNull();
                expect(entities).not.toBeUndefined();
                expect(entities.count()).toBe(2);
                expect(entities.get(0)).toBe(entity1);
                expect(entities.get(1)).toBe(entity2);
            });

            it("shouldn't find entites without a component", () =>
            {
                var manager = new EntityManager();

                var entity1 = manager.createEntity();
                var entity2 = manager.createEntity();
                var entity3 = manager.createEntity();
                var entities: ArrayList<Entity> = null;

                entity1.addComponent(FirstComponentClass);
                entity2.addComponent(FirstComponentClass);
                entity3.addComponent(FirstComponentClass);

                expect(() => entities = manager.findEntitiesByComponent(SecondComponentClass)).not.toThrow();
                expect(entities).not.toBeNull();
                expect(entities).not.toBeUndefined();
                expect(entities.count()).toBe(0);
            });

            it("should throw if component is null", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByComponent(null)).toThrow();
            });

            it("should throw if component is undefined", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByComponent(undefined)).toThrow();
            });

            it("should throw if is not a component", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByComponent(NonComponentClass)).toThrow();
            });
        });

        describe("find entities by components", () =>
        {
            it("should find entities by components", () =>
            {
                var manager = new EntityManager();

                var entity1 = manager.createEntity();
                var entity2 = manager.createEntity();
                var entity3 = manager.createEntity();
                var entities: ArrayList<Entity> = null;

                entity1.addComponent(FirstComponentClass).addComponent(SecondComponentClass);
                entity2.addComponent(FirstComponentClass).addComponent(SecondComponentClass);
                entity3.addComponent(SecondComponentClass);


                expect(() => entities = manager.findEntitiesByComponents([FirstComponentClass, SecondComponentClass])).not.toThrow();
                expect(entities).not.toBeNull();
                expect(entities).not.toBeUndefined();
                expect(entities.count()).toBe(2);
                expect(entities.get(0)).toBe(entity1);
                expect(entities.get(1)).toBe(entity2);
            });

            it("shouldn't find entites by components that weren't created", () =>
            {
                var manager = new EntityManager();

                var entity1 = manager.createEntity();
                var entity2 = manager.createEntity();
                var entity3 = manager.createEntity();
                var entities: ArrayList<Entity> = null;

                entity1.addComponent(FirstComponentClass);
                entity2.addComponent(FirstComponentClass);
                entity3.addComponent(FirstComponentClass);

                expect(() => entities = manager.findEntitiesByComponents([FirstComponentClass, SecondComponentClass])).not.toThrow();
                expect(entities).not.toBeNull();
                expect(entities).not.toBeUndefined();
                expect(entities.count()).toBe(0);
            });

            it("should throw if components is null", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByComponents(null)).toThrow();
            });

            it("should throw if components is undefined", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByComponents(undefined)).toThrow();
            });

            it("should throw if components is empty", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByComponents([])).toThrow();
            });

            it("should throw if at least one of the components is not a valid component", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByComponents([FirstComponentClass, NonComponentClass])).toThrow();
            });
        });

        describe("find entities by tag", () =>
        {
            it("should find entities by tag", () =>
            {
                var manager = new EntityManager();

                var entity1 = manager.createEntity();
                var entity2 = manager.createEntity();
                var entity3 = manager.createEntity();
                var entities: ArrayList<Entity> = null;

                entity1.addTag("Enemy").addTag("Boss");
                entity2.addTag("Enemy");
                entity3.addTag("Player");

                expect(() => entities = manager.findEntitiesByTag("Enemy")).not.toThrow();
                expect(entities).not.toBeNull();
                expect(entities).not.toBeUndefined();
                expect(entities.count()).toBe(2);
                expect(entities.get(0)).toBe(entity1);
                expect(entities.get(1)).toBe(entity2);
            });

            it("shouldn't find entites by a tag that weren't created", () =>
            {
                var manager = new EntityManager();

                var entity1 = manager.createEntity();
                var entity2 = manager.createEntity();
                var entity3 = manager.createEntity();
                var entities: ArrayList<Entity> = null;

                entity1.addTag("Enemy").addTag("Boss");
                entity2.addTag("Enemy");
                entity3.addTag("Player");


                expect(() => entities = manager.findEntitiesByTag("Bullet")).not.toThrow();
                expect(entities).not.toBeNull();
                expect(entities).not.toBeUndefined();
                expect(entities.count()).toBe(0);
            });

            it("should throw if tag is null", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByTag(null)).toThrow();
            });

            it("should throw if tag is undefined", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByTag(undefined)).toThrow();
            });
        });

        describe("find entities by tags", () =>
        {
            it("should find entities by tags", () =>
            {
                var manager = new EntityManager();

                var entity1 = manager.createEntity();
                var entity2 = manager.createEntity();
                var entity3 = manager.createEntity();
                var entities: ArrayList<Entity> = null;

                entity1.addTag("Enemy").addTag("Boss");
                entity2.addTag("Enemy").addTag("Boss");
                entity3.addTag("Enemy");

                expect(() => entities = manager.findEntitiesByTags(["Enemy", "Boss"])).not.toThrow();
                expect(entities).not.toBeNull();
                expect(entities).not.toBeUndefined();
                expect(entities.count()).toBe(2);
                expect(entities.get(0)).toBe(entity1);
                expect(entities.get(1)).toBe(entity2);
            });

            it("shouldn't find entites by tags that weren't created", () =>
            {
                var manager = new EntityManager();

                var entity1 = manager.createEntity();
                var entity2 = manager.createEntity();
                var entity3 = manager.createEntity();
                var entities: ArrayList<Entity> = null;

                entity1.addTag("Enemy").addTag("Boss");
                entity2.addTag("Enemy");
                entity3.addTag("Player");


                expect(() => entities = manager.findEntitiesByTags(["Player", "Boss"])).not.toThrow();
                expect(entities).not.toBeNull();
                expect(entities).not.toBeUndefined();
                expect(entities.count()).toBe(0);
            });

            it("should throw if tags is null", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByTags(null)).toThrow();
            });

            it("should throw if tags is undefined", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByTags(undefined)).toThrow();
            });

            it("should throw if tags is empty", () =>
            {
                var manager = new EntityManager();
                expect(() => manager.findEntitiesByTags([])).toThrow();
            });
        });
    });
});
