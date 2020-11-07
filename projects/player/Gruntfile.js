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
            once: { // do it once, in dev mode
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
            files: ['dev/scripts/**/*.js']
        },

        preprocess: {
            dist: {
                src: ["dist/index.html", "dist/index6.html"],
                options: {
                    inline: true,
                    context: {
                        DEBUG: false
                    }
                }
            },
            dist2: {
                src: ["dist/index.html", "dist/index6.html"],
                srcDir: "dist",
                options: {
                    type: 'js',
                    inline: true,
                }
            }
        },


        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev',
                    src: ["*", "style/img/**", "style/lib/*.css"],
                    dest: 'dist',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: '<%= sharedDir %>',
                    src: ["style/img_new/**/*", 'style/fonts/**/*', "style/sprites/**/*.png"],
                    dest: 'dist',
                    filter: 'isFile'
                },
                {
                    expand: true,
                    cwd: 'dev',
                    src: ["demo/*.html"],
                    dest: 'dist',
                    filter: 'isFile'
                },
                {
                    expand: true,
                    cwd: 'dev',
                    src: ["*.html"],
                    dest: 'dist',
                    filter: 'isFile'
                }]
            },
        },

        clean: {
            init: {
                src: [
                    "dist"
                ]
            },
            postdistbuild: {
                src: [
                    "dist/style/**/*", "!dist/style/sprites/**", "!dist/style/bootstrap_style.css"
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

        watch: {
            reload: {
                options: {
                    interrupt: true,
                    livereload: {
                        host: '127.0.0.1',
                        port: 9000
                    }
                },
                files: ['dist/**/*']
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
    grunt.registerTask('default', ['clean:init', 'copy', 'compass:dist', 'webpack:dist', 'preprocess:dist', 'preprocess:dist2', 'clean:postdistbuild']);
    grunt.registerTask('dev', ['clean:init', 'compass:once', 'copy']);
    grunt.registerTask('cleandist', ['clean:init']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('test_unit', ['karma:unit']);
};