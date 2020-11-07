module.exports = function(grunt) {

    // Load plugins using grunt collection trick
    // http://stackoverflow.com/questions/15225865/centralise-node-modules-in-project-with-subproject
    grunt.loadNpmTasks('grunt-collection');

    // Project configuration.
    grunt.initConfig({

        // custom variables
        sharedDir: '../shared/',

        compass: {
            options: {
                cssDir: "dist/style",
                sassDir: "dev/style"
            },
            dist: {
                options: {
                    environment: "production"
                }
            },
            once: { // compilation in dev for grunt watch task
            },
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
            files: ['dev/scripts/**/*.js', '!dev/scripts/libs/*.js']
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev',
                    src: ["*", "style/img/**", "style/lib/**/*"],
                    dest: 'dist',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: '<%= sharedDir %>',
                    src: ['style/fonts/**/*', 'style/img_new/**/*', "style/sprites/**/*.png"],
                    dest: 'dist',
                    filter: 'isFile'
                }]
            }
        },

        clean: {
            start: {
                src: [
                    "dist"
                ]
            },
            postdistbuild: {
                src: [
                    "dist/style/**/*", "!dist/style/sprites/**"
                ]
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {},
            dev: {
                autoWatch: true,
                singleRun: false,
                browsers: ['PhantomJS']
            }
        },

        preprocess: {
            dist: {
                src: "dist/index.html",
                options: {
                    inline: true,
                    context: {
                        DEBUG: false
                    }
                }
            }
        },

        watch: {
            reload: {
                files: ['dist/**/*'],
                options: {
                    interrupt: true,
                    livereload: {
                        host: '127.0.0.1',
                        port: 9001
                    }
                }
            },
            foundationStyle: {
                files: ['<%= sharedDir %>style/foundation/**/*'],
                tasks: ['compass:once']
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
            dist: require('./webpack-dist.config'),
            dev: require('./webpack-dev.config')
        }

    });

    // tasks
    grunt.registerTask('default', ['clean', 'copy', 'compass:dist', 'webpack:dist', 'preprocess:dist', 'clean:postdistbuild']);
    grunt.registerTask('dev', ['clean', 'compass:once', 'copy']);
    grunt.registerTask('cleandist', ['clean']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('test_unit', ['karma:unit']);
};