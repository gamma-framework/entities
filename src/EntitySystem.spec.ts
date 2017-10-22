import { EntitySystem, getEntitySystemDefinition } from "./EntitySystem";
import { Component } from "./Component";

describe("EntitySystem", () =>
{
    describe("registration", () =>
    {
        it("should decorate a constructor", () =>
        {
            @EntitySystem({ name: "test name" })
            class TestClass
            {
            }
        });

        it("should get the definition of the EntitySystem", () =>
        {
            @Component()
            class Component1 { }

            @Component()
            class Component2 { }

            @EntitySystem({ name: "test name", dependencies: [Component1, Component2] })
            class TestClass { }

            expect(getEntitySystemDefinition(TestClass)).not.toBeNull();
            expect(getEntitySystemDefinition(TestClass)).not.toBeUndefined();
            expect(getEntitySystemDefinition(TestClass).name).toBe("test name");
            expect(getEntitySystemDefinition(TestClass).dependencies.length).toBe(2);
            expect(getEntitySystemDefinition(TestClass).dependencies[0]).toBe(Component1);
            expect(getEntitySystemDefinition(TestClass).dependencies[1]).toBe(Component2);
        });

        it("should get the name of the EntitySystem even if no name was provided", () =>
        {
            @EntitySystem()
            class TestClass { }

            expect(getEntitySystemDefinition(TestClass).name).toBe("TestClass");
        });

        it("should get the constructor of the class if no constructor function was provided", () =>
        {
            @EntitySystem()
            class TestClass { }

            expect(getEntitySystemDefinition(TestClass).constructorFunction).toBe(TestClass);
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

            expect(getEntitySystemDefinition(TestClass).constructorFunction).toBe(TestClass.create);
        });

        it("should fail if decorated twice", () =>
        {
            expect(() =>
            {
                @EntitySystem()
                @EntitySystem()
                class TestClass { }
            }).toThrow();
        });

        it("should fail if decorated with a class that is not a component", () =>
        {
            expect(() =>
            {
                class NonComponentClass
                {

                }

                @EntitySystem({
                    dependencies: [NonComponentClass]
                })
                class TestClass { }
            }).toThrow();
        });

        it("should fail if a null constructor is passed", () => expect(() => EntitySystem()(null)).toThrow());

        it("should fail if an undefined constructor is passed", () => expect(() => EntitySystem()(undefined)).toThrow());
    });
});