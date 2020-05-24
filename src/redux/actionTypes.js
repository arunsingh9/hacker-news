export const NEWS_FETCH_SUCCEEDED = 'NEWS_FETCH_SUCCEEDED';
export const NEWS_FETCH_FAILED = 'NEWS_FETCH_FAILED';
export const NEWS_FETCH_REQUESTED = 'NEWS_FETCH_REQUESTED';
export const INCREMENT_UPVOTE = 'INCREMENT_UPVOTE';
export const UPVOTE_UPDATE_SUCCESS = 'UPVOTE_UPDATE_SUCCESS';

export const fetchNews = (pageNumber) => ({
	type: NEWS_FETCH_REQUESTED,
	payload: { pageNumber },
});

export const incrementUpvote = (upvoteInfo) => ({
	type: INCREMENT_UPVOTE,
	payload: { upvoteInfo },
});
