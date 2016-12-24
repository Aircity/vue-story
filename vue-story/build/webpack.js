import webpack from 'webpack'
import config from './config.js'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const baseConfig = {
	context: path.resolve(__dirname, '../client'),
	entry: {
		vendor: config.get('vendor_dependencies'),
		app: [
			'manager/main.js'
		],
		preview: [
			'preview/main.js'
		]
	},
	output: {
		path: '/',
 		chunkFilename: "[name].chunk.js",		
    filename: '[name].bundle.js',		
	},
	resolve: {	
		modules: [
			path.resolve(__dirname, '../node_modules'),
			path.resolve(__dirname, '../client')		
		],	
  	descriptionFiles: ['package.json'],
		mainFiles: ['index', 'main'],		
		extensions: ['.js', '.vulture'],
		alias: {
			// runtime-only
			'vue': 'vue/dist/vue',
			'template-loader': path.resolve(__dirname, '../package/template-loader')
		}
	},
	module: {
		rules: [	
			{
				test: /\.vue/,			
				use: ["vue-lancer-loader"],
				exclude: /node_modules/		
      },							
			{
				test: /\.vulture$/,			
				use: ["vue-loader"],
				exclude: /node_modules/		
      },					
			{
				test: /\.html$/,
				use: [
					"raw-loader"
				],
				exclude: /node_modules/
      },
			{
				test: /\.js$/,
        use:  [ { 
					loader: "babel-loader"			
				} ],
				exclude: [
              /node_modules/
        ]
			},			
			{
				test: /\.css$/,
				use: ["style-loader","css-loader"]		
			},
			{
				test: /\.less$/,
				use: ["style-loader","css-loader", "less-loader"]
			},
      {
        test: /\.json$/,				
        use:  [ 
					"json-loader"							
				]				
      },			
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					"url-loader"
				],
				query: {
					limit: 9600
				}
      },			
			{
			  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					"url-loader"
				],
				query: {
					limit: 9600
				}
      }								
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
			"Vue": "vue"
		}),		
    new HtmlWebpackPlugin({
			template: '../server/lib/index.html',
	    chunks: ['app'],			
			filename: 'index.html',
			inject: true,
			favicon: '../server/lib/logo.png'
		}),
    new HtmlWebpackPlugin({
			template: '../server/lib/index.html',
	    chunks: ['preview'],			
			filename: 'preview.html',		
			inject: true,			
			favicon: '../server/lib/logo.png'
		})
  ]
}

export default baseConfig