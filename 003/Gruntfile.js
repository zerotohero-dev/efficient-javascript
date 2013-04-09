module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                jshintrc: 'jshint-options.js',
                globals: {
                    jQuery: true
                }
            },
            uses_defaults: [
                'js/collections/*.js',
                'js/models/*.js',
                'js/views/*.js',
                'js/main/*.js'
            ]
        },

        complexity: {
            generic: {
                src: [
                    'js/collections/*.js',
                    'js/models/*.js',
                    'js/views/*.js',
                    'js/main/*.js'
                ],
                options: {
                    cyclomatic      : 3,
                    halstead        : 8,
                    maintainability : 100
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-complexity');

    grunt.registerTask('default', ['complexity']);
};
