
module.exports = function(grunt) {

    // Load plugins using grunt collection trick
    // http://stackoverflow.com/questions/15225865/centralise-node-modules-in-project-with-subproject
    grunt.loadNpmTasks('grunt-collection');

    // Project configuration.
    grunt.initConfig({

        clean: {
            dist: {
                src: ['dist']
            },
            postbuild: {
                src: ['dev/style/style.css']
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev',
                    src: ["index.html"],
                    dest: 'dist',
                    filter: 'isFile'
                }]
            }
        },

        compass: {
            options: {
                cssDir: "dev/style",
                sassDir: "dev/style",
                environment: 'production'
            },
            dist: {}, // without watch
            watch: {
                options: {
                    watch: true,
                }
            }
        },

        watch: {
            scripts: {
                files: ['dev/**/*', '!dev/**/*.scss'],
                tasks: ['copy'],
            },
            process: {
                files: ['dist/js/*', 'dist/style.css'],
                tasks: ['uglify', 'preprocess:dev'],
                options: {
                    debounceDelay: 3000,
                    livereload: 98765
                }
            },
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            },
            dev: {
                configFile: 'karma.conf.js',
                autoWatch: true,
                singleRun: false,
                browsers: ['Chrome']
            },
        },

        concurrent: {
            dist: {
                tasks: ['watch', 'compass:watch', 'webpack:dist'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        webpack: {
            dist: require('./webpack.config'),
        }

    });

    // tasks
    grunt.registerTask('build', ['clean', 'copy', 'compass:dist', 'webpack:dist', 'clean:postbuild']);
    grunt.registerTask('dist', ['build']);
    grunt.registerTask('dev', ['build']);

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('test_unit', ['karma:unit']);

    grunt.registerTask('default', ['dist']);
};