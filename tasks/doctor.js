/*
 * grunt-doctor
 * https://github.com/dchristoff/grunt-doctor
 *
 * Copyright (c) 2013 DimitarChristoff
 * Licensed under the MIT license.
 */

'use strict';

var doc = require('doctor-md');

module.exports = function(grunt, init){

	// ensure these are loaded so it works as standalone
	require('assemble/tasks/assemble')(grunt);
	require('grunt-contrib-copy/tasks/copy')(grunt);

	grunt.registerMultiTask('doctor', 'build stuff', function(){
		var options = this.options(),
			done = this.async(),
			files = this.files;

		options.source = files[0].src[0];

		doc.on('done', done).process(options);

		// when done, run assemble and copy if needed
		if ('assemble' in this.data){
			grunt.config.set('assemble', this.data.assemble);
			grunt.task.run('assemble');
		}

		if ('copy' in this.data){
			grunt.config.set('copy', this.data.copy);
			grunt.task.run('copy:doctor');
		}

	});

};
