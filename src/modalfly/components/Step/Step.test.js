import React from 'react';
import renderer from 'react-test-renderer';
import { Step } from './Step';
import { Footer } from '../Footer/Footer';

describe('<Step />', () => {
    it('renders and mounts with no children', () => {
        expect.assertions(1);
        const component = renderer.create(<Step />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders and mounts with children', () => {
        expect.assertions(1);
        const component = renderer.create(
            <Step>
                <h3>Step 1</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate dignissimos beatae, architecto, unde vero provident facilis recusandae laborum quam eligendi. Error at placeat eveniet labore blanditiis beatae, maiores adipisci.</p>
                <Footer>
                    <button type='button'>Next</button>
                </Footer>
            </Step>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});