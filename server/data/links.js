let links = [];

createLink("Relay.js Home Page", "https://facebook.github.io/relay");
createLink("React.js Home Page", "https://facebook.github.io/react");

function generateHash(link) {
	return Buffer(JSON.stringify(link)).toString('base64').substr(0,16);
}

export function createLink(title, url) {
	var newLink = {
		id: generateHash({title, url}),
		title,
		url,
		createdAt: Date.now()
	}
	links.push(newLink);
}

export function getLinks() {
	return links;
}

export default links;
