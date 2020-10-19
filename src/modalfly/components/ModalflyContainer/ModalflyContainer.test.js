import React from 'react';
import renderer from 'react-test-renderer';
import { ModalflyContainer } from './ModalflyContainer';

describe('<ModalflyContainer />', () => {
    it('renders and mounts', () => {
        expect.assertions(1);
        const component = renderer.create(<ModalflyContainer />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});