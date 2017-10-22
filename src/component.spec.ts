import { Component, getComponentName } from "./component";

describe("Component", () =>
{
    describe("registration", () =>
    {
        it("should decorate a constructor", () =>
        {
            @Component("test name")
            class TestClass
            {
            }
        });

        it("should get the name of the component", () =>
        {
            @Component("test name")
            class TestClass {}

            expect(getComponentName(TestClass)).toBe("test name");
        });

        it("should get the name of the component even if no name was provided", () =>
        {
            @Component()
            class TestClass {}

            expect(getComponentName(TestClass)).toBe("TestClass");
        });

        it("should fail if decorated twice", () =>
        {
            expect(() => {
            @Component()
            @Component()
            class TestClass {}
            }).toThrow();
        });

        it("should fail if a null constructor is passed", () => expect(() => Component("name")(null)).toThrow());

        it("should fail if an undefined constructor is passed", () => expect(() => Component("name")(undefined)).toThrow());
    });
});
