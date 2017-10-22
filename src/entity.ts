import { getComponentName } from "./component";
import { Dictionary, ArrayList, StringExtensions, IEnumerable, ObjectExtensions } from "@miracledevs/paradigm-ui-web-shared";
import { EntityManager } from "./entity-manager";

/**
 * Provides a way to model entities with different subcomponents, allowing
 * modeling by composition instead of inheritance, following the pattern
 * composition over inheritance.
 * WARNING: Do not create instances yourself, first create a @see {EntityManager}
 * and then use the @see {EntityManager.createEntity} method.
 *
 * @export
 * @class Entity
 */
export class Entity
{
    /**
     * Keeps tracks of the all the entities already created
     * to give an unique id for new entities.
     */
    private static identity = 0;

    /**
     * Gets or sets the entity unique id.
     *
     * @protected
     * @type {number}
     * @memberof Entity
     */
    protected entityId: number;

    /**
     * Gets or sets the component dictionary.
     * This dictionary contains all the registered components where:
     * key: name of the component.
     * value: instance of the component class.
     *
     * @protected
     * @type {Dictionary<string, any>}
     * @memberof Entity
     */
    protected components: Dictionary<string, any>;

    /**
     * Gets or sets an array of tags applied to this instance.
     *
     * @protected
     * @type {ArrayList<string>}
     * @memberof Entity
     */
    protected tags: ArrayList<string>;

    /**
     * Gets or sets a reference to the entity manager that created
     * this entity.
     *
     * @protected
     * @type {EntityManager}
     * @memberof Entity
     */
    protected manager: EntityManager;

    /**
     * Gets or sets a value indicating if this entity has been disposed.
     *
     * @protected
     * @type {boolean}
     * @memberof Entity
     */
    protected disposed: boolean;

    /**
     * Gets or sets the entity name.
     * This value is open to be edited by the user.
     * Can be useful to easily find certain entities.
     *
     * @type {string}
     * @memberof Entity
     */
    name: string;

    /**
     * Gets the unique id of this entity.
     *
     * @readonly
     * @type {number}
     * @memberof Entity
     */
    get id(): number { return this.entityId; }

    /**
     * Gets a value indicating if this entity has been disposed.
     *
     * @readonly
     * @type {boolean}
     * @memberof Entity
     */
    get isDisposed(): boolean { return this.disposed; }

    /**
     * Creates an instance of Entity.
     * @memberof Entity
     */
    constructor()
    {
        this.entityId = 0;
        this.manager = null;
        this.name = null;
        this.disposed = false;

        // due to the fact that entites are pooled,
        // a constructor can be called over a previously
        // instantiated entity, and thus the arrays will
        // be already instantiated, so we can clear the
        // content instead of create new instances.
        if (ObjectExtensions.isNull(this.tags))
            this.tags = new ArrayList();
        else
            this.tags.clear();

        if (ObjectExtensions.isNull(this.components))
            this.components = new Dictionary<string, any>();
        else
            this.components.clear();
    }

    /**
     * Initializes an entity and sets the parent manager.
     *
     * @param {EntityManager} manager
     * @returns {Entity}
     * @memberof Entity
     */
    initialize(manager: EntityManager): Entity
    {
        if (ObjectExtensions.isNull(manager))
            throw new Error("Entity Manager can not be null.");

        this.manager = manager;
        this.entityId = Entity.getNewEntityId();

        return this;
    }

    /**
     * Disposes the entity and leve the entity ready for recycle.
     *
     * @memberof Entity
     */
    dispose(): void
    {
        this.manager.disposeEntity(this);
    }

    /**
     * Finishes the entity diposal process.
     * WARNING: this method is not intended to be called by the user,
     * is intended to be called by the manager.
     *
     * @memberof Entity
     */
    finishDispose(): void
    {
        if (ObjectExtensions.isNull(this.manager))
            throw new Error("Entity manager is not set to an instance of an object.");

        this.entityId = 0;
        this.name = null;
        this.tags.clear();

        this.clearComponents();
        this.clearTags();

        this.disposed = true;
    }

    /**
     * Adds a new component to the entity.
     * The component must be decorated with the @see {Component} decorator.
     *
     * @template T
     * @param {({ new(...args: any[]): T } | Function)} component
     * @returns {Entity}
     * @memberof Entity
     */
    addComponent<T>(component: { new(...args: any[]): T } | Function): Entity
    {
        if (ObjectExtensions.isNull(this.manager))
            throw new Error("Entity manager is not set to an instance of an object.");

        var componentName = this.getComponentName(component);

        if (this.components.containsKey(componentName))
            throw new Error(`Component '${componentName}' already found in entity '${this.name || this.id}'.`);

        this.components.add(componentName, this.manager.getNewComponent(component));

        this.manager.updateEntity(this);

        return this;
    }

    /**
     * Removes a component from the entity.
     *
     * @template T
     * @param {({ new(...args: any[]): T } | Function)} component
     * @returns {Entity}
     * @memberof Entity
     */
    removeComponent<T>(component: { new(...args: any[]): T } | Function): Entity
    {
        if (ObjectExtensions.isNull(this.manager))
            throw new Error("Entity manager is not set to an instance of an object.");

        var componentInstance = this.getComponentInstance(component);
        this.components.remove(this.getComponentName(component));

        this.manager.disposeComponent(componentInstance);
        this.manager.updateEntity(this);

        return this;
    }

    /**
     * Removes all the components from the entity.
     *
     * @returns {Entity}
     * @memberof Entity
     */
    clearComponents(): Entity
    {
        if (ObjectExtensions.isNull(this.manager))
            throw new Error("Entity manager is not set to an instance of an object.");

        this.components.forEach(x =>
        {
            this.components.remove(x.key);
            this.manager.disposeComponent(x.value);
        });

        this.manager.updateEntity(this);
        this.components.clear();
        return this;
    }

    /**
     * Indicates if the entity has a given component.
     *
     * @template T
     * @param {({ new(...args: any[]): T } | Function)} component
     * @returns {boolean}
     * @memberof Entity
     */
    hasComponent<T>(component: { new(...args: any[]): T } | Function): boolean
    {
        if (ObjectExtensions.isNull(component))
            throw new Error("The component can not be null.");

        var componentName = this.getComponentName(component);
        return this.components.containsKey(componentName);
    }

    /**
     * Indicates if the entity has all the given components.
     *
     * @template T
     * @param {(({ new(...args: any[]): T } | Function)[])} components
     * @returns {boolean}
     * @memberof Entity
     */
    hasComponents<T>(components: ({ new(...args: any[]): T } | Function)[]): boolean
    {
        if (ObjectExtensions.isNull(components))
            throw new Error("The components array can not be null.");

        if (components.length === 0)
            throw new Error("The components array can not be empty.");

        for (var component of components)
        {
            if (!this.hasComponent(component))
                return false;
        }

        return true;
    }

    /**
     * Gets the instance of a given component.
     *
     * @template T
     * @param {({ new(...args: any[]): T } | Function)} component
     * @returns {boolean}
     * @memberof Entity
     */
    getComponentInstance<T>(component: { new(...args: any[]): T } | Function): boolean
    {
        var componentName = this.getComponentName(component);

        if (!this.components.containsKey(componentName))
            throw new Error(`Component '${componentName}' not found in entity '${this.name || this.id}'.`);

        return this.components.get(componentName);
    }

    /**
     * Gets an array with all the entity components.
     *
     * @returns {string[]}
     * @memberof Entity
     */
    getComponentNames(): string[]
    {
        return this.components.getKeys().getInnerArray().slice();
    }

    /**
     * Adds a new tag to the entity.
     * Tags can help the user to group certain type of entities, and
     * search them easily.
     *
     * @param {string} tag
     * @returns {Entity}
     * @memberof Entity
     */
    addTag(tag: string): Entity
    {
        if (StringExtensions.isNullOrEmpty(tag))
            throw new Error("Tag can not be null or empty.");

        this.tags.add(tag);

        return this;
    }

    removeTag(tag: string): Entity
    {
        if (StringExtensions.isNullOrEmpty(tag))
            throw new Error("Tag can not be null or empty.");

        if (!this.hasTag(tag))
            throw new Error("Can not remove the tag because the entity is not tagged.");

        this.tags.remove(tag);

        return this;
    }

    clearTags(): Entity
    {
        this.tags.clear();
        return this;
    }

    hasTag(tag: string): boolean
    {
        if (ObjectExtensions.isNull(tag))
            throw new Error("Tag can not be null.");

        return this.tags.any(x => x === tag);
    }

    hasTags<T>(tags: string[]): boolean
    {
        if (ObjectExtensions.isNull(tags))
            throw new Error("The tags array can not be null.");

        if (tags.length === 0)
            throw new Error("The tags array can not be empty.");

        for (var tag of tags)
        {
            if (!this.hasTag(tag))
                return false;
        }

        return true;
    }

    getTags(): string[]
    {
        return this.tags.getInnerArray().slice();
    }

    private getComponentName<T>(component: { new(...args: any[]): T } | Function): string
    {
        if (ObjectExtensions.isNull(component))
            throw new Error("Component can not be null.");

        var componentName = getComponentName(component);

        if (ObjectExtensions.isNull(componentName))
            throw new Error("Can not get the component name.");

        return componentName;
    }

    private static getNewEntityId(): number
    {
        return ++this.identity;
    }
}
