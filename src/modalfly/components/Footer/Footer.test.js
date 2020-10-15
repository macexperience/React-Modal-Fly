import React from 'react';
import renderer from 'react-test-renderer';
import { Footer } from './Footer';

describe('<Footer />', () => {
    it('renders and mounts with no children', () => {
        expect.assertions(1);
        const component = renderer.create(<Footer />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders and mounts with children', () => {
        expect.assertions(1);
        const component = renderer.create(<Footer><button >Test</button></Footer>);
        let tree = component.toJSON();
        expect(tree).toBeNull();
    });
});