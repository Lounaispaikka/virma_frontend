System.config({
	transpiler: false,

	map: {
		dojoLoader: 'bundler/dojo.js',
		undefined: 'bundler/undefined.js',
		dstore: 'node_modules/dojo-dstore',
		crypto: '@empty',
		dojoRequire: 'bundler/require.js',
		vert: 'node_modules/systemjs-plugin-text/text.js',
		frag: 'node_modules/systemjs-plugin-text/text.js',
		css: 'node_modules/systemjs-plugin-css/css.js',
		json: 'node_modules/systemjs-plugin-json/json.js',
		'image-blob-reduce': 'node_modules/image-blob-reduce/dist/image-blob-reduce.min.js',
		'geojson-bounds': 'node_modules/geojson-bounds/index.js',
	},

	meta: {
		'dist/bundle.js': {
			format: 'system'
		}
	},

	packages: {
		'node_modules/': {
			defaultExtension: 'js'
		},
		'node_modules/dojo/': {
			meta: {
				'*.js': { loader: 'dojoLoader' }
			}
		},
		'node_modules/dojo-dstore/': {
			meta: {
				'*.js': { loader: 'dojoLoader' }
			}
		},
		'node_modules/dgrid/': {
			meta: {
				'*.js': { loader: 'dojoLoader' }
			}
		},
		'packages/node_modules/': {
			defaultExtension: 'js',
			meta: {
				'*.css': { loader: 'css' },
				'*.json': { loader: 'json' }
			}
		},
		'dist/': {
			defaultExtension: 'js',
			meta: {
				'*.css': { loader: 'css' },
				'*.json': { loader: 'json' }
			}
		}
	}
});
