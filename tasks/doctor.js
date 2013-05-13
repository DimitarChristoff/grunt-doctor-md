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

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('foo', 'Generate HTML docs from MARKDOWN.', function(){

		// Load npm plugins to provide necessary tasks.
		var done = this.async();

		grunt.verbose.writeln(('Running ' + this.name + ' - ' + this.target).cyan);

		// require assemble
		var assemble = require('assemble');

		// initalize assemble with the currently running task
		assemble = assemble.init(this);

		// let's see what assemble has now
		grunt.verbose.writeln(require('util').inspect(assemble));
		grunt.verbose.writeln('');

		// you can see there are some defaults that assemble sets up
		// add the steps you want to execute

		// add a custom string property to the assemble object
		// now run build
		assemble.build(function(err, results) {
			grunt.log.writeln('build finished');
			done();
		});


	});

	grunt.registerMultiTask('doctor', 'build stuff', function(){
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options(),
			done = this.async(),
			files = this.files;

		// Iterate over all specified file groups.
		files.forEach(function(f, i){
			options.source = f.src[0];
			doc.process(options);

			doc.on('done', function(){
				if (i === files.length-1){
					done();
				}
			});

			// Write the destination file.
			// grunt.file.write(f.dest, src);

			// Print a success message.
			// grunt.log.writeln('File "' + f.dest + '" created.');
		});

	})

};
