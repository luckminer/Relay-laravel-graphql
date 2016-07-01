import express from 'express';

const port = 3000;
const app = express();

app.get('/', (request, response) => {
	response.send("hello");
});

app.listen(port, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log(`Express server listening on http://localhost:${port}`);
	}
});
