import Dexie from 'dexie';

const db = new Dexie('hackerNews');
db.version(1).stores({
	news: `id, upvote`,
});

export default db;
