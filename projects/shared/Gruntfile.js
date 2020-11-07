module.exports = function(grunt) {

    // Load plugins using grunt collection trick
    // http://stackoverflow.com/questions/15225865/centralise-node-modules-in-project-with-subproject
    grunt.loadNpmTasks('grunt-collection');

    // project configuration.
    grunt.initConfig({

        bowerDir: '../../bower_modules/',

        compass: {
            options: {
                cssDir: "demo/style",
                sassDir: "style"
            },
            dist: {
                options: {
                    environment: "production"
                }
            },
            dev: {},
            watch: {
                options: {
                    watch: true
                }
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: true,
                force: true
            },
            files: ['scripts/**/*.js']
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['style/fonts/**/*', 'style/img_new/**', 'style/lib/*.css', 'style/sprites/**'],
                    dest: 'demo',
                    filter: 'isFile'
                }]
            }
        },

        concat: {
            widgetStyles: {
                src: ['scripts/**/*.scss'],
                dest: 'style/foundation/_widgets.scss'
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                // single run
            },
            dev: {
                autoWatch: true,
                singleRun: false
            }
        },

        watch: {
            widgets: {
                files: ['scripts/**/*.scss'],
                tasks: ['concat']
            },
            reload: {
                files: ['demo/**/*'],
                options: {
                    interrupt: true,
                    livereload: 35731
                }
            }
        },

        concurrent: {
            watch: {
                tasks: ['watch', 'compass:watch', 'webpack:dev'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        'webpack': {
            dist: require('./webpack.config'),
            dev: require('./webpack-dev.config')
        }
    });

    // tasks
    grunt.registerTask('init', ['concat:widgetStyles', 'compass:dist', 'copy']);

    grunt.registerTask('default', ['init', 'webpack:dist']);
    grunt.registerTask('dev', ['init']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('test_unit', ['karma:unit']);
};