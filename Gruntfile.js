/*
 * grunt-doctor
 * https://github.com/dchristoff/grunt-doctor
 *
 * Copyright (c) 2013 DimitarChristoff
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt){

	// Project configuration.
	grunt.initConfig({
		// Before generating any new files, remove any previously-created files.
		clean: {
			docs: ['<%=output%>']
		},


		// shared between tasks
		output: 'docs',

		name: 'bob1',

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
					'<%= output%>/index.html': './README.md'
				}

			}

		},

		assemble: {
			options: {
				engine: 'handlebars',
				flatten: false,
				name: '<%= name %>',
				jsIncludes: ['foo.js'],
				cssIncludes: ['style.css']
			},
			doctor: {
				files: {
					'docs/js/blank.html': ['node_modules/doctor-md/tpl/blank.hbs']
				}
			}
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('assemble');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['doctor', 'assemble']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['clean','doctor','assemble']);

};
