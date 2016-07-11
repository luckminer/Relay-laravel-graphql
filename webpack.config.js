import webpack from 'webpack';
import path from 'path';

export default {
	context: path.join(__dirname, './client/source'),
	entry: [
		'webpack-hot-middleware/client?reload=true',
		'./js/index.js'
	],
	output: {
		path: __dirname + '/build/js',
		filename: 'bundle.js',
		publicPath: '/js'
	},
	devServer: {
		contentBase: './build/js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{ test: /\.js$/, include: path.join(__dirname, './client'), loader: 'babel' }
		]
	}
}
