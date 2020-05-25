import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Header, SkipLinkElement } from '../Header';

describe('Header Component', () => {
	test('snapshot renders', () => {
		const component = renderer.create(<Header />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('renders SkipLink ', () => {
		const wrapper = mount(<Header />);
		expect(wrapper.find(SkipLinkElement).length).toEqual(1);
	});
});
