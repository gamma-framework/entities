import { EntityManager } from "./entity-manager";
import { Entity } from "./entity";
import { Component, getComponentName } from "./component";

@Component("fistComponent")
class FirstComponentClass
{
}

@Component("secondComponent")
class SecondComponentClass
{
}

@Component("thirdComponent")
class ThirdComponentClass
{
}

class NonComponentClass
{
}

describe("Entity", () =>
{
    describe("Constructor", () =>
    {
        it("should create a new instance of entity with the new operator", () =>
        {
            var entity = new Entity();

            expect(entity).not.toBeNull();
            expect(entity).not.toBeUndefined();
            expect(entity.isDisposed).toBeFalsy();
            expect(entity.id).toBe(0);
            expect(entity.name).toBeNull();
            expect(entity.getTags()).not.toBeNull();
            expect(entity.getComponentNames()).not.toBeNull();
            expect(entity.getTags().length).toBe(0);
            expect(entity.getComponentNames().length).toBe(0);
        });
    });

    describe("initialize", () =>
    {
        it("should initialize", () =>
        {
            var entity = new Entity();
            expect(() => entity.initialize(new EntityManager())).not.toThrow();
            expect(entity.id).not.toBe(0);
        });

        it("shouldn't initialize with a null manager", () =>
        {
            var entity = new Entity();
            expect(() => entity.initialize(null)).toThrow();
        });

        it("shouldn't initialize with an undefined manager", () =>
        {
            var entity = new Entity();
            expect(() => entity.initialize(undefined)).toThrow();
        });
    });

    describe("dispose", () =>
    {
        it("should dispose", () =>
        {
            var entity = new EntityManager().createEntity();
            expect(() => entity.dispose()).not.toThrow();
            expect(entity.isDisposed).toBeTruthy();
            expect(entity.id).toBe(0);
            expect(entity.name).toBeNull();
            expect(entity.getTags()).not.toBeNull();
            expect(entity.getComponentNames()).not.toBeNull();
            expect(entity.getTags().length).toBe(0);
            expect(entity.getComponentNames().length).toBe(0);
        });

        it("should dispose components", () =>
        {
            var entity = new EntityManager().createEntity();

            entity.addComponent(FirstComponentClass)
                .addComponent(SecondComponentClass);

            expect(() => entity.dispose()).not.toThrow();
            expect(entity.isDisposed).toBeTruthy();
            expect(entity.id).toBe(0);
            expect(entity.name).toBeNull();
            expect(entity.getTags()).not.toBeNull();
            expect(entity.getComponentNames()).not.toBeNull();
            expect(entity.getTags().length).toBe(0);
            expect(entity.getComponentNames().length).toBe(0);
        });

        it("shouldn't dispose if the manager is null", () =>
        {
            var entity = new Entity();
            expect(() => entity.dispose()).toThrow();
        });

        it("shouldn't let to dispose twice", () =>
        {
            var entity = new EntityManager().createEntity();
            expect(() => entity.dispose()).not.toThrow();
            expect(() => entity.dispose()).toThrow();
        });

        it("shouldn't finish dispose without a manager", () =>
        {
            var entity = new Entity();
            expect(() => entity.finishDispose()).toThrow();
        });
    });

    describe("components", () =>
    {
        describe("add components", () =>
        {
            it("should add components", () =>
            {
                var entity = new EntityManager().createEntity();

                expect(() => entity.addComponent(FirstComponentClass)).not.toThrow();
                expect(entity.getComponentNames().length).toBe(1);
                expect(entity.hasComponent(FirstComponentClass)).toBeTruthy();
                expect(entity.getComponentInstance(FirstComponentClass)).not.toBeNull();
                expect(entity.getComponentInstance(FirstComponentClass)).not.toBeUndefined();
            });

            it("shouldn't add components without an entity manager set", () =>
            {
                var entity = new Entity();
                expect(() => entity.addComponent(FirstComponentClass)).toThrow();
            });

            it("shouldn't add a duplicate component.", () =>
            {
                var entity = new EntityManager().createEntity();

                expect(() => entity.addComponent(FirstComponentClass)).not.toThrow();
                expect(() => entity.addComponent(FirstComponentClass)).toThrow();
            });

            it("shouldn't add a class that is not a component.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.addComponent(NonComponentClass)).toThrow();
            });

            it("shouldn't add a null component.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.addComponent(null)).toThrow();
            });

            it("shouldn't add an undefined component.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.addComponent(undefined)).toThrow();
            });

        });

        describe("remove components", () =>
        {
            it("should remove components", () =>
            {
                var entity = new EntityManager().createEntity();

                expect(() => entity.addComponent(FirstComponentClass)).not.toThrow();
                expect(() => entity.removeComponent(FirstComponentClass)).not.toThrow();

                expect(entity.getComponentNames().length).toBe(0);
                expect(entity.hasComponent(FirstComponentClass)).toBeFalsy();
                expect(() => entity.getComponentInstance(FirstComponentClass)).toThrow();
            });

            it("shouldn't remove components without an entity manager set", () =>
            {
                var entity = new Entity();
                expect(() => entity.removeComponent(FirstComponentClass)).toThrow();
            });

            it("shouldn't remove a component that wasn't added.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.removeComponent(FirstComponentClass)).toThrow();
            });

            it("shouldn't remove a class that is not a component.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.removeComponent(NonComponentClass)).toThrow();
            });

            it("shouldn't remove a null component.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.removeComponent(null)).toThrow();
            });

            it("shouldn't remove an undefined component.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.removeComponent(undefined)).toThrow();
            });
        });

        describe("clear components", () =>
        {
            it("should clear all components", () => {
                var entity = new EntityManager().createEntity();

                entity.addComponent(FirstComponentClass)
                      .addComponent(SecondComponentClass);

                expect(() => entity.clearComponents()).not.toThrow();
                expect(entity.getComponentNames().length).toBe(0);
            });

            it("should clear even if it's empty", () => {
                var entity = new EntityManager().createEntity();

                expect(() => entity.clearComponents()).not.toThrow();
                expect(entity.getComponentNames().length).toBe(0);
            });

            it("should fail if clear without a manager", () => {
                var entity = new Entity();
                expect(() => entity.clearComponents()).toThrow();
            });
        });

        describe("has component", () =>
        {
            it("should indicate if an entity has a component", () =>
            {
                var entity = new EntityManager().createEntity();
                entity.addComponent(FirstComponentClass);
                expect(entity.hasComponent(FirstComponentClass)).toBeTruthy();
            });

            it("should indicate if an entity hasn't a component", () =>
            {
                var entity = new EntityManager().createEntity();
                entity.addComponent(FirstComponentClass);
                expect(entity.hasComponent(SecondComponentClass)).toBeFalsy();
            });

            it("should throw exception is the component is null", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.hasComponent(null)).toThrow();
            });

            it("should throw exception is the component is undefined", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.hasComponent(undefined)).toThrow();
            });

            it("should throw exception if it's not a component", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.hasComponent(NonComponentClass)).toThrow();
            });
        });

        describe("has components", () =>
        {
            it("should indicate if an entity has all the components", () =>
            {
                var entity = new EntityManager().createEntity();

                entity.addComponent(FirstComponentClass);
                entity.addComponent(SecondComponentClass);

                expect(entity.hasComponents([FirstComponentClass, SecondComponentClass])).toBeTruthy();
            });

            it("should indicate if an entity hasn't at last one component", () =>
            {
                var entity = new EntityManager().createEntity();

                entity.addComponent(FirstComponentClass);
                entity.addComponent(SecondComponentClass);

                expect(entity.hasComponents([SecondComponentClass, ThirdComponentClass])).toBeFalsy();
            });

            it("should throw exception is the components array is null", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.hasComponents(null)).toThrow();
            });

            it("should throw exception is the components array is undefined", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.hasComponents(undefined)).toThrow();
            });

            it("should throw exception is the components array is empty", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.hasComponents([])).toThrow();
            });

            it("should throw exception if at least one of the items it's not a component", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.hasComponents([NonComponentClass])).toThrow();
            });
        });

        describe("get component instance", () =>
        {
            it("should get component instance", () =>
            {
                var entity = new EntityManager().createEntity();
                entity.addComponent(FirstComponentClass);
                var instance = entity.getComponentInstance(FirstComponentClass);
                expect(instance).not.toBeNull();
                expect(instance).not.toBeUndefined();
            });

            it("should throw if entity does not have a component", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.getComponentInstance(SecondComponentClass)).toThrow();
            });

            it("should throw if component is null", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.getComponentInstance(null)).toThrow();
            });

            it("should throw if component is undefined", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.getComponentInstance(undefined)).toThrow();
            });
        });

        describe("get component names", () =>
        {
            it("should retrieve all the component names", () =>
            {
                var entity = new EntityManager().createEntity();

                entity.addComponent(FirstComponentClass)
                    .addComponent(SecondComponentClass);

                var componentNames = entity.getComponentNames();
                expect(componentNames.length).toBe(2);
                expect(componentNames[0]).toBe(getComponentName(FirstComponentClass));
                expect(componentNames[1]).toBe(getComponentName(SecondComponentClass));
            });

            it("should be immutable", () =>
            {
                var entity = new EntityManager().createEntity();

                entity.addComponent(FirstComponentClass)
                    .addComponent(SecondComponentClass);

                var componentNames = entity.getComponentNames();
                componentNames.pop();
                componentNames.pop();
                componentNames = entity.getComponentNames();

                expect(componentNames.length).toBe(2);
                expect(componentNames[0]).toBe(getComponentName(FirstComponentClass));
                expect(componentNames[1]).toBe(getComponentName(SecondComponentClass));
            });

            it("should be empty if no components were added", () =>
            {
                var entity = new EntityManager().createEntity();
                var componentNames = entity.getComponentNames();

                expect(componentNames).not.toBeNull();
                expect(componentNames).not.toBeUndefined();
                expect(componentNames.length).toBe(0);
            });
        });
    });

    describe("tags", () =>
    {
        describe("add tags", () =>
        {
            it("should add tags", () =>
            {
                var entity = new EntityManager().createEntity();

                expect(() => entity.addTag("tag1")).not.toThrow();
                expect(entity.getTags().length).toBe(1);
                expect(entity.hasTag("tag1")).toBeTruthy();
            });

            it("shouldn't add null tags", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.addTag(null)).toThrow();
            });

            it("shouldn't add undefined tags", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.addTag(undefined)).toThrow();
            });

            it("shouldn't add empty tags", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.addTag("")).toThrow();
            });
        });

        describe("remove tags", () =>
        {
            it("should remove tags", () =>
            {
                var entity = new EntityManager().createEntity();
                entity.addTag("tag1");
                expect(() => entity.removeTag("tag1")).not.toThrow();
                expect(entity.getTags().length).toBe(0);
                expect(entity.hasTag("tag1")).toBeFalsy();
            });

            it("shouldn't remove tags that aren't there in the first place", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.removeTag("some tag")).toThrow();
            });

            it("shouldn't remove null tags", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.removeTag(null)).toThrow();
            });

            it("shouldn't remove undefined tags", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.removeTag(undefined)).toThrow();
            });

            it("shouldn't remove empty tags", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.removeTag("")).toThrow();
            });
        });

        describe("clear tags", () =>
        {
            it("should clear all tags", () => {
                var entity = new EntityManager().createEntity();

                entity.addTag("tag 1")
                      .addTag("tag 2");

                expect(() => entity.clearTags()).not.toThrow();
                expect(entity.getTags().length).toBe(0);
            });

            it("should clear even if it's empty", () => {
                var entity = new EntityManager().createEntity();

                expect(() => entity.clearTags()).not.toThrow();
                expect(entity.getTags().length).toBe(0);
            });
        });

        describe("has tag", () =>
        {
            it("should indicate if an entity is tagged", () =>
            {
                var entity = new EntityManager().createEntity();
                entity.addTag("tag1");
                expect(entity.hasTag("tag1")).toBeTruthy();
            });

            it("should indicate if an entity is not tagged", () =>
            {
                var entity = new EntityManager().createEntity();
                entity.addTag("tag1");
                expect(entity.hasTag("tag2")).toBeFalsy();
            });

            it("shouldn't allow to indicate that an entity is tagged with null tag.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(()=> entity.hasTag(null)).toThrow();
            });

            it("shouldn't allow to indicate that an entity is tagged with undefined.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.hasTag(undefined)).toThrow();
            });
        });

        describe("has tags", () =>
        {
            it("should indicate if an entity is tagged by more than one tag", () =>
            {
                var entity = new EntityManager().createEntity();

                entity.addTag("tag1");
                entity.addTag("tag2");
                entity.addTag("tag3");

                expect(entity.hasTags(["tag1", "tag2", "tag3"])).toBeTruthy();
            });

            it("should indicate if an entity is not tagged by at least one tag", () =>
            {
                var entity = new EntityManager().createEntity();

                entity.addTag("tag1");
                entity.addTag("tag2");
                entity.addTag("tag3");

                expect(entity.hasTags(["tag1", "tag2", "tag4"])).toBeFalsy();
            });

            it("shouldn't allow to indicate that an entity is tagged with null array of tags.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(()=> entity.hasTags(null)).toThrow();
            });

            it("shouldn't allow to indicate that an entity is tagged with undefined array of tags.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.hasTags(undefined)).toThrow();
            });

            it("shouldn't allow to indicate that an entity is tagged with an empty array of tags.", () =>
            {
                var entity = new EntityManager().createEntity();
                expect(() => entity.hasTags([])).toThrow();
            });
        });

        describe("get tags", () =>
        {
            it("should retrieve all the tags", () =>
            {
                var entity = new EntityManager().createEntity();

                entity.addTag("tag1")
                    .addTag("tag2")
                    .addTag("tag3");

                var tags = entity.getTags();
                expect(tags.length).toBe(3);
                expect(tags[0]).toBe("tag1");
                expect(tags[1]).toBe("tag2");
                expect(tags[2]).toBe("tag3");
            });

            it("should be immutable", () =>
            {
                var entity = new EntityManager().createEntity();

                entity.addTag("tag1")
                    .addTag("tag2")
                    .addTag("tag3");

                var tags = entity.getTags();
                tags.pop();
                tags.pop();
                tags.pop();
                tags = entity.getTags();

                expect(tags.length).toBe(3);
                expect(tags[0]).toBe("tag1");
                expect(tags[1]).toBe("tag2");
                expect(tags[2]).toBe("tag3");
            });

            it("should be empty if no tags were added", () =>
            {
                var entity = new EntityManager().createEntity();
                var tags = entity.getTags();

                expect(tags).not.toBeNull();
                expect(tags).not.toBeUndefined();
                expect(tags.length).toBe(0);
            });
        });
    });
});