import * as helpers from './helpers';

describe('helpers', () => {
    describe('isFunction()', () => {
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

    describe('getContainerStyle()', () => {
        it(`returns default styles when no size prop is provided`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getContainerStyle({});
            expect(stylesObj.width).toEqual('500px');
        });
        it(`returns styles object for 'small' size prop`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getContainerStyle({size: 'small'});
            expect(stylesObj.width).toEqual('300px');
        });
        it(`returns styles object for 'medium' size prop`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getContainerStyle({size: 'medium'});
            expect(stylesObj.width).toEqual('500px');
        });
        it(`returns styles object for 'large' size prop`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getContainerStyle({size: 'large'});
            expect(stylesObj.width).toEqual('800px');
        });
        it(`returns styles object for 'large' size prop`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getContainerStyle({size: 'extraLarge'});
            expect(stylesObj.width).toEqual('1140px');
        });
    });

    describe('getFooterStyle()', () => {
        it(`returns default styles when no footerContent prop is provided`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getFooterStyle({});
            expect(stylesObj.justifyContent).toEqual('flex-end');
        });
        it(`returns styles object for 'left' footerContent prop`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getFooterStyle({footerContent: 'left'});
            expect(stylesObj.justifyContent).toEqual('flex-start');
        });
        it(`returns styles object for 'center' footerContent prop`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getFooterStyle({footerContent: 'center'});
            expect(stylesObj.justifyContent).toEqual('center');
        });
        it(`returns styles object for 'right' footerContent prop`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getFooterStyle({footerContent: 'right'});
            expect(stylesObj.justifyContent).toEqual('flex-end');
        });
        it(`returns styles object for 'spaceBetween' footerContent prop`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getFooterStyle({footerContent: 'spaceBetween'});
            expect(stylesObj.justifyContent).toEqual('space-between');
        });
        it(`returns styles object for 'spaceAround' footerContent prop`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getFooterStyle({footerContent: 'spaceAround'});
            expect(stylesObj.justifyContent).toEqual('space-around');
        });
        it(`returns styles object for 'spaceEvenly' footerContent prop`, () => {
            expect.assertions(1);
            const stylesObj = helpers.getFooterStyle({footerContent: 'spaceEvenly'});
            expect(stylesObj.justifyContent).toEqual('space-evenly'); 
        });
    });
});
