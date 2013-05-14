/*
 * grunt-doctor-md
 * https://github.com/DimitarChristoff/grunt-doctor-md
 *
 * Copyright (c) 2013 DimitarChristoff
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt){

	// Project configuration.
	grunt.initConfig({

		// shared between tasks
		output: 'docs',

		// Before generating any new files, remove any previously-created files.
		clean: {
			doctor: ['<%=output%>']
		},

		doctor: {
			default_options: {
				options: {
					source: 'README.md',
					output: '<%= output%>',
					title: 'My Project',
					logo: 'images/logo.png',
					jsIncludes: ['<%= output%>'],
					cssIncludes: []
				},
				files: {
					markdown: './README.md'
				},
				assemble: {
					options: {
						engine: 'handlebars',
						flatten: false,
						name: '<%= name %>',
						jsIncludes: [],
						cssIncludes: []
					},
					doctor: {
						files: {
							'<%= output%>/blank.html': 'node_modules/doctor-md/tpl/blank.hbs'
						}
					}
				},

				copy: {
					doctor: {
						files: [/*{
						 dest: '<%= output%>/js/make-class/',
						 src: ['*.js'],
						 expand: true,
						 filter: function(name){
						 return name !== 'Gruntfile.js';
						 }
						 }*/]
					}
				}
			}
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('assemble');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean:doctor','doctor']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['doctor']);

};
