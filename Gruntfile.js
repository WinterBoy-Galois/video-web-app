module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        hub: {

            build: {
                src: ['projects/*/Gruntfile.js'],
                tasks: ['default']
            },

            dev: {
                src: ['projects/*/Gruntfile.js', '!projects/embed_code/Gruntfile.js'],
                tasks: ['dev']
            },

            watch: {
                src: ['projects/*/Gruntfile.js', '!projects/embed_code/Gruntfile.js'],
                tasks: ['concurrent']
            },

            cleandist: {
                src: ['projects/*/Gruntfile.js'],
                tasks: ['cleandist']
            },

            test_unit: {
                src: ['projects/*/Gruntfile.js'],
                tasks: ['test_unit']
            }

        },

        websocket: {
          options: {
            port: 3344,
            handler: './websocket/handler.js'
 
          },
          target: {}
        },

        connect: {
            http: {
                options: {
                    port: 80,
                    base: './projects',
                    hostname: '0.0.0.0',
                }
            },
            https: {
                options: {
                    protocol: 'https',
                    port: 443,
                    base: './projects',
                    hostname: '0.0.0.0',
                    key: grunt.file.read('certs/server.key').toString(),
                    cert: grunt.file.read('certs/server.crt').toString(),
                    ca: grunt.file.read('certs/ca.crt').toString()
                }
            }
        }

    });

    // Load plugins
    grunt.loadNpmTasks('grunt-hub');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-websocket');

    // tasks
    grunt.registerTask('default', ["hub:build"]);
    grunt.registerTask('dev', ["hub:dev", "websocket","connect", "hub:watch"]);
    grunt.registerTask('cleandist', ["hub:cleandist"]);
    grunt.registerTask('test_unit', ["hub:test_unit"]);
    grunt.registerTask('serve', ["connect", "hub:watch"]);
    grunt.registerTask('cleanderived', ["hub:cleanderived"]);

};