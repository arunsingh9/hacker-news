import { call, put, takeLatest } from 'redux-saga/effects';
import {
	NEWS_FETCH_REQUESTED,
	NEWS_FETCH_SUCCEEDED,
	NEWS_FETCH_FAILED,
	INCREMENT_UPVOTE,
	UPVOTE_UPDATE_SUCCESS,
	FETCH_UPVOTE,
	FETCH_UPVOTE_SUCCESS,
} from './actionTypes';

import db from '../db.js';

const callNewsApi = async (pageNumber) => {
	const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`);
	const news = await response.json();
	return news;
};

const addOrUpdateUpvote = async (payload) => {
	await db.open();
	let { upvoteInfo } = payload[0];
	const exists = db.news.get(upvoteInfo.objectID);
	if (exists) {
		await db.news.put({ id: upvoteInfo.objectID, points: upvoteInfo.points });
	} else {
		await db.news.add({ id: upvoteInfo.objectID, points: upvoteInfo.points });
	}
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

function* incrementUpvote(action) {
	try {
		//call an update api and get updated object
		yield call(addOrUpdateUpvote, [action.payload]);
		yield put({ type: UPVOTE_UPDATE_SUCCESS, payload: action.payload });
	} catch (e) {
		console.log(e);
		//trigger update fail
	}
}

function* fetchUpvote(action) {
	try {
		yield db.open();
		const upvoteInfo = yield db.news.toArray();
		if (upvoteInfo) {
			yield put({ type: FETCH_UPVOTE_SUCCESS, payload: upvoteInfo });
		}
	} catch (e) {
		console.log(e);
		//trigger fetch fail
	}
}

function* mySaga() {
	yield takeLatest(NEWS_FETCH_REQUESTED, fetchNews);
	yield takeLatest(INCREMENT_UPVOTE, incrementUpvote);
	yield takeLatest(FETCH_UPVOTE, fetchUpvote);
}

export default mySaga;
