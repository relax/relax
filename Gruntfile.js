module.exports = function (grunt) {
  'use strict';

  var browserifyExternalOptions, browserifyExternalRequire;
  // `babel-relay-plugin` returns a function for creating plugin instances
  var getBabelRelayPlugin = require('babel-relay-plugin');
  // load previously saved schema data (see "Schema JSON" below)
  var schemaData = require('./data/schema.json');
  // create a plugin instance
  var plugin = getBabelRelayPlugin(schemaData.data)
  browserifyExternalOptions = browserifyExternalRequire = [
    'backbone',
    'backbone-cortex',
    'jquery',
    'q',
    'react',
    'relax-framework'
  ];

  var browserifyProductionOptions = {
    ignore: ['./lib/server/**/*'],
    transform: [
      ['babelify', {plugins: [plugin]}]
    ],
    browserifyOptions: {
      extensions: ['.jsx', '.js']
    },
    external: browserifyExternalOptions
  };

  grunt.initConfig({
    browserify: {
      options: {
        ignore: ['./lib/server/**/*'],
        transform: [
          ['babelify', {plugins: [plugin]}]
        ],
        browserifyOptions: {
          extensions: ['.jsx', '.js'],
          debug: true
        },
        external: browserifyExternalOptions,
        watch: true
      },
      common: {
        options: {
          ignore: ['./lib/server/**/*'],
          transform: [
            ['babelify', {plugins: [plugin]}]
          ],
          browserifyOptions: {
            extensions: ['.jsx', '.js'],
          },
          require: browserifyExternalRequire,
          external: null
        },
        src: [],
        dest: 'public/js/common.js'
      },
      development: {
        files: {
          'public/js/admin.js': ['lib/client/admin.js'],
          'public/js/auth.js': ['lib/client/auth.js'],
          'public/js/public.js': ['lib/client/public.js']
        }
      },
      production: {
        options: browserifyProductionOptions,
        files: {
          'public/js/admin.js': ['lib/client/admin.js'],
          'public/js/auth.js': ['lib/client/auth.js'],
          'public/js/public.js': ['lib/client/public.js']
        }
      }
    },
    less: {
      development: {
        files: {
          'public/css/main.css': ['assets/less/main.less']
        }
      },
      production: {
        options: {
          plugins: [
            new (require('less-plugin-autoprefix'))(),
            new (require('less-plugin-clean-css'))()
          ],
        },
        files: {
          'public/css/main.css': ['assets/less/main.less']
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'assets/images/',
        src: '**',
        dest: 'public/images/'
      }
    },
    uglify: {
      production: {
        files: {
          'public/js/common.js': ['public/js/common.js'],
          'public/js/admin.js': ['public/js/admin.js'],
          'public/js/auth.js': ['public/js/auth.js'],
          'public/js/public.js': ['public/js/public.js']
        }
      }
    },
    watch: {
      options: {
        interrupt: true,
        livereload: false
      },
      less: {
        files: 'assets/**/*',
        tasks: ['build:css:development']
      }
    },
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          args: ['dev'],
          env: {
            'NODE_ENV': 'development',
            'NODE_CONFIG': 'dev'
          },
          nodeArgs: [],
          ignore: ['node_modules/**'],
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['test', 'build']);
  grunt.registerTask('build', ['build:development']);
  grunt.registerTask('build:production', ['build:css:production', 'build:js:production', 'build:copy']);
  grunt.registerTask('build:development', ['build:css:development', 'build:js:development', 'build:copy']);
  grunt.registerTask('build:css:development', ['less:development']);
  grunt.registerTask('build:css:production', ['less:production']);
  grunt.registerTask('build:js:development', ['browserify:common', 'browserify:development']);
  grunt.registerTask('build:js:production', ['browserify:common', 'browserify:production', 'uglify']);
  grunt.registerTask('build:copy', ['copy']);
  grunt.registerTask('dev', ['build:development', 'concurrent:dev']);
};
