import * as helpers from './helpers';

describe('helpers', () => {
    describe('isFunction', () => {
        it('returns true when a value is a function', () => {
            expect.assertions(1);
            //Define a function
            function foo() { }
            const isAFunction = helpers.isFunction(foo);
            expect(isAFunction).toEqual(true);
        });
        it('returns false when a value is not a function', () => {
            expect.assertions(8);
            const value1 = 'hello world';
            expect(helpers.isFunction(value1)).toEqual(false);

            const value2 = 12;
            expect(helpers.isFunction(value2)).toEqual(false);

            const value3 = { a: 'hello world' };
            expect(helpers.isFunction(value3)).toEqual(false);

            const value4 = [1, 2, 3];
            expect(helpers.isFunction(value4)).toEqual(false);

            const value5 = null;
            expect(helpers.isFunction(value5)).toEqual(false);

            const value6 = false;
            expect(helpers.isFunction(value6)).toEqual(false);

            const value7 = true;
            expect(helpers.isFunction(value7)).toEqual(false);

            const value8 = undefined;
            expect(helpers.isFunction(value8)).toEqual(false);
        });
    });
});
