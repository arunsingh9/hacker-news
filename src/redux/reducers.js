import {
	NEWS_FETCH_REQUESTED,
	NEWS_FETCH_SUCCEEDED,
	NEWS_FETCH_FAILED,
	UPVOTE_UPDATE_SUCCESS,
	FETCH_UPVOTE_SUCCESS,
} from './actionTypes';

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
			return state;
		}
		case UPVOTE_UPDATE_SUCCESS: {
			const { upvoteInfo } = action.payload;
			const newHits = state.hits.map((hit) => {
				if (hit.objectID === upvoteInfo.objectID) {
					hit = upvoteInfo;
				}
				return hit;
			});
			return {
				...state,
				hits: [...newHits],
			};
		}
		case FETCH_UPVOTE_SUCCESS: {
			let data = {};
			for (let i = 0; i < action.payload.length; i++) {
				data[action.payload[i].id] = action.payload[i].points;
			}
			const newHits = state.hits.map((hit) => {
				if (data[hit.objectID]) {
					hit.points = data[hit.objectID];
				}
				return hit;
			});
			return {
				...state,
				hits: [...newHits],
			};
		}
		default:
			return state;
	}
}
