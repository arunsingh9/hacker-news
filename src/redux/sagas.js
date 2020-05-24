import { call, put, takeLatest } from 'redux-saga/effects';
import { NEWS_FETCH_REQUESTED, NEWS_FETCH_SUCCEEDED, NEWS_FETCH_FAILED } from './actionTypes';

const callNewsApi = async (pageNumber) => {
	const response = await fetch(`http://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`);
	const news = await response.json();
	return news;
};

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchNews(action) {
	try {
		const { hits } = yield call(callNewsApi, [action.payload.pageNumber]);
		yield put({ type: NEWS_FETCH_SUCCEEDED, payload: { hits } });
	} catch (e) {
		yield put({ type: NEWS_FETCH_FAILED, message: e.message });
	}
}

function* mySaga() {
	yield takeLatest(NEWS_FETCH_REQUESTED, fetchNews);
}

export default mySaga;
