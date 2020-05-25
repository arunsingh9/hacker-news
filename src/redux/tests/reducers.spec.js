import React from 'react';
import renderer from 'react-test-renderer';

import Reducer from '../reducers';
import { NEWS_FETCH_SUCCEEDED } from '../actionTypes';

const data = {
	hits: [{ title: 'test news' }],
};

describe('App', () => {
	describe('Reducer', () => {
		it('should set hits and increment pageNumber', () => {
			const state = {
				hits: [],
				pageNumber: 1,
			};
			const newState = Reducer(state, {
				type: NEWS_FETCH_SUCCEEDED,
				payload: data,
			});

			expect(newState).toEqual({ hits: data.hits, pageNumber: 2 });
		});
	});
});
