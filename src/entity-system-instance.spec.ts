import { EntitySystem, IEntitySystem } from "./entity-system";
import { Component } from "./component";
import { TimeSpan } from "@miracledevs/paradigm-ui-web-shared";
import { Entity } from "./entity";
import { EntitySystemInstance } from "./entity-system-instance";
import { EntityManager } from "./entity-manager";

describe("Entity System Instance", () =>
{
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
        public initialized: boolean;

        public entityHasBeenAdded: boolean;

        public entityHasBeenRemoved: boolean;

        public beforeUpdated: boolean;

        public updated: boolean;

        public afterUpdated: boolean;

        public disposed: boolean;

        constructor()
        {
            this.initialized = false;
            this.entityHasBeenAdded = false;
            this.entityHasBeenRemoved = false;
            this.beforeUpdated = false;
            this.updated = false;
            this.afterUpdated = false;
            this.disposed = false;
        }

        initialize(): void
        {
            this.initialized = true;
        }

        entityAdded(entity: Entity): void
        {
            expect(entity).not.toBeNull();
            expect(entity).not.toBeUndefined();
            expect(entity.constructor).toBe(Entity);

            this.entityHasBeenAdded = true;
        }

        entityRemoved(entity: Entity): void
        {
            expect(entity).not.toBeNull();
            expect(entity).not.toBeUndefined();
            expect(entity.constructor).toBe(Entity);

            this.entityHasBeenRemoved = true;
        }

        beforeUpdate(): void
        {
            this.beforeUpdated = true;
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

        afterUpdate(): void
        {
            this.afterUpdated = true;
        }

        dispose(): void
        {
            this.disposed = true;
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

    describe("constructor", () =>
    {
        it("should create a new entity system instance", () =>
        {
            var instance: EntitySystemInstance = null;
            expect(() => instance = new EntitySystemInstance(FirstEntitySystem)).not.toThrow();

            expect(instance).not.toBeNull();
            expect(instance).not.toBeUndefined();

            expect(instance.getComponents().length).toBe(2);
            expect(instance.getComponents()[0]).toBe(FirstComponentClass);
            expect(instance.getComponents()[1]).toBe(SecondComponentClass);

            expect(instance.getDefinition()).not.toBeNull();
            expect(instance.getDefinition()).not.toBeUndefined();

            expect(instance.getInstance()).not.toBeNull();
            expect(instance.getInstance()).not.toBeUndefined();

            expect((instance.getInstance() as FirstEntitySystem).initialized).toBeTruthy();
        });

        it("shouldn't create an entity system instance with a null system", () =>
        {
            expect(() => new EntitySystemInstance(null)).toThrow();
        });

        it("shouldn't create an entity system instance with an undefined system", () =>
        {
            expect(() => new EntitySystemInstance(undefined)).toThrow();
        });

        it("shouldn't create an entity system instance with non system constructor", () =>
        {
            expect(() => new EntitySystemInstance(NonEntitySystem)).toThrow();
        });

        it("should get the constructor of the class if no constructor function was provided", () =>
        {
            @EntitySystem()
            class TestClass { }

            var instance = new EntitySystemInstance(TestClass);
            expect(instance.getInstance().constructor).toBe(TestClass);
        });

        it("should be able to provide a custom constructor function", () =>
        {
            @EntitySystem({
                constructorFunction: TestClass.create
            })
            class TestClass
            {
                static create()
                {
                    return new TestClass();
                }
            }

            var instance = new EntitySystemInstance(TestClass);
            expect(instance.getInstance().constructor).toBe(TestClass);
        });
    });

    describe("add entities", () =>
    {
        it("should add entities", () =>
        {
            var manager = new EntityManager();
            var entity = manager.createEntity();
            var instance = new EntitySystemInstance(FirstEntitySystem);

            expect(() => instance.add(entity)).not.toThrow();
            expect(instance.hasEntity(entity)).toBeTruthy();
            expect((instance.getInstance() as FirstEntitySystem).entityHasBeenAdded).toBeTruthy();
        });

        it("should fail when adding null entities", () =>
        {
            var manager = new EntityManager();
            var entity = manager.createEntity();
            var instance = new EntitySystemInstance(FirstEntitySystem);

            expect(() => instance.add(null)).toThrow();
        });

        it("should fail when adding undefined entities", () =>
        {
            var manager = new EntityManager();
            var entity = manager.createEntity();
            var instance = new EntitySystemInstance(FirstEntitySystem);

            expect(() => instance.add(undefined)).toThrow();
        });

        it("should fail when adding disposed entities", () =>
        {
            var manager = new EntityManager();
            var entity = manager.createEntity();
            var instance = new EntitySystemInstance(FirstEntitySystem);

            manager.disposeEntity(entity);

            expect(() => instance.add(entity)).toThrow();
        });
    });

    describe("remove entities", () =>
    {
        it("should remove entities", () =>
        {
            var manager = new EntityManager();
            var entity = manager.createEntity();
            var instance = new EntitySystemInstance(FirstEntitySystem);
            instance.add(entity);

            expect(() => instance.remove(entity)).not.toThrow();
            expect(instance.hasEntity(entity)).toBeFalsy();
            expect((instance.getInstance() as FirstEntitySystem).entityHasBeenRemoved).toBeTruthy();
        });

        it("should fail when removing null entities", () =>
        {
            var instance = new EntitySystemInstance(FirstEntitySystem);
            expect(() => instance.remove(null)).toThrow();
        });

        it("should fail when removing undefined entities", () =>
        {
            var instance = new EntitySystemInstance(FirstEntitySystem);
            expect(() => instance.remove(undefined)).toThrow();
        });

        it("should fail when removing entities that were not added before", () =>
        {
            var manager = new EntityManager();
            var entity = manager.createEntity();
            var instance = new EntitySystemInstance(FirstEntitySystem);

            expect(() => instance.remove(entity)).toThrow();
        });
    });

    describe("has entities", () =>
    {
        it("should tell if entities were added", () =>
        {
            var manager = new EntityManager();
            var entity = manager.createEntity();
            var instance = new EntitySystemInstance(FirstEntitySystem);
            instance.add(entity);

            expect(() => instance.hasEntity(entity)).not.toThrow();
            expect(instance.hasEntity(entity)).toBeTruthy();
        });

        it("should tell if entities were not added", () =>
        {
            var manager = new EntityManager();
            var entity = manager.createEntity();
            var instance = new EntitySystemInstance(FirstEntitySystem);

            expect(() => instance.hasEntity(entity)).not.toThrow();
            expect(instance.hasEntity(entity)).toBeFalsy();
        });

        it("should fail when checking if a null entity was added", () =>
        {
            var instance = new EntitySystemInstance(FirstEntitySystem);
            expect(() => instance.hasEntity(null)).toThrow();
        });

        it("should fail when checking if an undefined entity was added", () =>
        {
            var instance = new EntitySystemInstance(FirstEntitySystem);
            expect(() => instance.hasEntity(undefined)).toThrow();
        });
    });

    describe("dispose", () =>
    {
        it("should be able to dispose", () =>
        {
            var instance = new EntitySystemInstance(FirstEntitySystem);

            expect(() => instance.dispose()).not.toThrow();
            expect((instance.getInstance() as FirstEntitySystem).disposed).toBeTruthy();
        });

        it("should be disposed when unregistered from a manager", () =>
        {
            var manager = new EntityManager();

            manager.registerSystem(FirstEntitySystem);
            var instance = manager.getEntitySystemInstance(FirstEntitySystem);
            manager.unregisterSystem(FirstEntitySystem);

            expect((instance.getInstance() as FirstEntitySystem).disposed).toBeTruthy();
        });
    });
});