import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config';
import GraphQLHTTP from 'express-graphql';
import Schema from './data/schema';
import links from './data/links';

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/graphql', GraphQLHTTP({
	schema: Schema(links),
	graphiql: true
}));

app.get('/data/links', (request, response) => {
	response.json(links);
})
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log(`Express server listening on http://localhost:${port}`);
	}
});
