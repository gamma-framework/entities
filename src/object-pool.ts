import { ObjectExtensions } from "@miracledevs/paradigm-ui-web-shared";

/**
 * Provides a way to reuse object instances wihtut the need of garbage collection,
 * improving perfomance.
 * The pool will automatically grow its own space if the requirements can not be
 * successfully supplied for a specific scenario.
 *
 * > TODO: Add another constructor with a lambda constructor instead of the object
 * > constructor. Investigate how a Injection Container could be integrated here.
 *
 * @export
 * @class ObjectPool
 * @template T
 */
export class ObjectPool<T>
{
    /**
     * Array of available objects to be instantiated.
     *
     * @private
     * @type {Array<T>}
     * @memberof ObjectPool
     */
    private objects: Array<T>;

    /**
     * Current total size of the array.
     * This value will grow each time the pool is emptied.
     *
     * @private
     * @type {number}
     * @memberof ObjectPool
     */
    private arraySize: number;

    /**
     * Creates an instance of ObjectPool.
     * @param {{ new(...args: any[]): T }} objectConstructor Object constructor that will be called when a new object is required.
     * @param {number} [resizeFactor=20] Size of the first pool, and how much should be incremented the next time the pool requires to be resized.
     * @memberof ObjectPool
     */
    constructor(private objectConstructor: { new(...args: any[]): T } | Function, private resizeFactor: number = 20)
    {
        this.objects = new Array<T>();
        this.arraySize = 0;
        this.resizePool();
    }

    /**
     * Gets a new object instance from the pool.
     * NOTE: the constructor will be called over the instance.
     *
     * @returns {T}
     * @memberof ObjectPool
     */
    public get(): T
    {
        if (this.empty())
            this.resizePool();

        var object = this.objects.pop();
        this.objectConstructor.call(object);
        return object;
    }

    /**
     * Disposes an object that is not required any more.
     * The object will be placed in the pool for future use.
     *
     * @param {T} instance
     * @memberof ObjectPool
     */
    public dispose(instance: T): void
    {
        this.objects.push(instance);
    }

    /**
     * Gets the currently available number of objects.
     *
     * @returns {number}
     * @memberof ObjectPool
     */
    public available(): number
    {
        return this.objects.length;
    }

    /**
     * Gets the total size of elements allowed in the pool.
     * This value will grow each time the pool is emptied.
     *
     * @returns {number}
     * @memberof ObjectPool
     */
    public totalSize(): number
    {
        return this.arraySize;
    }

    /**
     * Indicates if the pool is empty.
     *
     * @returns {boolean}
     * @memberof ObjectPool
     */
    public empty(): boolean
    {
        return this.available() === 0;
    }

    /**
     * Resizes the pool to a bigger size, and instantiate objects.
     *
     * @private
     * @memberof ObjectPool
     */
    private resizePool(): void
    {
        // if the array needs resize, implies that the pool wasn't sufficient enough
        // for the object demand, so we grow the pool size by the resize factor.
        // the first pool will be 20 in size, the second 40, and so on.
        this.arraySize += this.resizeFactor;

        for (var i = 0; i < this.arraySize; i++)
        {
            this.objects.push(new (this.objectConstructor as any)());
        }
    }
}