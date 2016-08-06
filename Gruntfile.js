'use strict';

module.exports = function(grunt) {

  var pkgConfig = grunt.file.readJSON('package.json');

  require('jit-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    'pkg': pkgConfig,

    watch: {
      sass: {
        files: ['scss/*.{scss,sass}'],
        tasks: ['sass:dev']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
    },
    // Build CSS
    sass: {
      options: {
        outputStyle: 'nested',
        includePaths: ['./bower_components'],
      },
      dev: {
        files: {
          'styles/demo.css': 'scss/demo.scss'
        }
      },
      dist: {
        files: {
          'styles/theme.css': 'scss/theme.scss'
        }
      }
    },
    // Inject dependencies
    wiredep: {
      options: {
        devDependencies: true,
      },
      app: {
        src: ['index.html'],
        // ignorePath: '',
      },
      sass: {
        src: ['./scss/*.{scss,sass}'],
        ignorePath: '../bower_components/',
        exclude: [
          '_bootstrap.scss',
        ],
      },
    },
  });

  // Default task(s).
  grunt.registerTask('default', [
  		'sass:dev',
  		'watch']);
};
