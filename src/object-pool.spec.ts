import { ObjectPool } from "./object-pool";

describe("Object Pool", () =>
{
    var ids: number = 0;

    class MockObject
    {
        public id: number;

        constructor()
        {
        }

        initialize()
        {
            this.id = ++ids;
        }
    }


    class DisposableMockObject extends MockObject
    {
        public disposed: boolean;

        constructor()
        {
            super();
        }

        initialize()
        {
            super.initialize();
            this.disposed = false;
        }

        dispose()
        {
            this.disposed = true;
        }
    }

    describe("construction", () =>
    {
        it("should instantiante a pool", () =>
        {
            var pool = new ObjectPool(MockObject);
            expect(() => pool).not.toBeNull();
            expect(() => pool).not.toBeUndefined();
        });

        it("should instantiante a pool with free elemnts", () =>
            {
                var pool = new ObjectPool(MockObject, 30);

                expect(pool.available()).toBe(30);
                expect(pool.totalSize()).toBe(30);
                expect(pool.empty()).toBeFalsy();;
            });
    });

    describe("operations", () =>
    {
        it("should return a new instance", () =>
        {
            ids = 0;
            var pool = new ObjectPool(MockObject, 10);
            var instance = pool.get();

            expect(instance).not.toBeNull();
            expect(instance).not.toBeUndefined();

            instance.initialize();

            expect(instance.id).toBe(1);
            expect(pool.available()).toBe(9);
            expect(pool.totalSize()).toBe(10);
            expect(pool.empty()).toBeFalsy();
        });

        it("should dispose an instance", () => {
            ids = 0;

            var pool = new ObjectPool(MockObject, 10);

            var instance = pool.get();

            pool.dispose(instance);

            expect(pool.available()).toBe(10);
            expect(pool.totalSize()).toBe(10);
            expect(pool.empty()).toBeFalsy();
        });

        it("should retrieve the same item after disposal", () => {
            ids = 0;

            var pool = new ObjectPool(MockObject, 10);

            var instance = pool.get();
            instance.initialize();

            pool.dispose(instance);
            instance = null;
            instance = pool.get();

            expect(instance.id).toBe(1);
            expect(pool.available()).toBe(9);
            expect(pool.totalSize()).toBe(10);
            expect(pool.empty()).toBeFalsy();
        });

        it("should grow pool if it's empty", () => {
            ids = 0;

            var pool = new ObjectPool(MockObject, 10);

            for(var i = 0; i < 10; i++){
                var instance = pool.get();
                instance.initialize();
            }

            expect(ids).toBe(10);
            expect(pool.available()).toBe(0);
            expect(pool.totalSize()).toBe(10);
            expect(pool.empty()).toBeTruthy();

            var instance = pool.get();

            expect(instance).not.toBeNull();
            expect(instance).not.toBeUndefined();

            instance.initialize();

            expect(instance.id).toBe(11);
            expect(pool.available()).toBe(19);
            expect(pool.totalSize()).toBe(20);
            expect(pool.empty()).toBeFalsy();
        });
    });

});