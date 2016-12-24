import PouchDB from 'pouchdb'

const db = new PouchDB("task")

db.get('preview')
	.then(function (doc) {
		db.remove(doc);
		db.post({
			_id: 'preview',
			state: 'beforeCreate'
		});
	})
	.catch(function (err) {
		if (err.name == "not_found") {
			db.post({
				_id: 'preview',
				state: 'beforeCreate'
			});
		}
	});

export default db
