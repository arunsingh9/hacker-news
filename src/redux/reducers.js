import { NEWS_FETCH_REQUESTED, NEWS_FETCH_SUCCEEDED, NEWS_FETCH_FAILED } from './actionTypes';

const initialState = {
	hits: [],
	pageNumber: 1,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case NEWS_FETCH_SUCCEEDED: {
			const { hits } = action.payload;
			return {
				...state,
				hits: [...state.hits, ...hits],
				pageNumber: state.pageNumber + 1,
			};
		}
		case NEWS_FETCH_FAILED: {
			console.log(action);
			return state;
		}
		default:
			return state;
	}
}
