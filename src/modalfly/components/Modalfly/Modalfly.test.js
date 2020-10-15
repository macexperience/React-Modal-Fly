import React from 'react';
import renderer from 'react-test-renderer';
import { Steps } from '../Steps/Steps';
import { Step } from '../Step/Step';
import { Footer } from '../Footer/Footer';
import { Modalfly } from './Modalfly';

describe('<Modalfly />', () => {
    it('renders an empty modal', () => {
        expect.assertions(1);
        const component = renderer.create(<Modalfly show={true} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders an single view modal', () => {
        expect.assertions(1);
        const component = renderer.create(
            <Modalfly show={true}>
                <div>
                    <h3>Would you like to overwrite?</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <Footer>
                    <button>Close</button>
                    <button>Thanks</button>
                </Footer>
            </Modalfly>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});