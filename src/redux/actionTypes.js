export const NEWS_FETCH_SUCCEEDED = 'NEWS_FETCH_SUCCEEDED';
export const NEWS_FETCH_FAILED = 'NEWS_FETCH_FAILED';
export const NEWS_FETCH_REQUESTED = 'NEWS_FETCH_REQUESTED';

export const fetchNews = (pageNumber) => ({
	type: NEWS_FETCH_REQUESTED,
	payload: { pageNumber },
});
