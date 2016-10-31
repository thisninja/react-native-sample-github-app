var api = {
	getBio(userName) {
		userName = userName.toLowerCase();

		var url = `https://api.github.com/users/${userName}`;

		return fetch(url).then((res) => res.json());
	},

	getRepos(userName) {
		userName = userName.toLowerCase();

		var url = `https://api.github.com/users/${userName}/repos`;

		return fetch(url).then((res) => res.json());
	},

	getNotes(userName) {
		userName = userName.toLowerCase();

		var url = `https://github-note-taker-dba3d.firebaseio.com/${userName}.json`;

		return fetch(url).then((res) => res.json());
	},

	addNote(userName, note) {
		userName = userName.toLowerCase();

		var url = `https://github-note-taker-dba3d.firebaseio.com/${userName}.json`;

		return fetch(url, {
			method: 'post',
			body: JSON.stringify(note)
		}).then((res) => res.json());
	}
};

module.exports = api;