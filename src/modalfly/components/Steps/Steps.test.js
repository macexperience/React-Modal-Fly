import React from 'react';
import renderer from 'react-test-renderer';
import { Steps } from './Steps';
import { Step } from '../Step/Step';
import { Footer } from '../Footer/Footer';
import { Modalfly } from '../Modalfly/Modalfly';

describe('<Steps />', () => {
    it('returns null with no Step children', () => {
        expect.assertions(1);
        const component = renderer.create(<Steps />);
        const tree = component.toJSON();
        expect(tree).toBeNull();
    });

    it('renders an error h3 when only one step is provided', () => {
        expect.assertions(2);
        const component = renderer.create(
            <Modalfly workflow show={true}>
                <Steps>
                    <Step title='First Step'>
                        <h3>Step 1</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate dignissimos beatae, architecto, unde vero provident facilis recusandae laborum quam eligendi. Error at placeat eveniet labore blanditiis beatae, maiores adipisci.</p>
                        <Footer>
                            <button type='button'>Next</button>
                        </Footer>
                    </Step>
                </Steps>
            </Modalfly>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.type).toEqual('h3');
    });

    it('renders and mounts with all children', () => {
        expect.assertions(1);
        const component = renderer.create(
            <Modalfly workflow show={true}>
                <Steps>
                    <Step title='First Step'>
                        <h3>Step 1</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate dignissimos beatae, architecto, unde vero provident facilis recusandae laborum quam eligendi. Error at placeat eveniet labore blanditiis beatae, maiores adipisci.</p>
                        <Footer>
                            <button type='button'>Next</button>
                        </Footer>
                    </Step>
                    <Step title='Second Step'>
                        <h3>Step 2</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate dignissimos beatae, architecto, unde vero provident facilis recusandae laborum quam eligendi. Error at placeat eveniet labore blanditiis beatae, maiores adipisci.</p>
                        <Footer>
                            <button type='button'>Next</button>
                        </Footer>
                    </Step>
                </Steps>
            </Modalfly>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it(`handles 'next' function being called`, () => {
        expect.assertions(1);
        let component;
        renderer.act(() => {
            component = renderer.create(
                <Modalfly workflow show={true}>
                    <Steps>
                        <Step title='First Step'>
                            <h3>Step 1</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate dignissimos beatae, architecto, unde vero provident facilis recusandae laborum quam eligendi. Error at placeat eveniet labore blanditiis beatae, maiores adipisci.</p>
                            <Footer>
                                <button type='button'>Next</button>
                            </Footer>
                        </Step>
                        <Step title='Second Step'>
                            <h3>Step 2</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate dignissimos beatae, architecto, unde vero provident facilis recusandae laborum quam eligendi. Error at placeat eveniet labore blanditiis beatae, maiores adipisci.</p>
                            <Footer>
                                <button type='button'>Next</button>
                            </Footer>
                        </Step>
                    </Steps>
                </Modalfly>
            );
        });
        //Convert to tree
        const tree = component.toTree();
        //Create the spy
        const spy = jest.spyOn(tree.rendered.rendered.rendered[1].rendered[0].type, 'next');
        //Update the component
        renderer.act(() => {
            tree.rendered.rendered.rendered[1].rendered[0].type.next({});
        });

        expect(spy).toHaveBeenCalled();
    });

    it(`handles 'previous' function being called`, () => {
        expect.assertions(1);
        let component;
        renderer.act(() => {
            component = renderer.create(
                <Modalfly workflow show={true}>
                    <Steps>
                        <Step title='First Step'>
                            <h3>Step 1</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate dignissimos beatae, architecto, unde vero provident facilis recusandae laborum quam eligendi. Error at placeat eveniet labore blanditiis beatae, maiores adipisci.</p>
                            <Footer>
                                <button type='button'>Next</button>
                            </Footer>
                        </Step>
                        <Step title='Second Step'>
                            <h3>Step 2</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate dignissimos beatae, architecto, unde vero provident facilis recusandae laborum quam eligendi. Error at placeat eveniet labore blanditiis beatae, maiores adipisci.</p>
                            <Footer>
                                <button type='button'>Next</button>
                            </Footer>
                        </Step>
                    </Steps>
                </Modalfly>
            );
        });
        //Convert to tree
        const tree = component.toTree();
        //Create the spy
        const spy = jest.spyOn(tree.rendered.rendered.rendered[1].rendered[0].type, 'previous');
        //Update the component
        renderer.act(() => {
            tree.rendered.rendered.rendered[1].rendered[0].type.previous({});
        });
        
        expect(spy).toHaveBeenCalled();
    });
});