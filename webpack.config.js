const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {loader: "babel-loader"}
		}, {
			test: /\.css$/,
			use: [{loader: 'style-loader'}, 
			{loader: 'css-loader'}]
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{loader: 'file-loader'}]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({title: "Webpack Output"}),
	],
	devServer: {
		contentBase: './dist',
		open: true
	}
};
