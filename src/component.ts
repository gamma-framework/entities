import { ObjectExtensions, FunctionExtensions } from "@miracledevs/paradigm-ui-web-shared";

/**
 * Decorates an object as a component class for the entity management system.
 * If no name is provided, the decorator will use the class name. Take in mind
 * that if you are planning to use some form of code obfuscation like uglify,
 * you must provide a name, because the class name will be changed.
 *
 * @export
 * @param {string} name Component name.
 * @returns {<T>(component: { new(...args: any[]): T }) => void}
 */
export function Component(name?: string): <T>(component: { new(...args: any[]): T }) => void
{
    return <T>(component: { new(...args: any[]): T }): void =>
    {
        if (ObjectExtensions.isNull(component))
            throw new Error("Can not decorate a null or undefined value as a component.");

        if (!ObjectExtensions.isNull(getComponentName(component)))
            throw new Error("Can not decorate a previously decorated component.");

        component[componentNameKey] = name || FunctionExtensions.getFunctionName(component);
    }
}

/**
 * Gets the name of a component decorated with the @Component(name) decorator.
 *
 * @export
 * @template T
 * @param {{ new(...args: any[]): T }} component
 * @returns {string}
 */
export function getComponentName<T>(component: { new(...args: any[]): T } | Function): string
{
    if (ObjectExtensions.isNull(component) || ObjectExtensions.isNull(component[componentNameKey]))
        return null;

    return component[componentNameKey];
}

/**
 * Private key used to register and store the component name inside the component constructor.
 */
const componentNameKey: string = "$component";
